import { GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";

import { getAnswerUserList } from "../database/db-answer_user";
import { getResultList, addResult, getResultById } from "../database/db-result";

import { nodeInterface } from "./node";

import { globalIdField } from "graphql-relay";

import { createConnection, createMutation, createPayload } from "./utilities";

// === === === === === === QUERY ANSWER === === === === === ===

export const ResultType = new GraphQLObjectType({
  name: "Result",
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
    point: {
      name: "Point",
      type: GraphQLInt
    },
    result: {
      name: "Result",
      type: GraphQLInt
    }
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
  resolveIdsList: async (obj, args, context) => {
    return await getResultList();
  }
});

// === === === === === === MUTATIONS === === === === === ===

const resultMutationPayload = createPayload({
  name: "ResultMutationPayload",
  fields: () => ({
    result: { name: "Result", type: ResultType },
    error: { name: "Error", type: GraphQLString }
  })
});

// === === === === === === CONTING RESULT === === === === === ===

const inputResult = {
  name: "InputResult",
  fields: () => ({
    id_test: { name: "id_test", type: GraphQLInt },
    id_user: { name: "id_user", type: GraphQLInt },
    id_ticket: { name: "id_ticket", type: GraphQLInt }
  })
};

const resultResolve = async (obj, args, context) => {
  const { id_test, id_user, id_ticket } = args;

  const pointUser = await getAnswerUserList({ id_user, id_ticket });
  var point = 0;
  pointUser.forEach(el => {
    if (el.correct) {
      point = point + 1;
    }
  });
  const result = Math.round((point / 11) * 100);
  const id_result = await addResult({
    id_test,
    id_user,
    point,
    result
  });
  const resultVal = await getResultById(id_result);
  return { resultVal };
};

export const CountingResultField = createMutation({
  input: inputResult,
  payload: resultMutationPayload,
  resolve: resultResolve
});
