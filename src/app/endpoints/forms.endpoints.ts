import {Express} from "express";
import {Middleware} from "../middleware/middleware";
import {FormController} from "../controller/form.controller";
import {EndpointIdentifier} from "../../endpoint.identifier";

export function registerFormsEndpoints(app: Express) {
    /* Articole științifice publicate în extenso în reviste cotate Web of Science cu factor de impact */
    app.get(EndpointIdentifier.SCIENTIFIC_ARTICLE_ISI, Middleware.studentMiddleware, FormController.getScientificArticleISI);
    app.post(EndpointIdentifier.SCIENTIFIC_ARTICLE_ISI, Middleware.studentMiddleware, FormController.addScientificArticleISI);
    app.patch(`${EndpointIdentifier.SCIENTIFIC_ARTICLE_ISI}/:id`, Middleware.studentMiddleware, FormController.updateScientificArticleISI);
    app.delete(`${EndpointIdentifier.SCIENTIFIC_ARTICLE_ISI}/:id`, Middleware.studentMiddleware, FormController.deleteScientificArticleISI);

    /* ISI proceedings */
    app.get(EndpointIdentifier.ISI_PROCEEDINGS, Middleware.studentMiddleware, FormController.getISIProceeding);
    app.post(EndpointIdentifier.ISI_PROCEEDINGS, Middleware.studentMiddleware, FormController.addISIProceeding);
    app.patch(`${EndpointIdentifier.ISI_PROCEEDINGS}/:id`, Middleware.studentMiddleware, FormController.updateISIProceeding);
    app.delete(`${EndpointIdentifier.ISI_PROCEEDINGS}/:id`, Middleware.studentMiddleware, FormController.deleteISIProceeding);

    /* Articole științifice publicate în extenso în reviste indexate BDI și reviste de specialitate neindexate */
    app.get(EndpointIdentifier.SCIENTIFIC_ARTICLE_BDI, Middleware.studentMiddleware, FormController.getScientificArticleBDI);
    app.post(EndpointIdentifier.SCIENTIFIC_ARTICLE_BDI, Middleware.studentMiddleware, FormController.addScientificArticleBDI);
    app.patch(`${EndpointIdentifier.SCIENTIFIC_ARTICLE_BDI}/:id`, Middleware.studentMiddleware, FormController.updateScientificArticleBDI);
    app.delete(`${EndpointIdentifier.SCIENTIFIC_ARTICLE_BDI}/:id`, Middleware.studentMiddleware, FormController.deleteScientificArticleBDI);

    /* Cărți ştiinţifice sau capitole de cărți publicate în edituri */
    app.get(EndpointIdentifier.SCIENTIFIC_BOOK, Middleware.studentMiddleware, FormController.getScientificBook);
    app.post(EndpointIdentifier.SCIENTIFIC_BOOK, Middleware.studentMiddleware, FormController.addScientificBook);
    app.patch(`${EndpointIdentifier.SCIENTIFIC_BOOK}/:id`, Middleware.studentMiddleware, FormController.updateScientificBook);
    app.delete(`${EndpointIdentifier.SCIENTIFIC_BOOK}/:id`, Middleware.studentMiddleware, FormController.deleteScientificBook);

    /* Traduceri */
    app.get(EndpointIdentifier.TRANSLATION, Middleware.studentMiddleware, FormController.getTranslation);
    app.post(EndpointIdentifier.TRANSLATION, Middleware.studentMiddleware, FormController.addTranslation);
    app.patch(`${EndpointIdentifier.TRANSLATION}/:id`, Middleware.studentMiddleware, FormController.updateTranslation);
    app.delete(`${EndpointIdentifier.TRANSLATION}/:id`, Middleware.studentMiddleware, FormController.deleteTranslation);

    /* Comunicări în manifestări științifice */
    app.get(EndpointIdentifier.SCIENTIFIC_COMMUNICATION, Middleware.studentMiddleware, FormController.getScientificCommunication);
    app.post(EndpointIdentifier.SCIENTIFIC_COMMUNICATION, Middleware.studentMiddleware, FormController.addScientificCommunication);
    app.patch(`${EndpointIdentifier.SCIENTIFIC_COMMUNICATION}/:id`, Middleware.studentMiddleware, FormController.updateScientificCommunication);
    app.delete(`${EndpointIdentifier.SCIENTIFIC_COMMUNICATION}/:id`, Middleware.studentMiddleware, FormController.deleteScientificCommunication);

    /* Brevete */
    app.get(EndpointIdentifier.PATENT, Middleware.studentMiddleware, FormController.getPatent);
    app.post(EndpointIdentifier.PATENT, Middleware.studentMiddleware, FormController.addPatent);
    app.patch(`${EndpointIdentifier.PATENT}/:id`, Middleware.studentMiddleware, FormController.updatePatent);
    app.delete(`${EndpointIdentifier.PATENT}/:id`, Middleware.studentMiddleware, FormController.deletePatent);

    /* Contracte de cercetare */
    app.get(EndpointIdentifier.RESEARCH_CONTRACT, Middleware.studentMiddleware, FormController.getResearchContract);
    app.post(EndpointIdentifier.RESEARCH_CONTRACT, Middleware.studentMiddleware, FormController.addResearchContract);
    app.patch(`${EndpointIdentifier.RESEARCH_CONTRACT}/:id`, Middleware.studentMiddleware, FormController.updateResearchContract);
    app.delete(`${EndpointIdentifier.RESEARCH_CONTRACT}/:id`, Middleware.studentMiddleware, FormController.deleteResearchContract);

    /* Citări */
    app.get(EndpointIdentifier.CITATION, Middleware.studentMiddleware, FormController.getCitation);
    app.post(EndpointIdentifier.CITATION, Middleware.studentMiddleware, FormController.addCitation);
    app.patch(`${EndpointIdentifier.CITATION}/:id`, Middleware.studentMiddleware, FormController.updateCitation);
    app.delete(`${EndpointIdentifier.CITATION}/:id`, Middleware.studentMiddleware, FormController.deleteCitation);

    /* Premii si nominalizări */
    app.get(EndpointIdentifier.AWARD_AND_NOMINATION, Middleware.studentMiddleware, FormController.getAwardAndNomination);
    app.post(EndpointIdentifier.AWARD_AND_NOMINATION, Middleware.studentMiddleware, FormController.addAwardAndNomination);
    app.patch(`${EndpointIdentifier.AWARD_AND_NOMINATION}/:id`, Middleware.studentMiddleware, FormController.updateAwardAndNomination);
    app.delete(`${EndpointIdentifier.AWARD_AND_NOMINATION}/:id`, Middleware.studentMiddleware, FormController.deleteAwardAndNomination);

    /* Membru în academii */
    app.get(EndpointIdentifier.ACADEMY_MEMBER, Middleware.studentMiddleware, FormController.getAcademyMember);
    app.post(EndpointIdentifier.ACADEMY_MEMBER, Middleware.studentMiddleware, FormController.addAcademyMember);
    app.patch(`${EndpointIdentifier.ACADEMY_MEMBER}/:id`, Middleware.studentMiddleware, FormController.updateAcademyMember);
    app.delete(`${EndpointIdentifier.ACADEMY_MEMBER}/:id`, Middleware.studentMiddleware, FormController.deleteAcademyMember);

    /* Membru în echipa editorială */
    app.get(EndpointIdentifier.EDITORIAL_MEMBER, Middleware.studentMiddleware, FormController.getEditorialMember);
    app.post(EndpointIdentifier.EDITORIAL_MEMBER, Middleware.studentMiddleware, FormController.addEditorialMember);
    app.patch(`${EndpointIdentifier.EDITORIAL_MEMBER}/:id`, Middleware.studentMiddleware, FormController.updateEditorialMember);
    app.delete(`${EndpointIdentifier.EDITORIAL_MEMBER}/:id`, Middleware.studentMiddleware, FormController.deleteEditorialMember);

    /* Evenimente organizate */
    app.get(EndpointIdentifier.ORGANIZED_EVENT, Middleware.studentMiddleware, FormController.getOrganizedEvent);
    app.post(EndpointIdentifier.ORGANIZED_EVENT, Middleware.studentMiddleware, FormController.addOrganizedEvent);
    app.patch(`${EndpointIdentifier.ORGANIZED_EVENT}/:id`, Middleware.studentMiddleware, FormController.updateOrganizedEvent);
    app.delete(`${EndpointIdentifier.ORGANIZED_EVENT}/:id`, Middleware.studentMiddleware, FormController.deleteOrganizedEvent);

    /* Fără activitate științifică */
    app.get(EndpointIdentifier.WITHOUT_ACTIVITY, Middleware.studentMiddleware, FormController.getWithoutActivity);
    app.post(EndpointIdentifier.WITHOUT_ACTIVITY, Middleware.studentMiddleware, FormController.addWithoutActivity);
    app.patch(`${EndpointIdentifier.WITHOUT_ACTIVITY}/:id`, Middleware.studentMiddleware, FormController.updateWithoutActivity);
    app.delete(`${EndpointIdentifier.WITHOUT_ACTIVITY}/:id`, Middleware.studentMiddleware, FormController.deleteWithoutActivity);

    /* Activitate Didactica */
    app.get(EndpointIdentifier.DIDACTIC_ACTIVITY, Middleware.studentMiddleware, FormController.getDidacticActivity);
    app.post(EndpointIdentifier.DIDACTIC_ACTIVITY, Middleware.studentMiddleware, FormController.addDidacticActivity);
    app.patch(`${EndpointIdentifier.DIDACTIC_ACTIVITY}/:id`, Middleware.studentMiddleware, FormController.updateDidacticActivity);
    app.delete(`${EndpointIdentifier.DIDACTIC_ACTIVITY}/:id`, Middleware.studentMiddleware, FormController.deleteDidacticActivity);
}