import { nodeDefinitions, fromGlobalId } from "graphql-relay";

import { getUserById } from "../database/db-user";
import {
  getTestById,
  getTicketById,
  getQuestionsByTicketId,
  getAnswersByQuestionId
} from "../database/db-test";

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
      case "Test":
        const Test = await getTestById(id);
        if (!Test) return null;
        return { ...Test, _type: require("./test").TestType };
      case "Ticket":
        const Ticket = await getTicketById(id);
        if (!Ticket) return null;
        return { ...Ticket, _type: require("./test").TicketType };
      case "Question":
        const Question = await getQuestionsById(id);
        if (!Question) return null;
        return { ...Question, _type: require("./test").QuestionType };
      case "Answer":
        const Answer = await getAnswersById(id);
        if (!Answer) return null;
        return { ...Answer, _type: require("./test").AnswerType };
      default:
        return null;
    }
  },
  obj => obj && obj._type
);

export { nodeInterface, nodeField };
