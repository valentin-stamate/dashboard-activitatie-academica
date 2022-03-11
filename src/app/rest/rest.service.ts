import {ScientificArticleISI, User, UserKey} from "../database/models";
import {BaseInformationModel, ScientificArticleISIModel, UserKeyModel, UserModel} from "../database/sequelize";
import {UploadedFile} from "express-fileupload";
import XLSX, {WorkBook, WorkSheet} from "xlsx";
import {UtilService} from "../service/util.service";
import {EmailDefaults, EmailTemplates, MailOptions, MailService} from "../service/email.service";
import {ResponseError} from "./rest.middlewares";
import {JwtService} from "../service/jwt.service";
import {Op} from "@sequelize/core";

/** The layer where the logic holds */
export class RestService {
    /************************************************************************************
     *                               Visitor only
     ***********************************************************************************/
    static async check(user: User): Promise<any> {
        const row = await UserModel.findOne({
            where: {
                id: user.id,
                identifier: user.identifier,
                email: user.email,
                admin: user.admin,
            }});

        if (row === null) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        return new ResponseData(ResponseMessage.SUCCESS);
    }

    static async signup(user: User): Promise<any> {
        if (!user.identifier || !user.email || !user.alternativeEmail) {
            throw new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST);
        }

        const options = {
            where: {
                [Op.or]: [
                    {identifier: user.identifier},
                    {email: user.email},
                    {alternativeEmail: user.alternativeEmail},
                ]
            }
        };

        const existingUser = await UserModel.findOne(options);

        if (existingUser !== null) {
            throw new ResponseError(ResponseMessage.DATA_TAKEN, StatusCode.BAD_REQUEST);
        }

        const row = await BaseInformationModel.findOne({
            where: {
                identifier: user.identifier
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.USER_NOT_REGISTERED, StatusCode.NOT_ACCEPTABLE);
        }

        user = {...user, admin: false};
        await UserModel.build({...user}).save();

        return new ResponseData(ResponseMessage.SUCCESS);
    }

