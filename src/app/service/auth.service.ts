import {
    AdminModel,
    AllowedStudentsModel,
    AuthorizationKeyModel,
    CoordinatorModel,
    StudentModel
} from "../database/sequelize";
import {ResponseError} from "../middleware/middleware";
import {ResponseMessage, StatusCode} from "../services/rest.util";
import {Op} from "@sequelize/core";
import {Admin, AllowedStudent, AuthorizationKey, Coordinator, Student} from "../database/models";
import {UtilService} from "../services/util.service";
import {CryptoUtil} from "../services/crypto.util";
import sha256 from "crypto-js/sha256";
import {AdminLoginMessage, EmailDefaults, LoginMessage, MailService, SignupMessage} from "../services/email.service";
import {JwtService} from "../services/jwt.service";

export class AuthService {

    static async check(user: any): Promise<number> {

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

        const student: Student = {
            identifier: identifier,
            fullName: studentPreInformation.fullName,
            email: email,
            alternativeEmail: alternativeEmail,
            attendanceYear: studentPreInformation.attendanceYear,
            coordinatorName: coordinatorFullName[1],
            coordinatorFunction: coordinatorFullName[0],
            isActive: true,
        }

        try {
            await MailService.sendMail({
                from: EmailDefaults.FROM,
                to: email,
                html: SignupMessage.getHtml(email),
            });
        } catch (err) {
            console.log(err);
            throw new ResponseError(ResponseMessage.MAIL_ERROR, StatusCode.BAD_REQUEST);
        }

        await StudentModel.create(student as any);
        return;
    }

    static async loginStudent(identifier: string, loginEmail: string) {
        const existingStudent = await StudentModel.findOne({
            where: {
                identifier: identifier,
                [Op.or]: [
                    {email: loginEmail},
                    {alternativeEmail: loginEmail}
                ]
            }
        });

        if (!existingStudent) {
            throw new ResponseError(ResponseMessage.INVALID_CREDENTIALS, StatusCode.NOT_FOUND);
        }

        const student = existingStudent.toJSON() as Student;

        if (!student.isActive) {
            throw new ResponseError(ResponseMessage.INACTIVE_USER, StatusCode.FORBIDDEN);
        }

        const generatedCode = UtilService.generateRandomString(16);
        const authorizationKey: AuthorizationKey = {
            key: generatedCode
        }

        try {
            await MailService.sendMail({
                from: EmailDefaults.FROM,
                to: loginEmail,
                html: LoginMessage.getHtml(generatedCode),
            });

            await AuthorizationKeyModel.create(authorizationKey as any);
        } catch (err) {
            console.log(err);
            throw new ResponseError(ResponseMessage.MAIL_ERROR, StatusCode.BAD_REQUEST);
        }

        return;
    }

    static async loginStudentWithCode(identifier: string, loginEmail: string, code: string) {

        const existingStudent = await StudentModel.findOne({
            where: {
                identifier: identifier,
                [Op.or]: [
                    {email: loginEmail},
                    {alternativeEmail: loginEmail}
                ]
            }
        });

        if (!existingStudent) {
            throw new ResponseError(ResponseMessage.INVALID_CREDENTIALS, StatusCode.NOT_FOUND);
        }

        const student = existingStudent.toJSON() as Student;

        if (!student.isActive) {
            throw new ResponseError(ResponseMessage.INACTIVE_USER, StatusCode.FORBIDDEN);
        }

        const existingKey = await AuthorizationKeyModel.findOne({
            where: {
                key: code,
            }
        });

        if (!existingKey) {
            throw new ResponseError(ResponseMessage.INVALID_AUTH_KEY, StatusCode.NOT_FOUND);
        }

        await existingKey.destroy();
        return JwtService.generateAccessTokenForStudent(existingStudent.toJSON() as Student);
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

    static async loginAdmin(identifier: string, email: string): Promise<void> {
        const existingAdmin = await AdminModel.findOne({
            where: {
                username: identifier,
                email: email,
            }
        });

        if (!existingAdmin) {
            throw new ResponseError(ResponseMessage.INVALID_CREDENTIALS, StatusCode.NOT_FOUND);
        }

        const generatedCode = UtilService.generateRandomString(16);
        const authorizationKey: AuthorizationKey = {
            key: generatedCode
        }

        try {
            await MailService.sendMail({
                from: EmailDefaults.FROM,
                to: email,
                html: AdminLoginMessage.getHtml(generatedCode),
            });

            await AuthorizationKeyModel.create(authorizationKey as any);
        } catch (err) {
            console.log(err);
            throw new ResponseError(ResponseMessage.MAIL_ERROR, StatusCode.BAD_REQUEST);
        }

        return;
    }

    static async loginAdminWithCode(identifier: string, email: string, code: string): Promise<string> {
        const existingAdmin = await AdminModel.findOne({
            where: {
                username: identifier,
                email: email,
            }
        });

        if (!existingAdmin) {
            throw new ResponseError(ResponseMessage.INVALID_CREDENTIALS, StatusCode.NOT_FOUND);
        }

        const existingKey = await AuthorizationKeyModel.findOne({
            where: {
                key: code,
            }
        });

        if (!existingKey) {
            throw new ResponseError(ResponseMessage.INVALID_AUTH_KEY, StatusCode.NOT_FOUND);
        }

        await existingKey.destroy();
        return JwtService.generateAccessTokenForAdmin(existingAdmin.toJSON() as Admin);
    }
}