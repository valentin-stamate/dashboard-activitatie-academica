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
import {UserService} from "./app/service/user.service";
import {Responses} from "./app/service/service.response";
import {adminUserRequestMiddleware, unknownUserRequestMiddleware, userRequestMiddleware} from "./middlewares";
import {RestService} from "./app/rest/rest";
import {WorkBook, WorkSheet} from "xlsx";
import {UtilService} from "./app/service/util.service";

const app: Express = express();

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

/** User activation by email */
app.get('/activate', async (req, res) => {
  const key = req.query.key as string;
  console.log(key);
  if (!key) {
    res.end(JSON.stringify({message: Responses.MISSING_KEY}));
    return;
  }

  const userService = new UserService();
  const serviceResponse = await userService.activateUser(key);

  res.end(JSON.stringify({message:serviceResponse.message}));
});

const XLSX = require('XLSX');
app.get('/download-forms', adminUserRequestMiddleware, async (req, res) => {

  const workBook: WorkBook = (await RestService.getFormsWorkBook()).getInstance();

  const date = new Date();
  const fileName = `data_${UtilService.stringDate(date)}.xlsx`;

  res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
  res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

  const wbOut = XLSX.write(workBook, {bookType: 'xlsx', type: 'buffer'});
  res.send(new Buffer(wbOut));
});

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