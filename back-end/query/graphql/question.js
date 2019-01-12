import { GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";

import { getQuestionById } from "../database/db-test";

import { nodeInterface } from "./node";

import { globalIdField, connectionArgs } from "graphql-relay";

import { AnswerConnection } from "./answer";

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
    answer: AnswerConnection
  })
});

export const QuestionField = {
  type: QuestionType,
  args: { id: { type: GraphQLInt } },
  resolve: async (obj, args, context) => {
    return await getQuestionById(args.id);
  }
};
