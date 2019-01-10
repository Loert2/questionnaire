import { GraphQLObjectType, GraphQLString } from "graphql";

import { nodeInterface } from "./node";

import { globalIdField } from "graphql-relay";

import { getTestById } from "../database/db-test";

import { TicketField } from "./ticket";

// === === === === === === QUERY TEST === === === === === ===

export const TestType = new GraphQLObjectType({
  name: "Test",
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

export const TestField = {
  type: TestType,
  resolve: async (obj, args, context, root) => {
    return await getTestById(args.id);
  }
};
