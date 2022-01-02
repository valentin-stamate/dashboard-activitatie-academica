import {GraphQLSchema} from "graphql";
import {loadSchemaSync} from '@graphql-tools/load';
import {GraphQLFileLoader} from '@graphql-tools/graphql-file-loader';
import {QueryUnknown} from "./resolvers/unknown/query.unknown";
import {MutationUnknown} from "./resolvers/unknown/mutation.unknown";
import {UtilService} from "../service/util.service";
import {QueryAdmin} from "./resolvers/admin/query.admin";
import {MutationAdmin} from "./resolvers/admin/mutation.admin";
import {QueryUser} from "./resolvers/user/query.user";
import {MutationUser} from "./resolvers/user/mutation.user";

/* Queries allowed to unknown users. */
export const schemaUnknown: GraphQLSchema = loadSchemaSync([
    'src/app/graphql/queries/unknown/mutation.unknown.gql',
    'src/app/graphql/queries/unknown/query.unknown.gql',
    'src/app/graphql/queries/types.gql'
], {loaders: [new GraphQLFileLoader()]});
export const resolversUnknown = UtilService.mergeProperties(QueryUnknown, MutationUnknown);

/* Queries allowed to known users. */
export const schemaUser: GraphQLSchema = loadSchemaSync([
    'src/app/graphql/queries/user/mutation.user.gql',
    'src/app/graphql/queries/user/query.user.gql',
    'src/app/graphql/queries/types.gql'
], {loaders: [new GraphQLFileLoader()]});
export const resolversUser = UtilService.mergeProperties(QueryUser, MutationUser);

/* Queries allowed to admin users. */
export const schemaAdmin: GraphQLSchema = loadSchemaSync([
    'src/app/graphql/queries/admin/mutation.admin.gql',
    'src/app/graphql/queries/admin/query.admin.gql',
    'src/app/graphql/queries/types.gql'
], {loaders: [new GraphQLFileLoader()]})
export const resolversAdmin: GraphQLSchema = UtilService.mergeProperties(QueryAdmin, MutationAdmin);