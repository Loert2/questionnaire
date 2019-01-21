import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean
} from "graphql";

import { getAnswerUserById, addAnswerUser } from "../database/db-answer_user";

import { getAnswerValidById } from "../database/db-test";

import { nodeInterface } from "./node";

import { globalIdField } from "graphql-relay";

import { createConnection, createMutation, createPayload } from "./utilities";

// === === === === === === QUERY ANSWER === === === === === ===

export const AnswerUserType = new GraphQLObjectType({
  name: "AnswerUser",
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    id_answer_user: {
      name: "Id_answer_user",
      type: GraphQLInt
    },
    id_user: {
      name: "Id_user",
      type: GraphQLInt
    },
    id_ticket: {
      name: "Id_ticket",
      type: GraphQLInt
    },
    id_answer: {
      name: "Id_answer",
      type: GraphQLInt
    },
    correct: {
      name: "correct",
      type: GraphQLBoolean
    }
  })
});

export const AnswerUserField = {
  type: AnswerUserType,
  resolve: async (obj, args, context, root) => {
    return await getAnswerUserById(root.id_answer_user);
  }
};

export const AnswerUserConnection = createConnection({
  field: AnswerUserField,
  resolveIdsList: async (obj, args, context) => {
    return await getAnswerUserList(args.id_user, args.id_ticket);
  }
});

// === === === === === === MUTATIONS === === === === === ===

//TO-DO не возвращает результат
const answerUserMutationPayload = createPayload({
  name: "AnswerUserMutationPayload",
  fields: () => ({
    answer_user: { name: "AnswerUser", type: AnswerUserType },
    error: { name: "Error", type: GraphQLString }
  })
});

// === === === === === === ADD ANSWER USER === === === === === ===

const answerUserInput = {
  name: "AnswerUserInput",
  fields: () => ({
    id_user: { name: "id_user", type: GraphQLInt },
    id_ticket: { name: "id_ticket", type: GraphQLInt },
    id_answer: { name: "id_answer", type: GraphQLInt }
  })
};

const answerUserResolve = async (obj, args, context) => {
  const { id_user, id_ticket, id_answer } = args;

  const correctAnswer = await getAnswerValidById(id_answer);
  const correct = correctAnswer.is_valid;

  const id_answer_user = await addAnswerUser({
    id_user,
    id_ticket,
    id_answer,
    correct
  });
  const userAnswer = await getAnswerUserById(id_answer_user);
  return { userAnswer };
};

export const AddAnswerUserField = createMutation({
  input: answerUserInput,
  payload: answerUserMutationPayload,
  resolve: answerUserResolve
});
