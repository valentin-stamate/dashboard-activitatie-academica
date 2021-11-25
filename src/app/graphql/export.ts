import {GraphQLSchema} from "graphql";
import {loadSchemaSync} from '@graphql-tools/load';
import {GraphQLFileLoader} from '@graphql-tools/graphql-file-loader';
import {queries} from "./resolvers/queries";
import {mutations} from "./resolvers/mutations";
import {mergeProperties} from "../script/util/util";

const schema: GraphQLSchema = loadSchemaSync('src/**/*.gql', {loaders: [new GraphQLFileLoader()]});

const resolvers = mergeProperties(queries, mutations);

export {schema, resolvers};