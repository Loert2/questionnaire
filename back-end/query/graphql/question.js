import { GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";

import {
  getQuestionByIdTicketAndNumber,
  getQuestionById
} from "../database/db-test";

import { nodeInterface } from "./node";

import { globalIdField, connectionArgs } from "graphql-relay";

import { AnswerConnection } from "./answer";

// === === === === === === QUERY QUESTION === === === === === ===

export const QuestionType = new GraphQLObjectType({
  name: "Question",
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    id_question: {
      name: "Id_question",
      type: GraphQLInt
    },
    name: {
      name: "Name",
      type: GraphQLString
    },
    answer: AnswerConnection
  })
});

export const QuestionField = {
  type: QuestionType,
  args: { id: { type: GraphQLInt }, number: { type: GraphQLInt } },
  resolve: async (obj, args, context) => {
    const { id, number } = args;
    return await getQuestionByIdTicketAndNumber({ id, number });
  }
};

// === === === === === === QUERY QUESTION === === === === === ===

export const QuestionCurrectType = new GraphQLObjectType({
  name: "QuestionCurrect",
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    name: {
      name: "Name",
      type: GraphQLString
    },
    answer: AnswerСurrectField
  })
});

export const QuestionFieldRoot = {
  type: QuestionCurrectType,
  args: { id: { type: GraphQLInt } },
  resolve: async (obj, args, context) => {
    const { id } = args;
    return await getQuestionById(id);
  }
};
