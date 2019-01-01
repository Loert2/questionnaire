import { nodeDefinitions, fromGlobalId } from "graphql-relay";

import { getUserById } from "../database/db-user";

const { nodeInterface, nodeField } = nodeDefinitions(
  async (globalId, context) => {
    const userId = await context.userId;
    const { type, id } = fromGlobalId(globalId);

    switch (type) {
      case "User":
        if (id !== userId) return null;
        return {
          ...(await getUserById(id)),
          _type: require("./user").UserType
        };
      default:
        return null;
    }
  },
  obj => obj && obj._type
);

export { nodeInterface, nodeField };
