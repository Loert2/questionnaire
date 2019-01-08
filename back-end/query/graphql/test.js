import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType
} from "graphql";

import {
  getTestById,
  getTicketById,
  getQuestionsByTicketId,
  getAnswersByQuestionId
} from "../database/db-test";

import { nodeInterface } from "./node";

import { createMutation, createPayload } from "./utilities";

import { fromGlobalId, toGlobalId, globalIdField } from "graphql-relay";

// === === === === === === QUERY TEST === === === === === ===

export const TestType = new GraphQLObjectType({
  name: "Test",
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    name: {
      name: "Name",
      type: GraphQLString
    }
  })
});

export const TestField = {
  type: TestType,
  resolve: async (obj, args, context) => {
    return await getTestById(id_test);
  }
};

// === === === === === === QUERY TICKET === === === === === ===

export const TicketType = new GraphQLObjectType({
  name: "Ticket",
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    number_of_questions: {
      name: "Number_of_questions",
      type: GraphQLInt
    },
    test: TestField
  })
});

export const TicketField = {
  type: TicketType,
  resolve: async (obj, args, context) => {
    return await getTicketById(id_ticket);
  }
};

// === === === === === === QUERY QUESTION === === === === === ===

export const QuestionType = new GraphQLObjectType({
  name: "Question",
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    name: {
      name: "Name",
      type: GraphQLString
    },
    ticket: TicketField
  })
});

export const QuestionField = {
  type: QuestionType,
  resolve: async (obj, args, context) => {
    return await getQuestionsById(id_question);
  }
};

// === === === === === === QUERY ANSWER === === === === === ===

export const AnswerType = new GraphQLObjectType({
  name: "Answer",
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    name: {
      name: "Name",
      type: GraphQLString
    },
    question: QuestionField
  })
});

export const AnswerField = {
  type: AnswerType,
  resolve: async (obj, args, context) => {
    return await getAnswersById(id_answer);
  }
};
