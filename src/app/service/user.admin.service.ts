import {UserAdminServiceInterface} from "./interface/user.admin.service.interface";
import {Responses, ServiceResponse} from "./service.response";
import {UserRepository} from "../database/repository/user.repository";
import {
    AcademyMember,
    AuthToken, AwardAndNomination, Citation, DidacticActivity, EditorialMember,
    Id,
    Information,
    ISIProceeding, OrganizedEvent, Patent, ResearchContract,
    ScientificArticleBDI,
    ScientificArticleISI, ScientificBook, ScientificCommunication, Translation,
    User, WithoutActivity
} from "../database/models";
import {JwtService} from "./jwt.service";
import {TablesRepository} from "../database/repository/tables.repository";
import {CSVService} from "./csv.service";

/************************************************************
 *                    ADMIN USER ONLY
 * **********************************************************/
/** As a side note, we know that an auth token is valid because
 * the middleware allowed it to pass here. */
export class UserAdminService implements UserAdminServiceInterface {

    async getAllIds(): Promise<ServiceResponse> {
        const rows: Id[] = await TablesRepository.allIds();
        const parsedRows = [];

        for (let row of rows) {
            const activated = await TablesRepository.idUsed(row.identifier);
            parsedRows.push({...row, activated: activated});
        }

        return new ServiceResponse(true, Responses.SUCCESS, parsedRows);
    }

    async addId(id: Id): Promise<ServiceResponse> {
        if (await TablesRepository.getIdByIdentifier(id.identifier)) {
            return new ServiceResponse(false, Responses.ID_ALREADY_EXISTS, null);
        }

        const rows = await TablesRepository.addId(id);
        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async removeId(id: Id): Promise<ServiceResponse> {
        if (!await TablesRepository.getIdByIdentifier(id.identifier)) {
            return new ServiceResponse(false, Responses.ID_NOT_EXISTS, null);
        }

        const rows = await TablesRepository.removeId(id);
        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

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