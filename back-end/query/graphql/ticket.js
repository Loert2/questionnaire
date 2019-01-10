import { GraphQLObjectType, GraphQLInt } from "graphql";

import { getTicketById } from "../database/db-test";

import { nodeInterface } from "./node";

import { globalIdField } from "graphql-relay";

import { QuestionField } from "./question";

// === === === === === === QUERY TICKET === === === === === ===

export const TicketType = new GraphQLObjectType({
  name: "Ticket",
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    number_of_question: {
      name: "Number_of_question",
      type: GraphQLInt
    },
    question: QuestionField
  })
});

export const TicketField = {
  type: TicketType,
  resolve: async (obj, args, context, root) => {
    return await getTicketById(root.id);
    console.log(obj.id, args.id, context.id, root.id);
  }
};
