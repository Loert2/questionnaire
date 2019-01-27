import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean
} from "graphql";

import {
  getAnswerUserById,
  addAnswerUser,
  getAnswerUserList
} from "../database/db-answer_user";
import { getAnswerValidById } from "../database/db-answer";

import { nodeInterface } from "./node";
import { createConnection, createMutation, createPayload } from "./utilities";
import { globalIdField, connectionArgs } from "graphql-relay";

import { AnswerName, AnswerCorrect } from "./answer";

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
    id_question: {
      name: "Id_question",
      type: GraphQLInt
    },
    id_answer: {
      name: "Id_answer",
      type: GraphQLInt
    },
    answer_name: AnswerName,
    correct: {
      name: "Correct",
      type: GraphQLBoolean
    },
    answer_correct: AnswerCorrect
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
  args: {
    ...connectionArgs,
    id_user: { type: GraphQLInt },
    id_ticket: { type: GraphQLInt }
  },

  resolveIdsList: async (obj, args, context) => {
    const { id_user, id_ticket } = args;
    return await getAnswerUserList({ id_user, id_ticket });
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
    id_question: { name: "id_question", type: GraphQLInt },
    id_answer: { name: "id_answer", type: GraphQLInt }
  })
};

const answerUserResolve = async (obj, args, context) => {
  const { id_user, id_ticket, id_question, id_answer } = args;

  const correctAnswer = await getAnswerValidById(id_answer);
  const correct = correctAnswer.is_valid;

  const id_answer_user = await addAnswerUser({
    id_user,
    id_ticket,
    id_question,
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
