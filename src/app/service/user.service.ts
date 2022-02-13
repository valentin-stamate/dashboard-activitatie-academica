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

        if (!await TablesRepository.getIdByIdentifier(user.identifier)) {
            return new ServiceResponse(false, Responses.INVALID_IDENTIFIER, null);
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

    /* All Forms */
    async getAllForms(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;

        const inf = await TablesRepository.getInformation(user.id);
        const scISI = await TablesRepository.getScientificArticleISI(user.id);
        const isiPr = await TablesRepository.getISIProceeding(user.id);
        const scBDI = await TablesRepository.getScientificArticleBDI(user.id);
        const scBook = await TablesRepository.getScientificArticleBDI(user.id);
        const tr = await TablesRepository.getTranslation(user.id);
        const scCom = await TablesRepository.getScientificArticleBDI(user.id);
        const patent = await TablesRepository.getPatent(user.id);
        const resCon = await TablesRepository.getResearchContract(user.id);
        const citat = await TablesRepository.getCitation(user.id);
        const awards = await TablesRepository.getAwardAndNomination(user.id);
        const academyM = await TablesRepository.getAcademyMember(user.id);
        const editM = await TablesRepository.getEditorialMember(user.id);
        const orgEv = await TablesRepository.getOrganizedEvent(user.id);
        const without = await TablesRepository.getWithoutActivity(user.id);
        const didactic = await TablesRepository.getDidacticActivity(user.id);

        const list = UtilService.mergeArrays([inf, scISI, isiPr, scBDI, scBook, tr, scCom,
                    patent, resCon, citat, awards, academyM, editM, orgEv, without, didactic]);

        return new ServiceResponse(true, Responses.SUCCESS, list);
    }

    /* Informații */
    async getInformation(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.getInformation(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows);
    }

    async addInformation(authToken: AuthToken, data: Information): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.addInformation(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async updateInformation(authToken: AuthToken, data: Information): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.updateInformation(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deleteInformation(authToken: AuthToken, data: Information): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.deleteInformation(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    /* Articole științifice publicate în extenso în reviste cotate... (ISI) */
    async getScientificArticleISI(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.getScientificArticleISI(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows);
    }

    async addScientificArticleISI(authToken: AuthToken, data: ScientificArticleISI): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.addScientificArticleISI(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async updateScientificArticleISI(authToken: AuthToken, data: ScientificArticleISI): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.updateScientificArticleISI(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deleteScientificArticleISI(authToken: AuthToken, data: ScientificArticleISI): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.deleteScientificArticleISI(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    /* ISI proceedings */
    async getISIProceeding(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.getISIProceeding(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows);
    }

    async addISIProceeding(authToken: AuthToken, data: ISIProceeding): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.addISIProceeding(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async updateISIProceeding(authToken: AuthToken, data: ISIProceeding): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.updateISIProceeding(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deleteISIProceeding(authToken: AuthToken, data: ISIProceeding): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.deleteISIProceeding(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    /* Articole științifice publicate în extenso în revi... (BDI) */
    async getScientificArticleBDI(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.getScientificArticleBDI(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows);
    }

    async addScientificArticleBDI(authToken: AuthToken, data: ScientificArticleBDI): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.addScientificArticleBDI(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async updateScientificArticleBDI(authToken: AuthToken, data: ScientificArticleBDI): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.updateScientificArticleBDI(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deleteScientificArticleBDI(authToken: AuthToken, data: ScientificArticleBDI): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.deleteScientificArticleBDI(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    /* Cărți ştiinţifice sau capitole de cărți publicate în edituri */
    async getScientificBook(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.getScientificBook(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows);
    }

    async addScientificBook(authToken: AuthToken, data: ScientificBook): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.addScientificBook(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async updateScientificBook(authToken: AuthToken, data: ScientificBook): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.updateScientificBook(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deleteScientificBook(authToken: AuthToken, data: ScientificBook): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.deleteScientificBook(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    /* Traduceri */
    async getTranslation(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.getTranslation(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows);
    }

    async addTranslation(authToken: AuthToken, data: Translation): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.addTranslation(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async updateTranslation(authToken: AuthToken, data: Translation): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.updateTranslation(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deleteTranslation(authToken: AuthToken, data: Translation): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User
        data.owner = user.id;

        const rows = await TablesRepository.deleteTranslation(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    /* Comunicări în manifestări științifice */
    async getScientificCommunication(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.getScientificCommunication(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows);
    }

    async addScientificCommunication(authToken: AuthToken, data: ScientificCommunication): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.addScientificCommunication(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async updateScientificCommunication(authToken: AuthToken, data: ScientificCommunication): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.updateScientificCommunication(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deleteScientificCommunication(authToken: AuthToken, data: ScientificCommunication): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.deleteScientificCommunication(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    /* Brevete */
    async getPatent(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.getPatent(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows);
    }

    async addPatent(authToken: AuthToken, data: Patent): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.addPatent(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async updatePatent(authToken: AuthToken, data: Patent): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.updatePatent(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deletePatent(authToken: AuthToken, data: Patent): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.deletePatent(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    /* Contracte de cercetare */
    async getResearchContract(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.getResearchContract(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows);
    }

    async addResearchContract(authToken: AuthToken, data: ResearchContract): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.addResearchContract(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async updateResearchContract(authToken: AuthToken, data: ResearchContract): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.updateResearchContract(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deleteResearchContract(authToken: AuthToken, data: ResearchContract): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.deleteResearchContract(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    /* Citări */
    async getCitation(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.getCitation(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows);
    }

    async addCitation(authToken: AuthToken, data: Citation): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.addCitation(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async updateCitation(authToken: AuthToken, data: Citation): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.updateCitation(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deleteCitation(authToken: AuthToken, data: Citation): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.deleteCitation(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    /* Premii si nominalizări */
    async getAwardAndNomination(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.getAwardAndNomination(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows);
    }

    async addAwardAndNomination(authToken: AuthToken, data: AwardAndNomination): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.addAwardAndNomination(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async updateAwardAndNomination(authToken: AuthToken, data: AwardAndNomination): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.updateAwardAndNomination(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deleteAwardAndNomination(authToken: AuthToken, data: AwardAndNomination): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.deleteAwardAndNomination(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    /* Membru în academii */
    async getAcademyMember(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.getAcademyMember(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows);
    }

    async addAcademyMember(authToken: AuthToken, data: AcademyMember): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.addAcademyMember(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async updateAcademyMember(authToken: AuthToken, data: AcademyMember): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.updateAcademyMember(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deleteAcademyMember(authToken: AuthToken, data: AcademyMember): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.deleteAcademyMember(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    /* Membru în echipa editorială */
    async getEditorialMember(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.getEditorialMember(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows);
    }

    async addEditorialMember(authToken: AuthToken, data: EditorialMember): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.addEditorialMember(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async updateEditorialMember(authToken: AuthToken, data: EditorialMember): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.updateEditorialMember(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deleteEditorialMember(authToken: AuthToken, data: EditorialMember): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.deleteEditorialMember(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    /* Evenimente organizate */
    async getOrganizedEvent(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.getOrganizedEvent(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows);
    }

    async addOrganizedEvent(authToken: AuthToken, data: OrganizedEvent): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.addOrganizedEvent(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async updateOrganizedEvent(authToken: AuthToken, data: OrganizedEvent): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.updateOrganizedEvent(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deleteOrganizedEvent(authToken: AuthToken, data: OrganizedEvent): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.deleteOrganizedEvent(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    /* Fără activitate științifică */
    async getWithoutActivity(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.getWithoutActivity(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows);
    }

    async addWithoutActivity(authToken: AuthToken, data: WithoutActivity): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.addWithoutActivity(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async updateWithoutActivity(authToken: AuthToken, data: WithoutActivity): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.updateWithoutActivity(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deleteWithoutActivity(authToken: AuthToken, data: WithoutActivity): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.deleteWithoutActivity(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    /* Activitate didactică */
    async getDidacticActivity(authToken: AuthToken): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        const rows = await TablesRepository.getDidacticActivity(user.id);

        return new ServiceResponse(true, Responses.SUCCESS, rows);
    }

    async addDidacticActivity(authToken: AuthToken, data: DidacticActivity): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.addDidacticActivity(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async updateDidacticActivity(authToken: AuthToken, data: DidacticActivity): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.updateDidacticActivity(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

    async deleteDidacticActivity(authToken: AuthToken, data: DidacticActivity): Promise<ServiceResponse> {
        const user = JwtService.verifyToken(authToken.token) as User;
        data.owner = user.id;

        const rows = await TablesRepository.deleteDidacticActivity(data);

        return new ServiceResponse(true, Responses.SUCCESS, rows.length);
    }

}