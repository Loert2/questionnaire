import { GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";
import GraphQLDate from "graphql-date";

import { getAnswerUserList } from "../database/db-answer_user";
import { getResultById, getResultListByIdUser } from "../database/db-result";

import { nodeInterface } from "./node";
import { globalIdField } from "graphql-relay";

import { createConnection, createMutation, createPayload } from "./utilities";
import { UserName } from "./user";

// === === === === === === QUERY ANSWER === === === === === ===

export const ResultUserType = new GraphQLObjectType({
  name: "ResultUser",
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    id_test: {
      name: "Id_test",
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
    point: {
      name: "Point",
      type: GraphQLInt
    },
    result: {
      name: "Result",
      type: GraphQLInt
    },
    date: {
      name: "Date",
      type: GraphQLDate
    },
    user: UserName
  })
});

export const ResultField = {
  type: ResultUserType,
  resolve: async (obj, args, context, root) => {
    return await getResultById(root.id_result);
  }
};

export const ResultUserConnection = createConnection({
  field: ResultField,
  args: { id: { type: GraphQLInt } },
  resolveIdsList: async (obj, args, context) => {
    return await getResultListByIdUser(obj.id_user);
  }
});
