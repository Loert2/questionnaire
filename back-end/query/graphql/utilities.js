import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt
} from "graphql";

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId
} from "graphql-relay";

const ClientMutationIdField = { name: "ClientMutationId", type: GraphQLString };

const nonNull = type => new GraphQLNonNull(type);

export const createPayload = config =>
  new GraphQLObjectType({
    ...config,
    fields: () => {
      const answer = config.fields();
      return { clientMutationId: ClientMutationIdField, ...answer };
    }
  });

const createArgs = input => {
  const fields = input.fields();
  for (let key in fields) {
    let value = fields[key];
    fields[key] = { ...value, type: nonNull(value.type) };
  }

  const InputType = new GraphQLInputObjectType({
    name: input.name,
    fields: () => ({ clientMutationId: ClientMutationIdField, ...fields })
  });

  return { input: { type: nonNull(InputType) } };
};

export const createMutation = config => ({
  type: config.payload,
  args: createArgs(config.input),
  resolve: async (obj, args, context) => {
    const answer = await config.resolve(obj, args.input, context);
    return { clientMutationId: args.input.clientMutationId, ...answer };
  }
});

//TO-DO ошибка
const generateConnectionType = nodeType => {
  const { connectionType } = connectionDefinitions({ nodeType });
  const getConnectionFields = connectionType._typeConfig.fields;
  connectionType._typeConfig.fields = () => ({
    ...getConnectionFields(),
    total: { type: nonNull(GraphQLInt), description: "Total amount of nodes" }
  });
  return connectionType;
};

export const createConnection = config => ({
  type: generateConnectionType(config.field.type),
  args: connectionArgs,
  resolve: async (object, args, context) => {
    const ids = await config.resolveIdsList(object, args, context);
    const answers = ids.map(item =>
      config.field.resolve(object, args, context, item)
    );

    return { ...connectionFromArray(answers, args), total: answers.length };
  }
});

export const getIdFromGlobalId = (globalId, expectedType) => {
  const { id, type } = fromGlobalId(globalId);
  if (!/^\d+$/.test(id)) return null;
  return expectedType == type ? id : null;
};
