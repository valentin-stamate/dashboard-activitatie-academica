import express, {Express} from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import config from '../config.json';
import fileUpload from "express-fileupload";
import {sequelizeInit} from "./app/database/sequelize";
import {Middleware} from "./app/middleware/middleware";
import {registerAuthEndpoints} from "./app/endpoints/auth.endpoints";
import {registerFormsEndpoints} from "./app/endpoints/forms.endpoints";
import {registerUserEndpoints} from "./app/endpoints/user.endpoints";
import {registerAdminEndpoints} from "./app/endpoints/admin.endpoints";
import {registerCoordinatorEndpoints} from "./app/endpoints/coordinator.endpoints";

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

/**  ------------------======================= Visitor Only =======================------------------ */
registerAuthEndpoints(app);

/** ------------------======================= User Only =======================------------------ */
registerUserEndpoints(app);
registerFormsEndpoints(app);

/** ------------------======================= Admin only =======================------------------ */
registerAdminEndpoints(app);

/** ------------------======================= Coordinator only =======================------------------ */
registerCoordinatorEndpoints(app);


/************************************************************************************
 *                               Express Error Handling
 ***********************************************************************************/
app.use(Middleware.errorHandler);

export default app;