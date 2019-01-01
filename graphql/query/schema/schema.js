import { nodeField } from "./node";

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType
} from "graphql";

import {
  UserField,
  UserSignInField,
  UserSignUpField,
  UserSignOutField,
  UserChangePasswordField,
  UserChangeNameField
} from "./user";

const query = new GraphQLObjectType({
  description: "Main query",
  name: "Query",
  fields: () => ({
    user: UserField,
    node: nodeField
  })
});

const mutation = new GraphQLObjectType({
  description: "Main mutations",
  name: "Mutation",
  fields: () => ({
    UserSignIn: UserSignInField,
    UserSignUp: UserSignUpField,
    UserSignOut: UserSignOutField,
    UserChangePassword: UserChangePasswordField
  })
});

export default new GraphQLSchema({
  query,
  mutation
});
