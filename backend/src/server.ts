import express, {Express} from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import config from '../config.json';
import fileUpload from "express-fileupload";
import {sequelizeInit} from "./app/database/sequelize";
import {Middleware} from "./app/middleware/middleware";
import {registerAuthEndpoints} from "./app/endpoints/auth.endpoints";
import {registerStudentFormsEndpoints} from "./app/endpoints/student.forms.endpoints";
import {registerStudentEndpoints} from "./app/endpoints/student.endpoints";
import {registerAdminEndpoints} from "./app/endpoints/admin.endpoints";
import {registerCoordinatorEndpoints} from "./app/endpoints/coordinator.endpoints";

/** ENV */
require('dotenv').config();
const env = process.env;
const allowedClients: string[] = ['http://85.122.23.125:4200'];

/** Initialize Express App */
const app: Express = express();

console.log(env.INITIALIZE);

/** Initialize Database */
sequelizeInit(`${env.INITIALIZE}` === 'true')
    .then(r => {})
    .catch(err => console.log(err));

/************************************************************************************
 *                              Basic Express Middlewares
 ***********************************************************************************/

app.set('json spaces', 4);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Handle logs in console during development
if (env.NODE_ENV === 'development' || config.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    app.use(cors({origin: allowedClients}));
}

// Handle security and origin in production
if (env.NODE_ENV === 'production' || config.NODE_ENV === 'production') {
    app.use(helmet());
    app.use(cors({origin: allowedClients}));
}

/************************************************************************************
 *                               Register all REST routes
 ***********************************************************************************/
app.use(fileUpload());

/**  ------------------======================= Visitor Only =======================------------------ */
registerAuthEndpoints(app);

/** ------------------======================= User Only =======================------------------ */
registerStudentEndpoints(app);
registerStudentFormsEndpoints(app);

/** ------------------======================= Admin only =======================------------------ */
registerAdminEndpoints(app);

/** ------------------======================= Coordinator only =======================------------------ */
registerCoordinatorEndpoints(app);


/************************************************************************************
 *                               Express Error Handling
 ***********************************************************************************/
app.use(Middleware.errorHandler);

export default app;