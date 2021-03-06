import { GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";
import GraphQLDate from "graphql-date";

import {
  getAnswerUserList,
  addResIdInAnsUser
} from "../database/db-answer_user";
import { getResultList, addResult, getResultById } from "../database/db-result";

import { nodeInterface } from "./node";
import { globalIdField, connectionArgs } from "graphql-relay";
import { createConnection, createMutation, createPayload } from "./utilities";

import { UserName } from "./user";

// === === === === === === QUERY ANSWER === === === === === ===

export const ResultType = new GraphQLObjectType({
  name: "Result",
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField(),
    id_result: {
      name: "Id_result",
      type: GraphQLInt
    },
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
  type: ResultType,
  resolve: async (obj, args, context, root) => {
    return await getResultById(root.id_result);
  }
};

export const ResultConnection = createConnection({
  field: ResultField,
  args: {
    ...connectionArgs
  },
  resolveIdsList: async (obj, args, context) => {
    return await getResultList();
  }
});

// === === === === === === MUTATIONS === === === === === ===

const resultMutationPayload = createPayload({
  name: "ResultMutationPayload",
  fields: () => ({
    result_user: { name: "Result", type: ResultType },
    error: { name: "Error", type: GraphQLString }
  })
});

// === === === === === === CONTING RESULT === === === === === ===

const inputResult = {
  name: "InputResult",
  fields: () => ({
    id_test: { name: "id_test", type: GraphQLInt },
    id_user: { name: "id_user", type: GraphQLInt },
    id_ticket: { name: "id_ticket", type: GraphQLInt },
    id_answer_user_min: { name: "id_answer_user_min", type: GraphQLInt },
    id_answer_user_max: { name: "id_answer_user_max", type: GraphQLInt }
  })
};

const resultResolve = async (obj, args, context) => {
  const {
    id_test,
    id_user,
    id_ticket,
    id_answer_user_min,
    id_answer_user_max
  } = args;

  const pointUser = await getAnswerUserList({
    id_answer_user_min,
    id_answer_user_max
  });

  var point = 0;
  pointUser.forEach(el => {
    if (el.correct) {
      point = point + 1;
    }
  });
  if (point !== 0) {
    var result = Math.round((point / 11) * 100);
  } else {
    var result = 0;
  }
  const id_result = await addResult({
    id_test,
    id_user,
    id_ticket,
    point,
    result
  });

  await addResIdInAnsUser({
    id_result,
    id_answer_user_min,
    id_answer_user_max
  });

  const result_user = await getResultById(id_result);
  return { result_user };
};

export const CountingResultField = createMutation({
  input: inputResult,
  payload: resultMutationPayload,
  resolve: resultResolve
});
