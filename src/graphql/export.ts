import {buildSchema, GraphQLSchema} from "graphql";

import {loadSchemaSync} from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { mergeTypeDefs } from '@graphql-tools/merge';

const queries: GraphQLSchema = loadSchemaSync('src/**/*.gql', {loaders: [new GraphQLFileLoader()]});

const resolvers = {
    hello: () => {
        return 'Hello world!';
    },
    yellow: () => {
      return 'Yellow';
    },
};

const schema = queries

export {schema, resolvers};