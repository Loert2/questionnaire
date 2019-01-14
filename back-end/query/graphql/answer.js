import { GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";

import { getAnswerById, getAnswerList } from "../database/db-test";

import { nodeInterface } from "./node";

import { globalIdField } from "graphql-relay";

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
  resolveIdsList: async (obj, args, context) => {
    return await getAnswerList(obj.id_question);
  }
});
