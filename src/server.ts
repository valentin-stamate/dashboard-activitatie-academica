import express, {Express} from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import config from '../config.json';
import fileUpload from "express-fileupload";
import {sequelizeInit} from "./app/database/sequelize";
import {RestController} from "./app/rest/rest.controller";
import {Middleware} from "./app/rest/rest.middlewares";
import {RestEndpoints} from "./app/rest/rest.endpoints";

/** ENV */
require('dotenv').config();

/** Initialize Express App */
const app: Express = express();

/** Initialize Database */
sequelizeInit().then(r => {});

/************************************************************************************
 *                              Basic Express Middlewares
 ***********************************************************************************/

app.set('json spaces', 4);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Handle logs in console during development
if (process.env.NODE_ENV === 'development' || config.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    app.use(cors({origin: ['http://localhost:4200', 'http://localhost:9876']}));
}

// Handle security and origin in production
if (process.env.NODE_ENV === 'production' || config.NODE_ENV === 'production') {
    app.use(helmet());
}

/************************************************************************************
 *                               Register all REST routes
 ***********************************************************************************/
app.use(fileUpload());

/** Check the user */
app.get(RestEndpoints.CHECK, RestController.check);

/**  ------------------======================= Visitor Only =======================------------------ */
app.post(RestEndpoints.SIGNUP, Middleware.visitorMiddleware, RestController.signup);
app.post(RestEndpoints.LOGIN, Middleware.visitorMiddleware, RestController.login);
app.get(`${RestEndpoints.AUTH}/:key`, Middleware.visitorMiddleware, RestController.authenticate);

/** ------------------======================= User Only =======================------------------ */
app.get(RestEndpoints.INFORMATION, Middleware.userMiddleware, RestController.getInformation);
app.get(RestEndpoints.FORMS, Middleware.userMiddleware, RestController.getForms);

/* Articole științifice publicate în extenso în reviste cotate Web of Science cu factor de impact */
app.get(RestEndpoints.SCIENTIFIC_ARTICLE_ISI, Middleware.userMiddleware, RestController.getScientificArticleISI);
app.post(RestEndpoints.SCIENTIFIC_ARTICLE_ISI, Middleware.userMiddleware, RestController.addScientificArticleISI);
app.patch(`${RestEndpoints.SCIENTIFIC_ARTICLE_ISI}/:id`, Middleware.userMiddleware, RestController.updateScientificArticleISI);
app.delete(`${RestEndpoints.SCIENTIFIC_ARTICLE_ISI}/:id`, Middleware.userMiddleware, RestController.deleteScientificArticleISI);

/* ISI proceedings */
app.get(RestEndpoints.ISI_PROCEEDINGS, Middleware.userMiddleware, RestController.getISIProceeding);
app.post(RestEndpoints.ISI_PROCEEDINGS, Middleware.userMiddleware, RestController.addISIProceeding);
app.patch(`${RestEndpoints.ISI_PROCEEDINGS}/:id`, Middleware.userMiddleware, RestController.updateISIProceeding);
app.delete(`${RestEndpoints.ISI_PROCEEDINGS}/:id`, Middleware.userMiddleware, RestController.deleteISIProceeding);

/* Articole științifice publicate în extenso în reviste indexate BDI și reviste de specialitate neindexate */
app.get(RestEndpoints.SCIENTIFIC_ARTICLE_BDI, Middleware.userMiddleware, RestController.getScientificArticleBDI);
app.post(RestEndpoints.SCIENTIFIC_ARTICLE_BDI, Middleware.userMiddleware, RestController.addScientificArticleBDI);
app.patch(`${RestEndpoints.SCIENTIFIC_ARTICLE_BDI}/:id`, Middleware.userMiddleware, RestController.updateScientificArticleBDI);
app.delete(`${RestEndpoints.SCIENTIFIC_ARTICLE_BDI}/:id`, Middleware.userMiddleware, RestController.deleteScientificArticleBDI);

