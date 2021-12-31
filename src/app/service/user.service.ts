import {UserServiceInterface} from "./interface/user.service.interface";
import {AuthToken, User} from "../database/models";
import {UserRepository} from "../database/repository/user.repository";
import {Responses, ServiceResponse} from "./service.response";
import {ActivationMail, AuthenticationMail, MailService} from "./mail.service";
import {UtilService} from "./util.service";
import {TablesRepository} from "../database/repository/tables.repository";
import {JwtService} from "./jwt.service";

/** Provides the implementation of the User Service Interface.
 * When the call return an error is false,  */
export class UserService implements UserServiceInterface {

    async signUpUser(user: User): Promise<ServiceResponse> {

        if (await UserRepository.getUserByEmail(user.email)) {
            return new ServiceResponse(false, Responses.USER_ALREADY_CREATED, null);
        }

        if (await UserRepository.getUserByIdentifier(user.identifier)) {
            return new ServiceResponse(false, Responses.USER_ALREADY_CREATED, null);
        }

        const rows = await UserRepository.addUser(user);
        const newUser = new User(rows[0]);

        const generatedKey = UtilService.generateRandomString(64);

        await TablesRepository.addActivation({
            id: 0,
            userId: newUser.id,
            activationKey: generatedKey,
        });

        await new MailService().sendMail(new ActivationMail([user.email], [], [], {
            identity: newUser.identifier,
            activationKey: generatedKey,
        }));

        return new ServiceResponse(true, Responses.USER_CREATED, null);
    }

    async activateUser(activationKey: string): Promise<ServiceResponse> {
        const activationRows = await TablesRepository.getActivationByKey(activationKey);

        if (activationRows.length === 0) {
            return new ServiceResponse(false, Responses.INVALID_KEY, null);
        }

        const activation = activationRows[0];
        const user = await UserRepository.getUserById(activation.userId);

        if (!user) {
            return new ServiceResponse(false, Responses.INVALID_KEY_USER_NOT_FOUND, null);
        }

        await UserRepository.setUserActivationStatus(user, true);
        await TablesRepository.deleteActivationByUserId(user.id);

        return new ServiceResponse(true, Responses.USER_ACTIVATED, null);
    }

    async sendAuthKey(user: User): Promise<ServiceResponse> {
        const existingUser = await UserRepository.getUserByIdentifier(user.identifier);

        if (!existingUser) {
            return new ServiceResponse(false, Responses.INVALID_CREDENTIALS, null);
        }

        if (existingUser.email !== user.email) {
            return new ServiceResponse(false, Responses.INVALID_CREDENTIALS, null);
        }

        if (!existingUser.activated) {
            return new ServiceResponse(false, Responses.INACTIVE_ACCOUNT, null);
        }

        const authKey = UtilService.generateRandomString(64);

        const rows = await TablesRepository.getAuthenticationByUserId(existingUser.id);

        if (rows.length !== 0) {
            await TablesRepository.deleteAuthenticationByUserId(existingUser.id);
        }

        await TablesRepository.addAuthentication({
            id: 0,
            userId: existingUser.id,
            authKey: authKey,
        });

        await new MailService().sendMail(new AuthenticationMail([user.email], [], [], {
            identity: existingUser.identifier,
            authKey: authKey,
        }));

        return new ServiceResponse(true, Responses.AUTH_EMAIL_SENT, null);
    }

    async logInUser(user: User, authKey: string): Promise<ServiceResponse> {
        const rows = await TablesRepository.getAuthenticationByKey(authKey);

        if (rows.length === 0) {
            return new ServiceResponse(false, Responses.INVALID_AUTH_KEY, null);
        }

        const auth = rows[0];

        const existingUser = await UserRepository.getUserById(auth.userId);

        if (!existingUser) {
            return new ServiceResponse(false, Responses.SOMETHING_WRONG, null);
        }

        if (existingUser.identifier !== user.identifier || existingUser.email !== user.email) {
            return new ServiceResponse(false, Responses.INVALID_USER, null);
        }

        await TablesRepository.deleteAuthenticationByUserId(existingUser.id);

        const token = JwtService.generateAccesToken(user);
        const authToken = new AuthToken(token);
        return new ServiceResponse(true, Responses.SUCCESS, authToken);
    }

    deactivateUser(): void {
    }

    editUser(): void {
    }

    makeAdminPermission(): void {
    }

    removeAdminPermission(): void {
    }

    removeUser(): void {
    }

}