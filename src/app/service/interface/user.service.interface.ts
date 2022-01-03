import {
    AcademyMember,
    AuthToken, AwardAndNomination, Citation, DidacticActivity, EditorialMember,
    Information,
    ISIProceeding, OrganizedEvent, Patent, ResearchContract,
    ScientificArticleBDI,
    ScientificArticleISI, ScientificBook, ScientificCommunication, Translation,
    User, WithoutActivity
} from "../../database/models";
import {ServiceResponse} from "../service.response";

/** This interface contains only user specific operations.
 * The form association is defined in another interface. */
export interface UserServiceInterface {
    /************************************************************
     *                    UNKNWON USER ONLY
     * **********************************************************/

    /** Sign up a user. After the request an email is sent with the activation key. */
    signUpUser(user: User): Promise<ServiceResponse>;

    /** With the given auth key send to the user's email, if it's valid mark the user as activated. */
    activateUser(activationKey: string): Promise<ServiceResponse>;

    /** When the user logs in, the first part is to send a login key to his email. */
    sendAuthKey(user: User): Promise<ServiceResponse>;

    /** When the user logs in, the second part is to attach the key that was sent to his email.
     * If all is valid, return the JWT token. */
    logInUser(user: User, authKey: string): Promise<ServiceResponse>;

    /************************************************************
     *                       USER ONLY
     * **********************************************************/

    /* Informații */
    getInformation(token: AuthToken): Promise<ServiceResponse>;
    updateInformation(token: AuthToken, data: Information): Promise<ServiceResponse>;
    deleteInformation(token: AuthToken, data: Information): Promise<ServiceResponse>;

    /* Articole științifice publicate în extenso în reviste cotate... (ISI) */
    getScientificArticleISI(token: AuthToken): Promise<ServiceResponse>;
    updateScientificArticleISI(token: AuthToken, data: ScientificArticleISI): Promise<ServiceResponse>;
    deleteScientificArticleISI(token: AuthToken, data: ScientificArticleISI): Promise<ServiceResponse>;

    /* ISI proceedings */
    getISIProceeding(token: AuthToken): Promise<ServiceResponse>;
    updateISIProceeding(token: AuthToken, data: ISIProceeding): Promise<ServiceResponse>;
    deleteISIProceeding(token: AuthToken, data: ISIProceeding): Promise<ServiceResponse>;

    /* Articole științifice publicate în extenso în revi... (BDI) */
    getScientificArticleBDI(token: AuthToken): Promise<ServiceResponse>;
    updateScientificArticleBDI(token: AuthToken, data: ScientificArticleBDI): Promise<ServiceResponse>;
    deleteScientificArticleBDI(token: AuthToken, data: ScientificArticleBDI): Promise<ServiceResponse>;

    /* Cărți ştiinţifice sau capitole de cărți publicate în updateuri */
    getScientificBook(token: AuthToken): Promise<ServiceResponse>;
    updateScientificBook(token: AuthToken, data: ScientificBook): Promise<ServiceResponse>;
    deleteScientificBook(token: AuthToken, data: ScientificBook): Promise<ServiceResponse>;

    /* Traduceri */
    getTranslation(token: AuthToken): Promise<ServiceResponse>;
    updateTranslation(token: AuthToken, data: Translation): Promise<ServiceResponse>;
    deleteTranslation(token: AuthToken, data: Translation): Promise<ServiceResponse>;

    /* Comunicări în manifestări științifice */
    getScientificCommunication(token: AuthToken): Promise<ServiceResponse>;
    updateScientificCommunication(token: AuthToken, data: ScientificCommunication): Promise<ServiceResponse>;
    deleteScientificCommunication(token: AuthToken, data: ScientificCommunication): Promise<ServiceResponse>;

    /* Brevete */
    getPatent(token: AuthToken): Promise<ServiceResponse>;
    updatePatent(token: AuthToken, data: Patent): Promise<ServiceResponse>;
    deletePatent(token: AuthToken, data: Patent): Promise<ServiceResponse>;

    /* Contracte de cercetare */
    getResearchContract(token: AuthToken): Promise<ServiceResponse>;
    updateResearchContract(token: AuthToken, data: ResearchContract): Promise<ServiceResponse>;
    deleteResearchContract(token: AuthToken, data: ResearchContract): Promise<ServiceResponse>;

    /* Citări */
    getCitation(token: AuthToken): Promise<ServiceResponse>;
    updateCitation(token: AuthToken, data: Citation): Promise<ServiceResponse>;
    deleteCitation(token: AuthToken, data: Citation): Promise<ServiceResponse>;

    /* Premii si nominalizări */
    getAwardAndNomination(token: AuthToken): Promise<ServiceResponse>;
    updateAwardAndNomination(token: AuthToken, data: AwardAndNomination): Promise<ServiceResponse>;
    deleteAwardAndNomination(token: AuthToken, data: AwardAndNomination): Promise<ServiceResponse>;

    /* Membru în academii */
    getAcademyMember(token: AuthToken): Promise<ServiceResponse>;
    updateAcademyMember(token: AuthToken, data: AcademyMember): Promise<ServiceResponse>;
    deleteAcademyMember(token: AuthToken, data: AcademyMember): Promise<ServiceResponse>;

    /* Membru în echipa updateorială */
    getEditorialMember(token: AuthToken): Promise<ServiceResponse>;
    updateEditorialMember(token: AuthToken, data: EditorialMember): Promise<ServiceResponse>;
    deleteEditorialMember(token: AuthToken, data: EditorialMember): Promise<ServiceResponse>;

    /* Evenimente organizate */
    getOrganizedEvent(token: AuthToken): Promise<ServiceResponse>;
    updateOrganizedEvent(token: AuthToken, data: OrganizedEvent): Promise<ServiceResponse>;
    deleteOrganizedEvent(token: AuthToken, data: OrganizedEvent): Promise<ServiceResponse>;

    /* Fără activitate științifică */
    getWithoutActivity(token: AuthToken): Promise<ServiceResponse>;
    updateWithoutActivity(token: AuthToken, data: WithoutActivity): Promise<ServiceResponse>;
    deleteWithoutActivity(token: AuthToken, data: WithoutActivity): Promise<ServiceResponse>;

    /* Activitate didactică */
    getDidacticActivity(token: AuthToken): Promise<ServiceResponse>;
    updateDidacticActivity(token: AuthToken, data: DidacticActivity): Promise<ServiceResponse>;
    deleteDidacticActivity(token: AuthToken, data: DidacticActivity): Promise<ServiceResponse>;
}