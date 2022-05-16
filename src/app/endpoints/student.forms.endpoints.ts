import {Express} from "express";
import {Middleware} from "../middleware/middleware";
import {StudentFormController} from "../controller/student.form.controller";
import {EndpointIdentifier} from "../../endpoint.identifier";

export function registerStudentFormsEndpoints(app: Express) {
    /* Articole științifice publicate în extenso în reviste cotate Web of Science cu factor de impact */
    app.get(EndpointIdentifier.SCIENTIFIC_ARTICLE_ISI, Middleware.studentMiddleware, StudentFormController.getScientificArticleISI);
    app.post(EndpointIdentifier.SCIENTIFIC_ARTICLE_ISI, Middleware.studentMiddleware, StudentFormController.addScientificArticleISI);
    app.patch(`${EndpointIdentifier.SCIENTIFIC_ARTICLE_ISI}/:id`, Middleware.studentMiddleware, StudentFormController.updateScientificArticleISI);
    app.delete(`${EndpointIdentifier.SCIENTIFIC_ARTICLE_ISI}/:id`, Middleware.studentMiddleware, StudentFormController.deleteScientificArticleISI);

    /* ISI proceedings */
    app.get(EndpointIdentifier.ISI_PROCEEDINGS, Middleware.studentMiddleware, StudentFormController.getISIProceeding);
    app.post(EndpointIdentifier.ISI_PROCEEDINGS, Middleware.studentMiddleware, StudentFormController.addISIProceeding);
    app.patch(`${EndpointIdentifier.ISI_PROCEEDINGS}/:id`, Middleware.studentMiddleware, StudentFormController.updateISIProceeding);
    app.delete(`${EndpointIdentifier.ISI_PROCEEDINGS}/:id`, Middleware.studentMiddleware, StudentFormController.deleteISIProceeding);

    /* Articole științifice publicate în extenso în reviste indexate BDI și reviste de specialitate neindexate */
    app.get(EndpointIdentifier.SCIENTIFIC_ARTICLE_BDI, Middleware.studentMiddleware, StudentFormController.getScientificArticleBDI);
    app.post(EndpointIdentifier.SCIENTIFIC_ARTICLE_BDI, Middleware.studentMiddleware, StudentFormController.addScientificArticleBDI);
    app.patch(`${EndpointIdentifier.SCIENTIFIC_ARTICLE_BDI}/:id`, Middleware.studentMiddleware, StudentFormController.updateScientificArticleBDI);
    app.delete(`${EndpointIdentifier.SCIENTIFIC_ARTICLE_BDI}/:id`, Middleware.studentMiddleware, StudentFormController.deleteScientificArticleBDI);

    /* Cărți ştiinţifice sau capitole de cărți publicate în edituri */
    app.get(EndpointIdentifier.SCIENTIFIC_BOOK, Middleware.studentMiddleware, StudentFormController.getScientificBook);
    app.post(EndpointIdentifier.SCIENTIFIC_BOOK, Middleware.studentMiddleware, StudentFormController.addScientificBook);
    app.patch(`${EndpointIdentifier.SCIENTIFIC_BOOK}/:id`, Middleware.studentMiddleware, StudentFormController.updateScientificBook);
    app.delete(`${EndpointIdentifier.SCIENTIFIC_BOOK}/:id`, Middleware.studentMiddleware, StudentFormController.deleteScientificBook);

    /* Traduceri */
    app.get(EndpointIdentifier.TRANSLATION, Middleware.studentMiddleware, StudentFormController.getTranslation);
    app.post(EndpointIdentifier.TRANSLATION, Middleware.studentMiddleware, StudentFormController.addTranslation);
    app.patch(`${EndpointIdentifier.TRANSLATION}/:id`, Middleware.studentMiddleware, StudentFormController.updateTranslation);
    app.delete(`${EndpointIdentifier.TRANSLATION}/:id`, Middleware.studentMiddleware, StudentFormController.deleteTranslation);

    /* Comunicări în manifestări științifice */
    app.get(EndpointIdentifier.SCIENTIFIC_COMMUNICATION, Middleware.studentMiddleware, StudentFormController.getScientificCommunication);
    app.post(EndpointIdentifier.SCIENTIFIC_COMMUNICATION, Middleware.studentMiddleware, StudentFormController.addScientificCommunication);
    app.patch(`${EndpointIdentifier.SCIENTIFIC_COMMUNICATION}/:id`, Middleware.studentMiddleware, StudentFormController.updateScientificCommunication);
    app.delete(`${EndpointIdentifier.SCIENTIFIC_COMMUNICATION}/:id`, Middleware.studentMiddleware, StudentFormController.deleteScientificCommunication);

    /* Brevete */
    app.get(EndpointIdentifier.PATENT, Middleware.studentMiddleware, StudentFormController.getPatent);
    app.post(EndpointIdentifier.PATENT, Middleware.studentMiddleware, StudentFormController.addPatent);
    app.patch(`${EndpointIdentifier.PATENT}/:id`, Middleware.studentMiddleware, StudentFormController.updatePatent);
    app.delete(`${EndpointIdentifier.PATENT}/:id`, Middleware.studentMiddleware, StudentFormController.deletePatent);

    /* Contracte de cercetare */
    app.get(EndpointIdentifier.RESEARCH_CONTRACT, Middleware.studentMiddleware, StudentFormController.getResearchContract);
    app.post(EndpointIdentifier.RESEARCH_CONTRACT, Middleware.studentMiddleware, StudentFormController.addResearchContract);
    app.patch(`${EndpointIdentifier.RESEARCH_CONTRACT}/:id`, Middleware.studentMiddleware, StudentFormController.updateResearchContract);
    app.delete(`${EndpointIdentifier.RESEARCH_CONTRACT}/:id`, Middleware.studentMiddleware, StudentFormController.deleteResearchContract);

    /* Citări */
    app.get(EndpointIdentifier.CITATION, Middleware.studentMiddleware, StudentFormController.getCitation);
    app.post(EndpointIdentifier.CITATION, Middleware.studentMiddleware, StudentFormController.addCitation);
    app.patch(`${EndpointIdentifier.CITATION}/:id`, Middleware.studentMiddleware, StudentFormController.updateCitation);
    app.delete(`${EndpointIdentifier.CITATION}/:id`, Middleware.studentMiddleware, StudentFormController.deleteCitation);

    /* Premii si nominalizări */
    app.get(EndpointIdentifier.AWARD_AND_NOMINATION, Middleware.studentMiddleware, StudentFormController.getAwardAndNomination);
    app.post(EndpointIdentifier.AWARD_AND_NOMINATION, Middleware.studentMiddleware, StudentFormController.addAwardAndNomination);
    app.patch(`${EndpointIdentifier.AWARD_AND_NOMINATION}/:id`, Middleware.studentMiddleware, StudentFormController.updateAwardAndNomination);
    app.delete(`${EndpointIdentifier.AWARD_AND_NOMINATION}/:id`, Middleware.studentMiddleware, StudentFormController.deleteAwardAndNomination);

    /* Membru în academii */
    app.get(EndpointIdentifier.ACADEMY_MEMBER, Middleware.studentMiddleware, StudentFormController.getAcademyMember);
    app.post(EndpointIdentifier.ACADEMY_MEMBER, Middleware.studentMiddleware, StudentFormController.addAcademyMember);
    app.patch(`${EndpointIdentifier.ACADEMY_MEMBER}/:id`, Middleware.studentMiddleware, StudentFormController.updateAcademyMember);
    app.delete(`${EndpointIdentifier.ACADEMY_MEMBER}/:id`, Middleware.studentMiddleware, StudentFormController.deleteAcademyMember);

    /* Membru în echipa editorială */
    app.get(EndpointIdentifier.EDITORIAL_MEMBER, Middleware.studentMiddleware, StudentFormController.getEditorialMember);
    app.post(EndpointIdentifier.EDITORIAL_MEMBER, Middleware.studentMiddleware, StudentFormController.addEditorialMember);
    app.patch(`${EndpointIdentifier.EDITORIAL_MEMBER}/:id`, Middleware.studentMiddleware, StudentFormController.updateEditorialMember);
    app.delete(`${EndpointIdentifier.EDITORIAL_MEMBER}/:id`, Middleware.studentMiddleware, StudentFormController.deleteEditorialMember);

    /* Evenimente organizate */
    app.get(EndpointIdentifier.ORGANIZED_EVENT, Middleware.studentMiddleware, StudentFormController.getOrganizedEvent);
    app.post(EndpointIdentifier.ORGANIZED_EVENT, Middleware.studentMiddleware, StudentFormController.addOrganizedEvent);
    app.patch(`${EndpointIdentifier.ORGANIZED_EVENT}/:id`, Middleware.studentMiddleware, StudentFormController.updateOrganizedEvent);
    app.delete(`${EndpointIdentifier.ORGANIZED_EVENT}/:id`, Middleware.studentMiddleware, StudentFormController.deleteOrganizedEvent);

    /* Fără activitate științifică */
    app.get(EndpointIdentifier.WITHOUT_ACTIVITY, Middleware.studentMiddleware, StudentFormController.getWithoutActivity);
    app.post(EndpointIdentifier.WITHOUT_ACTIVITY, Middleware.studentMiddleware, StudentFormController.addWithoutActivity);
    app.patch(`${EndpointIdentifier.WITHOUT_ACTIVITY}/:id`, Middleware.studentMiddleware, StudentFormController.updateWithoutActivity);
    app.delete(`${EndpointIdentifier.WITHOUT_ACTIVITY}/:id`, Middleware.studentMiddleware, StudentFormController.deleteWithoutActivity);

    /* Activitate Didactica */
    app.get(EndpointIdentifier.DIDACTIC_ACTIVITY, Middleware.studentMiddleware, StudentFormController.getDidacticActivity);
    app.post(EndpointIdentifier.DIDACTIC_ACTIVITY, Middleware.studentMiddleware, StudentFormController.addDidacticActivity);
    app.patch(`${EndpointIdentifier.DIDACTIC_ACTIVITY}/:id`, Middleware.studentMiddleware, StudentFormController.updateDidacticActivity);
    app.delete(`${EndpointIdentifier.DIDACTIC_ACTIVITY}/:id`, Middleware.studentMiddleware, StudentFormController.deleteDidacticActivity);
}