/* Cărți ştiinţifice sau capitole de cărți publicate în edituri */
app.get(RestEndpoints.SCIENTIFIC_BOOK, Middleware.userMiddleware, RestController.getScientificBook);
app.post(RestEndpoints.SCIENTIFIC_BOOK, Middleware.userMiddleware, RestController.addScientificBook);
app.patch(`${RestEndpoints.SCIENTIFIC_BOOK}/:id`, Middleware.userMiddleware, RestController.updateScientificBook);
app.delete(`${RestEndpoints.SCIENTIFIC_BOOK}/:id`, Middleware.userMiddleware, RestController.deleteScientificBook);

/* Traduceri */
app.get(RestEndpoints.TRANSLATION, Middleware.userMiddleware, RestController.getTranslation);
app.post(RestEndpoints.TRANSLATION, Middleware.userMiddleware, RestController.addTranslation);
app.patch(`${RestEndpoints.TRANSLATION}/:id`, Middleware.userMiddleware, RestController.updateTranslation);
app.delete(`${RestEndpoints.TRANSLATION}/:id`, Middleware.userMiddleware, RestController.deleteTranslation);

/* Comunicări în manifestări științifice */
app.get(RestEndpoints.SCIENTIFIC_COMMUNICATION, Middleware.userMiddleware, RestController.getScientificCommunication);
app.post(RestEndpoints.SCIENTIFIC_COMMUNICATION, Middleware.userMiddleware, RestController.addScientificCommunication);
app.patch(`${RestEndpoints.SCIENTIFIC_COMMUNICATION}/:id`, Middleware.userMiddleware, RestController.updateScientificCommunication);
app.delete(`${RestEndpoints.SCIENTIFIC_COMMUNICATION}/:id`, Middleware.userMiddleware, RestController.deleteScientificCommunication);

/* Brevete */
app.get(RestEndpoints.PATENT, Middleware.userMiddleware, RestController.getPatent);
app.post(RestEndpoints.PATENT, Middleware.userMiddleware, RestController.addPatent);
app.patch(`${RestEndpoints.PATENT}/:id`, Middleware.userMiddleware, RestController.updatePatent);
app.delete(`${RestEndpoints.PATENT}/:id`, Middleware.userMiddleware, RestController.deletePatent);

/* Contracte de cercetare */
app.get(RestEndpoints.RESEARCH_CONTRACT, Middleware.userMiddleware, RestController.getResearchContract);
app.post(RestEndpoints.RESEARCH_CONTRACT, Middleware.userMiddleware, RestController.addResearchContract);
app.patch(`${RestEndpoints.RESEARCH_CONTRACT}/:id`, Middleware.userMiddleware, RestController.updateResearchContract);
app.delete(`${RestEndpoints.RESEARCH_CONTRACT}/:id`, Middleware.userMiddleware, RestController.deleteResearchContract);

/* Citări */
app.get(RestEndpoints.CITATION, Middleware.userMiddleware, RestController.getCitation);
app.post(RestEndpoints.CITATION, Middleware.userMiddleware, RestController.addCitation);
app.patch(`${RestEndpoints.CITATION}/:id`, Middleware.userMiddleware, RestController.updateCitation);
app.delete(`${RestEndpoints.CITATION}/:id`, Middleware.userMiddleware, RestController.deleteCitation);

/* Premii si nominalizări */
app.get(RestEndpoints.AWARD_AND_NOMINATION, Middleware.userMiddleware, RestController.getAwardAndNomination);
app.post(RestEndpoints.AWARD_AND_NOMINATION, Middleware.userMiddleware, RestController.addAwardAndNomination);
app.patch(`${RestEndpoints.AWARD_AND_NOMINATION}/:id`, Middleware.userMiddleware, RestController.updateAwardAndNomination);
app.delete(`${RestEndpoints.AWARD_AND_NOMINATION}/:id`, Middleware.userMiddleware, RestController.deleteAwardAndNomination);

