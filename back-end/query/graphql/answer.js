import { GraphQLObjectType, GraphQLString } from "graphql";

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
    name: {
      name: "Name",
      type: GraphQLString
    }
  })
});

export const AnswerField = {
  type: AnswerType,
  resolve: async (obj, args, context, root) => {
    const data = await getAnswerById(root.id_answer);
    console.log(data);
    return data;
  }
};

export const AnswerConnection = createConnection({
  field: AnswerField,
  resolveIdsList: async (obj, args, context) => {
    console.log(obj.id_question);
    return await getAnswerList(obj.id_question);
  }
});