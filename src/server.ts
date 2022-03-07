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
sequelizeInit();

/************************************************************************************
 *                              Basic Express Middlewares
 ***********************************************************************************/

app.set('json spaces', 4);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

/** Visitor only */
app.post(RestEndpoints.USER, Middleware.visitorMiddleware, RestController.signup);
app.post(RestEndpoints.USER_LOGIN, Middleware.visitorMiddleware, RestController.login);
app.post(RestEndpoints.USER_AUTH, Middleware.visitorMiddleware, RestController.authenticate);

/** User only */
app.get(RestEndpoints.INFORMATION, Middleware.userMiddleware, RestController.getInformation);

app.get(RestEndpoints.SCIENTIFIC_ARTICLE_ISI, Middleware.userMiddleware, RestController.getScientificArticleISI);
app.post(RestEndpoints.SCIENTIFIC_ARTICLE_ISI, Middleware.userMiddleware, RestController.addScientificArticleISI);
app.patch(RestEndpoints.SCIENTIFIC_ARTICLE_ISI, Middleware.userMiddleware, RestController.updateScientificArticleISI);
app.delete(RestEndpoints.SCIENTIFIC_ARTICLE_ISI, Middleware.userMiddleware, RestController.deleteScientificArticleISI);

/** Admin only */
app.get(RestEndpoints.USER, Middleware.adminMiddleware, RestController.allUsers);
app.post(RestEndpoints.BASE_INFORMATION, Middleware.adminMiddleware, RestController.importBaseInformation)
app.post(RestEndpoints.ORGANIZATION_EMAIL, Middleware.adminMiddleware, RestController.sendOrganizationEmail)

/************************************************************************************
 *                               Express Error Handling
 ***********************************************************************************/
app.use(Middleware.errorHandler);

export default app;