import { GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";

import {
  getAnswerById,
  getAnswerList,
  getAnswerCorrect,
  getAnswerNameById
} from "../database/db-answer";

import { nodeInterface } from "./node";
import { globalIdField, connectionArgs } from "graphql-relay";
import { createConnection } from "./utilities";

// === === === === === === QUERY ANSWER === === === === === ===

export const AnswerType = new GraphQLObjectType({
  name: "Answer",
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    id_answer: {
      name: "Id_answer",
      type: GraphQLInt
    },
    id_question: {
      name: "Id_question",
      type: GraphQLInt
    },
    name: {
      name: "Name",
      type: GraphQLString
    }
  })
});

export const AnswerField = {
  type: AnswerType,
  resolve: async (obj, args, context, root) => {
    return await getAnswerById(root.id_answer);
  }
};

export const AnswerConnection = createConnection({
  field: AnswerField,
  args: {
    ...connectionArgs
  },
  resolveIdsList: async (obj, args, context) => {
    return await getAnswerList(obj.id_question);
  }
});

export const AnswerName = {
  type: AnswerType,
  resolve: async (obj, args, context) => {
    return await getAnswerNameById(obj.id_answer);
  }
};

export const AnswerCorrect = {
  type: AnswerType,
  resolve: async (obj, args, context) => {
    return await getAnswerCorrect(obj.id_question);
  }
};
