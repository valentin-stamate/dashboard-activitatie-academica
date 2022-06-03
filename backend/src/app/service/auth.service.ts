import {ResponseError} from "../middleware/middleware";
import {ResponseMessage, StatusCode} from "../services/rest.util";
import {AdminModel, AllowedStudentModel, AuthorizationKeyModel, CoordinatorModel, StudentModel} from "../database/db.models";
import {UtilService} from "../services/util.service";
import {CryptoUtil} from "../services/crypto.util";
import sha256 from "crypto-js/sha256";
import {AdminLoginMessage, EmailDefaults, LoginMessage, MailService, SignupMessage} from "../services/email.service";
import {JwtService} from "../services/jwt.service";
import {dbConnection} from "../database/connect";

export class AuthService {

    static async check(user: any): Promise<number> {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const coordinatorRepo = dbConnection.getRepository(CoordinatorModel);
        const adminRepo = dbConnection.getRepository(AdminModel);

        let studentRow = await studentRepo.findOne({
            where: {
                id: user.id,
                fullName: user.fullName ?? '',
                identifier: user.identifier ?? '',
                email: user.email ?? '',
            }});

        let coordinatorRow = await coordinatorRepo.findOne({
            where: {
                id: user.id,
                name: user.name ?? '',
                function: user.function ?? '',
                email: user.email ?? '',
            }});

        let adminRow = await adminRepo.findOne({
            where: {
                id: user.id,
                username: user.username ?? 'none',
            }});

        if (studentRow == null && coordinatorRow == null && adminRow == null) {
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
        const studentRepo = dbConnection.getRepository(StudentModel);
        const allowedStudentRepo = dbConnection.getRepository(AllowedStudentModel);

        const existingUser = await studentRepo.findOne({
            where: {
                identifier: identifier,
            }
        });

        if (existingUser !== null) {
            throw new ResponseError(ResponseMessage.DATA_TAKEN, StatusCode.BAD_REQUEST);
        }

        const existingAllowedStudent = await allowedStudentRepo.findOne({
            where: {
                identifier: identifier
            }
        });

        if (existingAllowedStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_REGISTERED, StatusCode.NOT_ACCEPTABLE);
        }

        const studentModel = StudentModel.fromObject({
            identifier: identifier,
            fullName: existingAllowedStudent.fullName,
            email: email,
            alternativeEmail: alternativeEmail,
            attendanceYear: existingAllowedStudent.attendanceYear,
            coordinatorName: existingAllowedStudent.coordinatorName,
            coordinatorFunction: existingAllowedStudent.coordinatorFunction,
        });

        try {
            await MailService.sendMail({
                subject: SignupMessage.subject,
                from: EmailDefaults.FROM,
                to: email,
                html: SignupMessage.getHtml(email),
            });
        } catch (err) {
            console.log(err);
            throw new ResponseError(ResponseMessage.MAIL_ERROR, StatusCode.BAD_REQUEST);
        }

        await studentRepo.save(studentModel);
        return;
    }

    static async loginStudent(identifier: string, loginEmail: string) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const authorizationKeyRepo = dbConnection.getRepository(AuthorizationKeyModel);

