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
sequelizeInit(false)
    .then(r => {})
    .catch(err => console.log(err));

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
app.post(RestEndpoints.SIGNUP_STUDENT, Middleware.visitorMiddleware, RestController.signupStudent);

app.post(RestEndpoints.LOGIN_STUDENT, Middleware.visitorMiddleware, RestController.loginStudent);
app.post(RestEndpoints.LOGIN_COORDINATOR, Middleware.visitorMiddleware, RestController.loginCoordinator);
app.post(RestEndpoints.LOGIN_ADMIN, Middleware.visitorMiddleware, RestController.loginAdmin);

/** ------------------======================= User Only =======================------------------ */
app.get(RestEndpoints.INFORMATION, Middleware.studentMiddleware, RestController.getInformation);
app.get(RestEndpoints.FORMS, Middleware.studentMiddleware, RestController.getForms);

/* Articole științifice publicate în extenso în reviste cotate Web of Science cu factor de impact */
app.get(RestEndpoints.SCIENTIFIC_ARTICLE_ISI, Middleware.studentMiddleware, RestController.getScientificArticleISI);
app.post(RestEndpoints.SCIENTIFIC_ARTICLE_ISI, Middleware.studentMiddleware, RestController.addScientificArticleISI);
app.patch(`${RestEndpoints.SCIENTIFIC_ARTICLE_ISI}/:id`, Middleware.studentMiddleware, RestController.updateScientificArticleISI);
app.delete(`${RestEndpoints.SCIENTIFIC_ARTICLE_ISI}/:id`, Middleware.studentMiddleware, RestController.deleteScientificArticleISI);

/* ISI proceedings */
app.get(RestEndpoints.ISI_PROCEEDINGS, Middleware.studentMiddleware, RestController.getISIProceeding);
app.post(RestEndpoints.ISI_PROCEEDINGS, Middleware.studentMiddleware, RestController.addISIProceeding);
app.patch(`${RestEndpoints.ISI_PROCEEDINGS}/:id`, Middleware.studentMiddleware, RestController.updateISIProceeding);
app.delete(`${RestEndpoints.ISI_PROCEEDINGS}/:id`, Middleware.studentMiddleware, RestController.deleteISIProceeding);

/* Articole științifice publicate în extenso în reviste indexate BDI și reviste de specialitate neindexate */
app.get(RestEndpoints.SCIENTIFIC_ARTICLE_BDI, Middleware.studentMiddleware, RestController.getScientificArticleBDI);
app.post(RestEndpoints.SCIENTIFIC_ARTICLE_BDI, Middleware.studentMiddleware, RestController.addScientificArticleBDI);
app.patch(`${RestEndpoints.SCIENTIFIC_ARTICLE_BDI}/:id`, Middleware.studentMiddleware, RestController.updateScientificArticleBDI);
app.delete(`${RestEndpoints.SCIENTIFIC_ARTICLE_BDI}/:id`, Middleware.studentMiddleware, RestController.deleteScientificArticleBDI);

/* Cărți ştiinţifice sau capitole de cărți publicate în edituri */
app.get(RestEndpoints.SCIENTIFIC_BOOK, Middleware.studentMiddleware, RestController.getScientificBook);
app.post(RestEndpoints.SCIENTIFIC_BOOK, Middleware.studentMiddleware, RestController.addScientificBook);
app.patch(`${RestEndpoints.SCIENTIFIC_BOOK}/:id`, Middleware.studentMiddleware, RestController.updateScientificBook);
app.delete(`${RestEndpoints.SCIENTIFIC_BOOK}/:id`, Middleware.studentMiddleware, RestController.deleteScientificBook);

/* Traduceri */
app.get(RestEndpoints.TRANSLATION, Middleware.studentMiddleware, RestController.getTranslation);
app.post(RestEndpoints.TRANSLATION, Middleware.studentMiddleware, RestController.addTranslation);
app.patch(`${RestEndpoints.TRANSLATION}/:id`, Middleware.studentMiddleware, RestController.updateTranslation);
app.delete(`${RestEndpoints.TRANSLATION}/:id`, Middleware.studentMiddleware, RestController.deleteTranslation);

