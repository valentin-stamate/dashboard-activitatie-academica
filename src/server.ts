import express, {Express} from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import config from '../config.json';
import {graphqlHTTP} from 'express-graphql';
import {
  resolversAdmin,
  resolversUnknown,
  resolversUser,
  schemaAdmin,
  schemaUnknown,
  schemaUser
} from "./app/graphql/export";
import {adminUserRequestMiddleware, unknownUserRequestMiddleware, userRequestMiddleware} from "./middlewares";
import {RestService} from "./app/rest/rest";
import fileUpload from "express-fileupload";
import {sequelizeInit} from "./app/database/sequelize/sequelize";

const app: Express = express();
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
 *                               Register all routes
 ***********************************************************************************/

/** ----------------================= GRAPHQL =================---------------- */
app.use('/unknown/graphql', unknownUserRequestMiddleware, graphqlHTTP({
  schema: schemaUnknown,
  rootValue: resolversUnknown,
  graphiql: true,
}));

app.use('/user/graphql', userRequestMiddleware, graphqlHTTP({
  schema: schemaUser,
  rootValue: resolversUser,
  graphiql: true,
}));

app.use('/admin/graphql', adminUserRequestMiddleware, graphqlHTTP({
  schema: schemaAdmin,
  rootValue: resolversAdmin,
  graphiql: true,
}));

/** ----------------================= REST =================---------------- */
app.use(fileUpload());

app.get('/activate', RestService.activateUser);
app.get('/download-forms', adminUserRequestMiddleware, RestService.getForms);
app.post('/admin/organization-email', adminUserRequestMiddleware, RestService.sendOrganizationEmail);
app.post('/admin/send-faz', adminUserRequestMiddleware, RestService.sendFAZ);

/************************************************************************************
 *                               Express Error Handling
 ***********************************************************************************/

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  return res.status(500).json({
    errorName: err.name,
    message: err.message,
    stack: err.stack || 'no stack defined'
  });
});

export default app;