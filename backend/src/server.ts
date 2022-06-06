import express, {Express} from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import fileUpload from "express-fileupload";
import {Middleware} from "./app/middleware/middleware";
import {registerAuthEndpoints} from "./app/endpoints/auth.endpoints";
import {registerStudentFormsEndpoints} from "./app/endpoints/student.forms.endpoints";
import {registerStudentEndpoints} from "./app/endpoints/student.endpoints";
import {registerAdminEndpoints} from "./app/endpoints/admin.endpoints";
import {registerCoordinatorEndpoints} from "./app/endpoints/coordinator.endpoints";
import {dbConnection, populateDatabase} from "./app/database/connect";

/** ENV */
import {config} from "dotenv";
config();
const env = process.env;

/** Initialize Express App */
const app: Express = express();

/** Create connection and initialize Database */
dbConnection.initialize()
    .then(() => {
        console.log('Connection created successfully');

        if (env.POPULATE_DB === 'true') {
            populateDatabase();
            console.log('Database was populated');
        }
    })
    .catch(err => {
        console.log(err);
    });


/************************************************************************************
 *                              Basic Express Middlewares
 ***********************************************************************************/

app.set('json spaces', 4);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());

// Handle logs in console during development
if (env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    app.use(cors({origin: ['http://localhost:4200']}));
}

// Handle security and origin in production
if (env.NODE_ENV === 'production') {
    app.use(helmet());
    app.use(cors({origin: ['http://85.122.23.125:4200']}));
}

/************************************************************************************
 *                               Register all REST routes
 ***********************************************************************************/

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

// Start the application by listening to specific port
const port = Number(env.PORT || 8080);
app.listen(port, () => {
    console.info(`Express application started on port: ${port}`);
});