/* Comunicări în manifestări științifice */
app.get(RestEndpoints.SCIENTIFIC_COMMUNICATION, Middleware.studentMiddleware, RestController.getScientificCommunication);
app.post(RestEndpoints.SCIENTIFIC_COMMUNICATION, Middleware.studentMiddleware, RestController.addScientificCommunication);
app.patch(`${RestEndpoints.SCIENTIFIC_COMMUNICATION}/:id`, Middleware.studentMiddleware, RestController.updateScientificCommunication);
app.delete(`${RestEndpoints.SCIENTIFIC_COMMUNICATION}/:id`, Middleware.studentMiddleware, RestController.deleteScientificCommunication);

/* Brevete */
app.get(RestEndpoints.PATENT, Middleware.studentMiddleware, RestController.getPatent);
app.post(RestEndpoints.PATENT, Middleware.studentMiddleware, RestController.addPatent);
app.patch(`${RestEndpoints.PATENT}/:id`, Middleware.studentMiddleware, RestController.updatePatent);
app.delete(`${RestEndpoints.PATENT}/:id`, Middleware.studentMiddleware, RestController.deletePatent);

/* Contracte de cercetare */
app.get(RestEndpoints.RESEARCH_CONTRACT, Middleware.studentMiddleware, RestController.getResearchContract);
app.post(RestEndpoints.RESEARCH_CONTRACT, Middleware.studentMiddleware, RestController.addResearchContract);
app.patch(`${RestEndpoints.RESEARCH_CONTRACT}/:id`, Middleware.studentMiddleware, RestController.updateResearchContract);
app.delete(`${RestEndpoints.RESEARCH_CONTRACT}/:id`, Middleware.studentMiddleware, RestController.deleteResearchContract);

/* Citări */
app.get(RestEndpoints.CITATION, Middleware.studentMiddleware, RestController.getCitation);
app.post(RestEndpoints.CITATION, Middleware.studentMiddleware, RestController.addCitation);
app.patch(`${RestEndpoints.CITATION}/:id`, Middleware.studentMiddleware, RestController.updateCitation);
app.delete(`${RestEndpoints.CITATION}/:id`, Middleware.studentMiddleware, RestController.deleteCitation);

/* Premii si nominalizări */
app.get(RestEndpoints.AWARD_AND_NOMINATION, Middleware.studentMiddleware, RestController.getAwardAndNomination);
app.post(RestEndpoints.AWARD_AND_NOMINATION, Middleware.studentMiddleware, RestController.addAwardAndNomination);
app.patch(`${RestEndpoints.AWARD_AND_NOMINATION}/:id`, Middleware.studentMiddleware, RestController.updateAwardAndNomination);
app.delete(`${RestEndpoints.AWARD_AND_NOMINATION}/:id`, Middleware.studentMiddleware, RestController.deleteAwardAndNomination);

/* Membru în academii */
app.get(RestEndpoints.ACADEMY_MEMBER, Middleware.studentMiddleware, RestController.getAcademyMember);
app.post(RestEndpoints.ACADEMY_MEMBER, Middleware.studentMiddleware, RestController.addAcademyMember);
app.patch(`${RestEndpoints.ACADEMY_MEMBER}/:id`, Middleware.studentMiddleware, RestController.updateAcademyMember);
app.delete(`${RestEndpoints.ACADEMY_MEMBER}/:id`, Middleware.studentMiddleware, RestController.deleteAcademyMember);

/* Membru în echipa editorială */
app.get(RestEndpoints.EDITORIAL_MEMBER, Middleware.studentMiddleware, RestController.getEditorialMember);
app.post(RestEndpoints.EDITORIAL_MEMBER, Middleware.studentMiddleware, RestController.addEditorialMember);
app.patch(`${RestEndpoints.EDITORIAL_MEMBER}/:id`, Middleware.studentMiddleware, RestController.updateEditorialMember);
app.delete(`${RestEndpoints.EDITORIAL_MEMBER}/:id`, Middleware.studentMiddleware, RestController.deleteEditorialMember);

