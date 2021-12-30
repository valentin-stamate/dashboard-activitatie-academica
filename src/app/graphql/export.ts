import {GraphQLSchema} from "graphql";
import {loadSchemaSync} from '@graphql-tools/load';
import {GraphQLFileLoader} from '@graphql-tools/graphql-file-loader';
import {Query} from "./resolvers/query";
import {Mutation} from "./resolvers/mutation";
import {UtilService} from "../service/util.service";

const schema: GraphQLSchema = loadSchemaSync('src/**/*.gql', {loaders: [new GraphQLFileLoader()]});

const resolvers = UtilService.mergeProperties(Query, Mutation);

export {schema, resolvers};