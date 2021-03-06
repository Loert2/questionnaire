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

import { TicketField } from "./ticket";
import {
  AddAnswerUserField,
  UpdateAnswerUserField,
  AnswerUserConnection,
  AnswerUserFieldById
} from "./answerUser";
import { ResultConnection, CountingResultField } from "./result";

const query = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    user: UserField,
    ticket: TicketField,
    result: ResultConnection,
    answer_user: AnswerUserConnection,
    one_answer_user: AnswerUserFieldById,
    node: nodeField
  })
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    UserSignIn: UserSignInField,
    UserSignUp: UserSignUpField,
    UserSignOut: UserSignOutField,
    UserChangePassword: UserChangePasswordField,
    AddAnswerUser: AddAnswerUserField,
    UpdateAnswerUser: UpdateAnswerUserField,
    CountingResult: CountingResultField
  })
});

export default new GraphQLSchema({
  query,
  mutation
});
