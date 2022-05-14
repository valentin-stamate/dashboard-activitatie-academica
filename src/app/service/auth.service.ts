import {AdminModel, AllowedStudentsModel, CoordinatorModel, StudentModel} from "../database/sequelize";
import {ResponseError} from "../middleware/middleware";
import {ResponseMessage, StatusCode} from "../services/rest.util";
import {Op} from "@sequelize/core";
import {Admin, AllowedStudent, Coordinator, Student} from "../database/models";
import {UtilService} from "../services/util.service";
import {CryptoUtil} from "../services/crypto.util";
import sha256 from "crypto-js/sha256";
import {EmailDefaults, MailService} from "../services/email.service";
import {JwtService} from "../services/jwt.service";

export class AuthService {

    static async check(user: any): Promise<number> {
        console.log(user);

        let studentRow = await StudentModel.findOne({
            where: {
                id: user.id,
                fullName: user.fullName || 'none',
                identifier: user.identifier || 'none',
                email: user.email || 'none',
            }});

        let coordinatorRow = await CoordinatorModel.findOne({
            where: {
                id: user.id,
                name: user.name || 'none',
                function: user.function || 'none',
                email: user.email || 'none',
            }});

        let adminRow = await AdminModel.findOne({
            where: {
                id: user.id,
                username: user.username || 'none',
            }});

        if (!studentRow && !coordinatorRow && !adminRow) {
            throw new ResponseError(ResponseMessage.USER_NOT_EXISTS, StatusCode.NOT_FOUND);
        }

        if (studentRow) {
            return 1;
        }

        if (coordinatorRow) {
            return 2;
        }

        return 3;
    }

    static async signupStudent(identifier: string, email: string, alternativeEmail: string): Promise<void> {
        const existingUser = await StudentModel.findOne({
            where: {
                [Op.or]: [
                    {identifier: identifier},
                ]
            }
        });

        if (existingUser !== null) {
            throw new ResponseError(ResponseMessage.DATA_TAKEN, StatusCode.BAD_REQUEST);
        }

        const row = await AllowedStudentsModel.findOne({
            where: {
                identifier: identifier
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.USER_NOT_REGISTERED, StatusCode.NOT_ACCEPTABLE);
        }

        const studentPreInformation = row.toJSON() as AllowedStudent;

        const coordinatorFullName = UtilService.splitSplitProfessorName(studentPreInformation.coordinator);

        const generatedPassword = 'admin';
        const password = CryptoUtil.scufflePassword(generatedPassword);

        const student: Student = {
            identifier: identifier,
            password: sha256(password).toString(),
            fullName: studentPreInformation.fullName,
            email: email,
            alternativeEmail: alternativeEmail,
            attendanceYear: studentPreInformation.attendanceYear,
            coordinatorName: coordinatorFullName[1],
            coordinatorFunction: coordinatorFullName[0],
        }

        try {
            await MailService.sendMail({
                from: EmailDefaults.FROM,
                to: email,
                html: generatedPassword,
            });
        } catch (err) {
            console.log(err);
            throw new ResponseError(ResponseMessage.MAIL_ERROR, StatusCode.BAD_REQUEST);
        }

        await StudentModel.create(student as any);
        return;
    }

    static async loginStudent(identifier: string, rawPassword: string): Promise<string> {
        const password = CryptoUtil.scufflePassword(rawPassword);

        const row = await StudentModel.findOne({
            where: {
                identifier: identifier,
                password: sha256(password).toString(),
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.INVALID_CREDENTIALS, StatusCode.NOT_FOUND);
        }

        const user = row.toJSON() as Student;

        return JwtService.generateAccessTokenForStudent(user);
    }

    static async loginCoordinator(email: string, code: string): Promise<string> {
        const hashedPassword = sha256(CryptoUtil.scufflePassword(code)).toString();

        const row = await CoordinatorModel.findOne({
            where: {
                email: email,
                password: hashedPassword,
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.INVALID_CREDENTIALS, StatusCode.NOT_FOUND);
        }

        const user = row.toJSON() as Coordinator;

        return JwtService.generateAccessTokenForCoordinator(user);
    }

    static async loginAdmin(identifier: string, rawPassword: string): Promise<string> {
        const password = CryptoUtil.scufflePassword(rawPassword);

        const row = await AdminModel.findOne({
            where: {
                username: identifier,
                password: sha256(password).toString(),
            }
        });

        if (row === null) {
            throw new ResponseError(ResponseMessage.INVALID_CREDENTIALS, StatusCode.NOT_FOUND);
        }

        const user = row.toJSON() as Admin;

        return JwtService.generateAccessTokenForAdmin(user);
    }
}