/* Membru în academii */
app.get(RestEndpoints.ACADEMY_MEMBER, Middleware.userMiddleware, RestController.getAcademyMember);
app.post(RestEndpoints.ACADEMY_MEMBER, Middleware.userMiddleware, RestController.addAcademyMember);
app.patch(`${RestEndpoints.ACADEMY_MEMBER}/:id`, Middleware.userMiddleware, RestController.updateAcademyMember);
app.delete(`${RestEndpoints.ACADEMY_MEMBER}/:id`, Middleware.userMiddleware, RestController.deleteAcademyMember);

/* Membru în echipa editorială */
app.get(RestEndpoints.EDITORIAL_MEMBER, Middleware.userMiddleware, RestController.getEditorialMember);
app.post(RestEndpoints.EDITORIAL_MEMBER, Middleware.userMiddleware, RestController.addEditorialMember);
app.patch(`${RestEndpoints.EDITORIAL_MEMBER}/:id`, Middleware.userMiddleware, RestController.updateEditorialMember);
app.delete(`${RestEndpoints.EDITORIAL_MEMBER}/:id`, Middleware.userMiddleware, RestController.deleteEditorialMember);

/* Evenimente organizate */
app.get(RestEndpoints.ORGANIZED_EVENT, Middleware.userMiddleware, RestController.getOrganizedEvent);
app.post(RestEndpoints.ORGANIZED_EVENT, Middleware.userMiddleware, RestController.addOrganizedEvent);
app.patch(`${RestEndpoints.ORGANIZED_EVENT}/:id`, Middleware.userMiddleware, RestController.updateOrganizedEvent);
app.delete(`${RestEndpoints.ORGANIZED_EVENT}/:id`, Middleware.userMiddleware, RestController.deleteOrganizedEvent);

/* Fără activitate științifică */
app.get(RestEndpoints.WITHOUT_ACTIVITY, Middleware.userMiddleware, RestController.getWithoutActivity);
app.post(RestEndpoints.WITHOUT_ACTIVITY, Middleware.userMiddleware, RestController.addWithoutActivity);
app.patch(`${RestEndpoints.WITHOUT_ACTIVITY}/:id`, Middleware.userMiddleware, RestController.updateWithoutActivity);
app.delete(`${RestEndpoints.WITHOUT_ACTIVITY}/:id`, Middleware.userMiddleware, RestController.deleteWithoutActivity);

app.get(RestEndpoints.DIDACTIC_ACTIVITY, Middleware.userMiddleware, RestController.getDidacticActivity);
app.post(RestEndpoints.DIDACTIC_ACTIVITY, Middleware.userMiddleware, RestController.addDidacticActivity);
app.patch(`${RestEndpoints.DIDACTIC_ACTIVITY}/:id`, Middleware.userMiddleware, RestController.updateDidacticActivity);
app.delete(`${RestEndpoints.DIDACTIC_ACTIVITY}/:id`, Middleware.userMiddleware, RestController.deleteDidacticActivity);

/** ------------------======================= Admin only =======================------------------ */
app.get(RestEndpoints.USER, Middleware.adminMiddleware, RestController.allUsers);
app.delete(`${RestEndpoints.USER}/:id`, Middleware.adminMiddleware, RestController.deleteUser);

app.get(RestEndpoints.BASE_INFORMATION, Middleware.adminMiddleware, RestController.getBaseInformation);
app.post(RestEndpoints.BASE_INFORMATION, Middleware.adminMiddleware, RestController.importBaseInformation);
app.delete(`${RestEndpoints.BASE_INFORMATION}/:id`, Middleware.adminMiddleware, RestController.deleteBaseInformation);

app.post(RestEndpoints.TIMETABLE_EMAIL, Middleware.adminMiddleware, RestController.sendTimetableEmail);
app.get(RestEndpoints.EXPORT_FORMS, Middleware.adminMiddleware, RestController.exportForms);

app.post(RestEndpoints.FAZ, Middleware.adminMiddleware, RestController.faz);
app.post(RestEndpoints.VERBAL_PROCESS, Middleware.adminMiddleware, RestController.sendVerbalProcess);

/* Test */
app.post('/test', RestController.test);
/************************************************************************************
 *                               Express Error Handling
 ***********************************************************************************/
app.use(Middleware.errorHandler);

export default app;