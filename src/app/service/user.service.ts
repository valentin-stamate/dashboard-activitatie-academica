import {UserServiceInterface} from "./interface/user.service.interface";
import {
    AcademyMember,
    AuthToken, AwardAndNomination, Citation, DidacticActivity, EditorialMember,
    Information,
    ISIProceeding, OrganizedEvent, Patent, ResearchContract,
    ScientificArticleBDI,
    ScientificArticleISI, ScientificBook, ScientificCommunication, Translation,
    User, WithoutActivity
} from "../database/models";
import {UserRepository} from "../database/repository/user.repository";
import {Responses, ServiceResponse} from "./service.response";
import {ActivationMail, AuthenticationMail, MailService} from "./mail.service";
import {UtilService} from "./util.service";
import {TablesRepository} from "../database/repository/tables.repository";
import {JwtService} from "./jwt.service";

/** Provides the implementation of the User Service Interface.
 * When the call return an error is false,  */
export class UserService implements UserServiceInterface {

    /************************************************************
     *                    UNKNWON USER ONLY
     * **********************************************************/

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
        await TablesRepository.deleteActivationByUser(user.id);

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

        const rows = await TablesRepository.getAuthenticationByUser(existingUser.id);

        if (rows.length !== 0) {
            await TablesRepository.deleteAuthenticationByUser(existingUser.id);
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

        await TablesRepository.deleteAuthenticationByUser(existingUser.id);

        const token = JwtService.generateAccesToken(existingUser);
        const authToken = new AuthToken(token);
        return new ServiceResponse(true, Responses.SUCCESS, authToken);
    }

    /************************************************************
     *                       USER ONLY
     * **********************************************************/
    /** As a side note, we know that an auth token is valid because
     * the middleware allowed it to pass here.
     * For security reasons, the payload owner is set again.*/

    /* Informații */
    async getInformation(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.getInformationByUser(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows);
    }

    async updateInformation(authToken: AuthToken, data: Information): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.addOrUpdateInformation(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deleteInformation(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.deleteInformationByUser(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    /* Articole științifice publicate în extenso în reviste cotate... (ISI) */
    async getScientificArticleISI(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.getScientificArticleISIByUser(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows);
    }

    async updateScientificArticleISI(authToken: AuthToken, data: ScientificArticleISI): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.addOrUpdateScientificArticleISI(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deleteScientificArticleISI(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.deleteScientificArticleISIByUser(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    /* ISI proceedings */
    async getISIProceeding(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.getISIProceedingByUser(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows);
    }

    async updateISIProceeding(authToken: AuthToken, data: ISIProceeding): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.addOrUpdateISIProceeding(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deleteISIProceeding(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.deleteISIProceedingByUser(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    /* Articole științifice publicate în extenso în revi... (BDI) */
    async getScientificArticleBDI(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.getScientificArticleBDIByUser(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows);
    }

    async updateScientificArticleBDI(authToken: AuthToken, data: ScientificArticleBDI): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.addOrUpdateScientificArticleBDI(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deleteScientificArticleBDI(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.deleteScientificArticleBDIByUser(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    /* Cărți ştiinţifice sau capitole de cărți publicate în edituri */
    async getScientificBook(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.getScientificBookByUser(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows);
    }

    async updateScientificBook(authToken: AuthToken, data: ScientificBook): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.addOrUpdateScientificBook(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deleteScientificBook(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.deleteScientificBookByUser(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    /* Traduceri */
    async getTranslation(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.getTranslationByUser(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows);
    }

    async updateTranslation(authToken: AuthToken, data: Translation): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.addOrUpdateTranslation(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deleteTranslation(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.deleteTranslationByUser(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    /* Comunicări în manifestări științifice */
    async getScientificCommunication(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.getScientificCommunicationByUser(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows);
    }

    async updateScientificCommunication(authToken: AuthToken, data: ScientificCommunication): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.addOrUpdateScientificCommunication(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deleteScientificCommunication(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.deleteScientificCommunicationByUser(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    /* Brevete */
    async getPatent(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.getPatentByUser(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows);
    }

    async updatePatent(authToken: AuthToken, data: Patent): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.addOrUpdatePatent(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deletePatent(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.deletePatentByUser(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    /* Contracte de cercetare */
    async getResearchContract(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.getResearchContractByUser(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows);
    }

    async updateResearchContract(authToken: AuthToken, data: ResearchContract): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.addOrUpdateResearchContract(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deleteResearchContract(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.deleteResearchContractByUser(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    /* Citări */
    async getCitation(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.getCitationByUser(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows);
    }

    async updateCitation(authToken: AuthToken, data: Citation): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.addOrUpdateCitation(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deleteCitation(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.deleteCitationByUser(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    /* Premii si nominalizări */
    async getAwardAndNomination(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.getAwardAndNominationByUser(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows);
    }

    async updateAwardAndNomination(authToken: AuthToken, data: AwardAndNomination): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.addOrUpdateAwardAndNomination(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deleteAwardAndNomination(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.deleteAwardAndNominationByUser(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    /* Membru în academii */
    async getAcademyMember(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.getAcademyMemberByUser(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows);
    }

    async updateAcademyMember(authToken: AuthToken, data: AcademyMember): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.addOrUpdateAcademyMember(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deleteAcademyMember(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.deleteAcademyMemberByUser(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    /* Membru în echipa editorială */
    async getEditorialMember(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.getEditorialMemberByUser(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows);
    }

    async updateEditorialMember(authToken: AuthToken, data: EditorialMember): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.addOrUpdateEditorialMember(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deleteEditorialMember(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.deleteEditorialMemberByUser(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    /* Evenimente organizate */
    async getOrganizedEvent(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.getOrganizedEventByUser(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows);
    }

    async updateOrganizedEvent(authToken: AuthToken, data: OrganizedEvent): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.addOrUpdateOrganizedEvent(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deleteOrganizedEvent(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.deleteOrganizedEventByUser(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    /* Fără activitate științifică */
    async getWithoutActivity(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.getWithoutActivityByUser(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows);
    }

    async updateWithoutActivity(authToken: AuthToken, data: WithoutActivity): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.addOrUpdateWithoutActivity(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deleteWithoutActivity(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.deleteWithoutActivityByUser(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    /* Activitate didactică */
    async getDidacticActivity(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.getDidacticActivityByUser(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows);
    }

    async updateDidacticActivity(authToken: AuthToken, data: DidacticActivity): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.addOrUpdateDidacticActivity(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deleteDidacticActivity(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.deleteDidacticActivityByUser(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    /************************************************************
     *                    ADMIN USER ONLY
     * **********************************************************/
    /** As a side note, we know that an auth token is valid because
     * the middleware allowed it to pass here. */

}