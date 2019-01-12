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
  UserChangePasswordField
} from "./user";

import { TestField } from "./test";
import { TicketField } from "./ticket";
import { QuestionField } from "./question";

const query = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    user: UserField,
    test: TestField,
    ticket: TicketField,
    question: QuestionField,
    node: nodeField
  })
});

const mutation = new GraphQLObjectType({
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
