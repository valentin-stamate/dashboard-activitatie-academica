import {UserServiceInterface} from "./interface/user.service.interface";
import {User} from "../database/models";
import {UserRepository} from "../database/repository/user.repository";
import {Responses, ServiceResponse} from "./service.response";
import {ActivationMail, MailService} from "./mail.service";
import {UtilService} from "./util.service";
import {TablesRepository} from "../database/repository/tables.repository";

/** Provides the implementation of the User Service Interface.
 * When the call return an error is false,  */
export class UserService implements UserServiceInterface {

    async addUser(user: User): Promise<ServiceResponse> {

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

        return new ServiceResponse(true, Responses.USER_CREATED, newUser);
    }

    async activateUser(activationKey: string): Promise<ServiceResponse> {
        console.log(activationKey);

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

    async loginUser(user: User): Promise<ServiceResponse> {
        return new ServiceResponse(false, '', null);
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

    sendActivationEmail(): void {
    }

}