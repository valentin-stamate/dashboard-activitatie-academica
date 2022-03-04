import {UserAdminServiceInterface} from "./interface/user.admin.service.interface";
import {Responses, ServiceResponse} from "./service.response";
import {UserRepository} from "../database/repository/user.repository";
import {AuthToken, User} from "../database/models";
import {JwtService} from "./jwt.service";

/************************************************************
 *                    ADMIN USER ONLY
 * **********************************************************/
/** As a side note, we know that an auth token is valid because
 * the middleware allowed it to pass here. */
export class UserAdminService implements UserAdminServiceInterface {

    async getAllUsers(authToken: AuthToken): Promise<ServiceResponse> {
        const user = await JwtService.verifyToken(authToken.token) as User;
        const users = await UserRepository.allUsersExcept(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, users);
    }

    async activateUser(user: User): Promise<ServiceResponse> {
        const rows = await UserRepository.setUserActivationStatus(user, true);
        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deactivateUser(user: User): Promise<ServiceResponse> {
        const rows = await UserRepository.setUserActivationStatus(user, false);
        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async makeUserAdmin(user: User): Promise<ServiceResponse> {
        const rows = await UserRepository.setUserAdminStatus(user, true);
        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async removeUserAdmin(user: User): Promise<ServiceResponse> {
        const rows = await UserRepository.setUserAdminStatus(user, false);
        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async removeUser(user: User): Promise<ServiceResponse> {
        const rows = await UserRepository.deleteUser(user);
        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

}