    static async login(user: User): Promise<any> {
        if (!user.identifier || !user.email) {
            throw new ResponseError(ResponseMessage.INCOMPLETE_FORM, StatusCode.BAD_REQUEST);
        }

        const row = await UserModel.findOne({
            where: {
                identifier: user.identifier,
                email: user.email
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.NO_USER_FOUND, StatusCode.NOT_FOUND);
        }

        const realUser = row.toJSON() as User;
        const key = UtilService.generateRandomString();

        let dbKey = await UserKeyModel.findOne({
            where: {
                identifier: realUser.identifier
            }
        });

        if (dbKey === null) {
            await UserKeyModel.create({identifier: realUser.identifier, key: key});
        } else {
            await (dbKey.set({key: key}).save());
        }

        await MailService.sendMail(new MailOptions(
            EmailDefaults.FROM,
            [realUser.email],
            [],
            [],
            '[Login] ' + EmailDefaults.PARTIAL_SUBJECT,
            '',
            EmailTemplates.LOGIN,
            [key],
            ));

        return new ResponseData(ResponseMessage.SUCCESS);
    }

    static async authenticate(userKey: UserKey): Promise<any> {
        const row = await UserKeyModel.findOne({
            where: {
                key: userKey.key
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.INVALID_AUTH_KEY, StatusCode.NOT_FOUND);
        }

        const user = await UserModel.findOne({
            where: {
                identifier: row.toJSON().identifier
            }
        });

        if (user === null) {
            throw new ResponseError(ResponseMessage.SOMETHING_WRONG, StatusCode.EXPECTATION_FAILED);
        }

        await row.destroy();
        const jwt = JwtService.generateAccessToken(user.toJSON() as User);

        return new ResponseData(jwt);
    }

    /************************************************************************************
     *                               User only
     ***********************************************************************************/
    static async getInformation(user: User): Promise<any> {
        const infoRow = await BaseInformationModel.findOne({
            where: {
                identifier: user.identifier
            }
        });
        const userRow = await UserModel.findOne({
            where: {
                id: user.id
            }
        });

        if (infoRow === null || userRow === null) {
            return {};
        }

        return {...infoRow.toJSON(), ...userRow.toJSON()};
    }

    static async getForms(user: User): Promise<any> {
        const scArticleISI = (await ScientificArticleISIModel.findAll({
            where: {userId: user.id},
            order: ['id'],
        })).map(item => item.toJSON());

        return {
            scArticlesISI: scArticleISI,
        };
    }

    /** Articole științifice publicate în extenso în reviste cotate Web of Science cu factor de impact */
    static async getScientificArticleISI(user: User) {
        return (await ScientificArticleISIModel.findAll({
            where: {userId: user.id},
            order: ['id'],
        })).map(item => item.toJSON());
    }

    static async addScientificArticleISI(user: User, data: ScientificArticleISI) {
        await ScientificArticleISIModel.create({
            ...data,
            userId: user.id
        });
        return new ResponseData(ResponseMessage.SUCCESS);
    }

    static async updateScientificArticleISI(user: User, data: ScientificArticleISI) {
        const row = await ScientificArticleISIModel.findOne({
            where: {
                userId: user.id,
                id: data.id,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.set({...data}).save();
        return new ResponseData(ResponseMessage.SUCCESS);
    }

    static async deleteScientificArticleISI(user: User, id: number) {
        const row = await ScientificArticleISIModel.findOne({
            where: {
                userId: user.id,
                id: id,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.destroy();
        return new ResponseData(ResponseMessage.SUCCESS);
    }

    /************************************************************************************
     *                               Admin only
     ***********************************************************************************/
    static async allUsers(userExcept: User): Promise<any> {
        const rows = await UserModel.findAll({
            where: {
                id: {[Op.not]: userExcept.id},
            }
        });

        return rows.map(item => item.toJSON());
    }

    static async deleteUser(id: number): Promise<any> {
        const row = await UserModel.findOne({
            where: {
                id: id
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.destroy();
        return new ResponseData(ResponseMessage.SUCCESS);
    }

    static async getBaseInformation() {
        return (await BaseInformationModel.findAll({order: ['id']}))
            .map(item => item.toJSON());
    }

    static async importBaseInformation(file: UploadedFile): Promise<any> {
        const workBook = XLSX.read(file.data);
        const sheet = workBook.Sheets[workBook.SheetNames[0]];

        await BaseInformationModel.destroy({where: {}});

        const sheetRows = XLSX.utils.sheet_to_json(sheet)
            .map(item => Object.values(item as any));

        const dbRows: BaseInformationModel[] = [];

        for (const item of sheetRows) {
            const rowItem = await BaseInformationModel.create({
                fullName: item[0],
                identifier: item[1],
                coordinator: item[2],
                founding: item[3],
            });
            dbRows.push(rowItem);
        }

        const jsonRows = dbRows.map(item => item.toJSON());
        return new ResponseData(jsonRows);
    }

    static async deleteBaseInformation(id: number) {
        const row = await BaseInformationModel.findOne({
            where: {
                id: id,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.DATA_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        await row.destroy();
        return new ResponseData(ResponseMessage.SUCCESS);
    }

    static async sendOrganizationEmail(email: string, subject: string, from: string, file: UploadedFile): Promise<any> {
        const workBook = XLSX.read(file.data);
        const sheet = workBook.Sheets[workBook.SheetNames[0]];

        const rows: any[] = XLSX.utils.sheet_to_json(sheet);
        const emailKey = 'Email';
        const emailRowsMap: Map<string, any[]> = new Map();

        const headers = Object.keys(rows[0]);

        let totalMails: string[] = [];
        for (let row of rows) {
            const rowMap: Map<string, any> = new Map(Object.entries(row));
            const email = rowMap.get(emailKey);

            const emailRows = emailRowsMap.get(email);
            if (emailRows === undefined) {
                emailRowsMap.set(email, [row]);
                totalMails.push(email);
                continue;
            }

            emailRows.push(row);
        }

        let successfulSend: string[] = [];
        let unsuccessfulSend: string[] = [];

        for (const [email, rows] of emailRowsMap.entries()) {
            const sheet: WorkSheet = XLSX.utils.aoa_to_sheet([
                headers
            ]);

            XLSX.utils.sheet_add_aoa(sheet, rows.map(item => Object.values(item)), {origin: -1});

            const workBook: WorkBook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workBook, sheet);

            const buffer: Buffer = XLSX.write(workBook, {bookType: 'xlsx', type: 'buffer'});

            const dateStr = UtilService.stringDate(new Date());

            try {
                const response = await MailService.sendMail(new MailOptions(
                    from,
                    [email],
                    [],
                    [],
                    subject,
                    email,
                    email,
                    [{content: buffer, filename: `organizare_${dateStr}.xlsx`}]

                ));
                successfulSend.push(email);
            } catch (e) {
                console.log(`Mail Error: ${email}`);
                console.log(e);
                unsuccessfulSend.push(email);
            }
        }

        return {totalMails, successfulSend, unsuccessfulSend};
    }
}

/** The purpose of this class is to wrap the text messages returned
 * into an object so that all successful requests will return JSON objects. */
class ResponseData {
    constructor(public data: any) {}
}

export enum ResponseMessage {
    SUCCESS = 'Success',

    INCOMPLETE_FORM = 'Please complete all the fields',
    USER_NOT_REGISTERED = 'The user is not registered in out database',
    NO_USER_FOUND = 'No user was found with these credentials',
    INVALID_AUTH_KEY = 'The authorization key provided is invalid',
    SOMETHING_WRONG = 'Something went wrong',
    NO_AUTH_TOKEN = 'There is no authentication key available',
    INVALID_TOKEN = 'Invalid token',
    USER_NOT_EXISTS = 'Valid token, but user doesn\'t exist',
    ADMIN_ONLY = 'Unauthorized, admin permission only',
    DATA_NOT_FOUND = 'Data not found',
    DATA_TAKEN = 'Some data is already taken',
}

/** Contains the request responses */
export enum StatusCode {
    /** Informational */
    CONTINUE = 100,
    SWITCHING_PROTOCOLS = 101,
    PROCESSING = 102,

    /** SUCCESS = 2×× */
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NON_AUTHORITATIVE_INFORMATION = 203,
    NO_CONTENT = 204,
    RESET_CONTENT = 205,
    PARTIAL_CONTENT = 206,
    MULTI_STATUS = 207,
    ALREADY_REPORTED = 208,
    IM_USED = 226,

    /** REDIRECTION = 3×× */
    MULTIPLE_CHOICES = 300,
    MOVED_PERMANENTLY = 301,
    FOUND = 302,
    SEE_OTHER = 303,
    NOT_MODIFIED = 304,
    USE_PROXY = 305,
    TEMPORARY_REDIRECT = 307,
    PERMANENT_REDIRECT = 308,

    /** CLIENT ERROR = 4×× */
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    NOT_ACCEPTABLE = 406,
    PROXY_AUTHENTICATION_REQUIRED = 407,
    REQUEST_TIMEOUT = 408,
    CONFLICT = 409,
    GONE = 410,
    LENGTH_REQUIRED = 411,
    PRECONDITION_FAILED = 412,
    PAYLOAD_TOO_LARGE = 413,
    REQUEST_URI_TOO_LONG = 414,
    UNSUPPORTED_MEDIA_TYPE = 415,
    REQUESTED_RANGE_NOT_SATISFIABLE = 416,
    EXPECTATION_FAILED = 417,
    IM_A_TEAPOT = 418,
    MISDIRECTED_REQUEST = 421,
    UNPROCESSABLE_ENTITY = 422,
    LOCKED = 423,
    FAILED_DEPENDENCY = 424,
    UPGRADE_REQUIRED = 426,
    PRECONDITION_REQUIRED = 428,
    TOO_MANY_REQUESTS = 429,
    REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
    CONNECTION_CLOSED_WITHOUT_RESPONSE = 444,
    UNAVAILABLE_FOR_LEGAL_REASONS = 451,
    CLIENT_CLOSED_REQUEST = 499,

    /**  SERVER ERROR = 5×× */
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
    HTTP_VERSION_NOT_SUPPORTED = 505,
    VARIANT_ALSO_NEGOTIATES = 506,
    INSUFFICIENT_STORAGE = 507,
    LOOP_DETECTED = 508,
    NOT_EXTENDED = 510,
    NETWORK_AUTHENTICATION_REQUIRED = 511,
    NETWORK_CONNECT_TIMEOUT_ERROR = 599,
}