        const existingStudent = await studentRepo.findOne({
            where: [
                {
                    identifier: identifier,
                    email: loginEmail
                },
                {
                    identifier: identifier,
                    alternativeEmail: loginEmail
                }
            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        if (!existingStudent.isActive) {
            throw new ResponseError(ResponseMessage.INACTIVE_USER, StatusCode.FORBIDDEN);
        }

        const generatedCode = UtilService.generateRandomString(16);
        const authorizationKey: AuthorizationKeyModel = AuthorizationKeyModel.fromObject({
            key: generatedCode
        });

        try {
            await MailService.sendMail({
                subject: LoginMessage.subject,
                from: EmailDefaults.FROM,
                to: loginEmail,
                html: LoginMessage.getHtml(generatedCode),
            });

            await authorizationKeyRepo.save(authorizationKey);
        } catch (err) {
            console.log(err);
            throw new ResponseError(ResponseMessage.MAIL_ERROR, StatusCode.BAD_REQUEST);
        }

        return;
    }

    static async loginStudentWithCode(identifier: string, loginEmail: string, code: string) {
        const studentRepo = dbConnection.getRepository(StudentModel);
        const authorizationKeyRepo = dbConnection.getRepository(AuthorizationKeyModel);

        const existingStudent = await studentRepo.findOne({
            where: [
                {
                    identifier: identifier,
                    email: loginEmail
                },
                {
                    identifier: identifier,
                    alternativeEmail: loginEmail
                }

            ]
        });

        if (existingStudent == null) {
            throw new ResponseError(ResponseMessage.INVALID_CREDENTIALS, StatusCode.NOT_FOUND);
        }

        if (!existingStudent.isActive) {
            throw new ResponseError(ResponseMessage.INACTIVE_USER, StatusCode.FORBIDDEN);
        }

        const existingKey = await authorizationKeyRepo.findOne({
            where: {
                key: code,
            }
        });

        if (existingKey == null) {
            throw new ResponseError(ResponseMessage.INVALID_AUTH_KEY, StatusCode.NOT_FOUND);
        }

        await authorizationKeyRepo.remove(existingKey);
        return JwtService.generateAccessTokenForStudent(existingStudent);
    }

    static async loginCoordinator(email: string, code: string): Promise<string> {
        const coordinatorRepo = dbConnection.getRepository(CoordinatorModel);

        const hashedPassword = sha256(CryptoUtil.scufflePassword(code)).toString();

        const existingUser = await coordinatorRepo.findOne({
            where: {
                email: email,
                password: hashedPassword,
            }
        });

        if (existingUser == null) {
            throw new ResponseError(ResponseMessage.INVALID_CREDENTIALS, StatusCode.NOT_FOUND);
        }

        return JwtService.generateAccessTokenForCoordinator(existingUser);
    }

    static async loginAdmin(username: string, email: string): Promise<void> {
        const adminRepo = dbConnection.getRepository(AdminModel);
        const authorizationKeyRepo = dbConnection.getRepository(AuthorizationKeyModel);

        console.log(username);
        console.log(email);

        const existingAdmin = await adminRepo.findOne({
            where: {
                username: username,
                email: email,
            }
        });

        if (existingAdmin == null) {
            throw new ResponseError(ResponseMessage.USER_NOT_FOUND, StatusCode.NOT_FOUND);
        }

        const generatedCode = UtilService.generateRandomString(16);
        const authorizationKey = AuthorizationKeyModel.fromObject({
            key: generatedCode
        });

        try {
            await MailService.sendMail({
                subject: AdminLoginMessage.subject,
                from: EmailDefaults.FROM,
                to: email,
                html: AdminLoginMessage.getHtml(generatedCode),
            });

            await authorizationKeyRepo.save(authorizationKey);
        } catch (err) {
            console.log(err);
            throw new ResponseError(ResponseMessage.MAIL_ERROR, StatusCode.BAD_REQUEST);
        }

        return;
    }

    static async loginAdminWithCode(identifier: string, email: string, code: string): Promise<string> {
        const adminRepo = dbConnection.getRepository(AdminModel);
        const authorizationKeyRepo = dbConnection.getRepository(AuthorizationKeyModel);

        const existingAdmin = await adminRepo.findOne({
            where: {
                username: identifier,
                email: email,
            }
        });

        if (existingAdmin == null) {
            throw new ResponseError(ResponseMessage.INVALID_CREDENTIALS, StatusCode.NOT_FOUND);
        }

        const existingKey = await authorizationKeyRepo.findOne({
            where: {
                key: code,
            }
        });

        if (existingKey == null) {
            throw new ResponseError(ResponseMessage.INVALID_AUTH_KEY, StatusCode.NOT_FOUND);
        }

        await authorizationKeyRepo.remove(existingKey);
        return JwtService.generateAccessTokenForAdmin(existingAdmin);
    }
}