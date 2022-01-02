import express, { Express } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import config from '../config.json';
import {graphqlHTTP} from 'express-graphql';
import {
  resolversUnknown,
  resolversAdmin,
  schemaUnknown,
  schemaAdmin,
  schemaUser,
  resolversUser
} from "./app/graphql/export";
import {UserService} from "./app/service/user.service";
import {Responses} from "./app/service/service.response";
import {adminUserRequestMiddleware, unknownUserRequestMiddleware, userRequestMiddleware} from "./middlewares";

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
  app.use(cors({origin: 'http://localhost:4200'}));
}

// Handle security and origin in production
if (process.env.NODE_ENV === 'production' || config.NODE_ENV === 'production') {
  app.use(helmet());
}

/************************************************************************************
 *                               Register all routes
 ***********************************************************************************/

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

/** User activation by email */
app.get('/activate', async (req, res) => {
  const key = req.query.key as string;

  if (!key) {
    res.end(JSON.stringify({message: Responses.MISSING_KEY}));
    return;
  }

  const userService = new UserService();
  const serviceResponse = await userService.activateUser(key);

  res.end(JSON.stringify({message:serviceResponse.message}));
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