/* Evenimente organizate */
app.get(RestEndpoints.ORGANIZED_EVENT, Middleware.studentMiddleware, RestController.getOrganizedEvent);
app.post(RestEndpoints.ORGANIZED_EVENT, Middleware.studentMiddleware, RestController.addOrganizedEvent);
app.patch(`${RestEndpoints.ORGANIZED_EVENT}/:id`, Middleware.studentMiddleware, RestController.updateOrganizedEvent);
app.delete(`${RestEndpoints.ORGANIZED_EVENT}/:id`, Middleware.studentMiddleware, RestController.deleteOrganizedEvent);

/* Fără activitate științifică */
app.get(RestEndpoints.WITHOUT_ACTIVITY, Middleware.studentMiddleware, RestController.getWithoutActivity);
app.post(RestEndpoints.WITHOUT_ACTIVITY, Middleware.studentMiddleware, RestController.addWithoutActivity);
app.patch(`${RestEndpoints.WITHOUT_ACTIVITY}/:id`, Middleware.studentMiddleware, RestController.updateWithoutActivity);
app.delete(`${RestEndpoints.WITHOUT_ACTIVITY}/:id`, Middleware.studentMiddleware, RestController.deleteWithoutActivity);

app.get(RestEndpoints.DIDACTIC_ACTIVITY, Middleware.studentMiddleware, RestController.getDidacticActivity);
app.post(RestEndpoints.DIDACTIC_ACTIVITY, Middleware.studentMiddleware, RestController.addDidacticActivity);
app.patch(`${RestEndpoints.DIDACTIC_ACTIVITY}/:id`, Middleware.studentMiddleware, RestController.updateDidacticActivity);
app.delete(`${RestEndpoints.DIDACTIC_ACTIVITY}/:id`, Middleware.studentMiddleware, RestController.deleteDidacticActivity);

/** ------------------======================= Admin only =======================------------------ */
app.get(RestEndpoints.USER, Middleware.adminMiddleware, RestController.allUsers);
app.delete(`${RestEndpoints.USER}/:id`, Middleware.adminMiddleware, RestController.deleteUser);

app.get(RestEndpoints.BASE_INFORMATION, Middleware.adminMiddleware, RestController.getBaseInformation);
app.post(RestEndpoints.BASE_INFORMATION, Middleware.adminMiddleware, RestController.importBaseInformation);
app.delete(`${RestEndpoints.BASE_INFORMATION}/:id`, Middleware.adminMiddleware, RestController.deleteBaseInformation);

app.post(RestEndpoints.SEMESTER_ACTIVITY_EMAIL, Middleware.adminMiddleware, RestController.sendSemesterActivityEmail);
app.post(RestEndpoints.FAZ, Middleware.adminMiddleware, RestController.faz);
app.post(RestEndpoints.VERBAL_PROCESS, Middleware.adminMiddleware, RestController.sendVerbalProcess);
app.post(RestEndpoints.THESIS_NOTIFICATION, Middleware.adminMiddleware, RestController.sendThesisEmailNotification);
app.get(RestEndpoints.EXPORT_FORMS, Middleware.adminMiddleware, RestController.exportForms);
app.post(RestEndpoints.IMPORT_COORDINATORS, Middleware.adminMiddleware, RestController.importCoordinators);
app.get(RestEndpoints.COORDINATORS, Middleware.adminMiddleware, RestController.getCoordinators);

/** ------------------======================= Coordinator only =======================------------------ */
app.get(RestEndpoints.COORDINATOR_STUDENTS, Middleware.coordinatorMiddleware, RestController.getCoordinatorStudents);


/************************************************************************************
 *                               Express Error Handling
 ***********************************************************************************/
app.use(Middleware.errorHandler);

export default app;