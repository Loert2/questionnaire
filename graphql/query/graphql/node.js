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
    const {
      type,
      id_user,
      id_test,
      id_ticket,
      id_question,
      id_answer
    } = fromGlobalId(globalId);

    switch (type) {
      case "User":
        if (id_user !== userId) return null;
        return {
          ...(await getUserById(id_user)),
          _type: require("./user").UserType
        };
      case "Test":
        const Test = await getTestById(id_test);
        if (!Test) return null;
        return { ...Test, _type: require("./test").TestType };
      case "Ticket":
        const Ticket = await getTicketById(id_ticket);
        if (!Ticket) return null;
        return { ...Ticket, _type: require("./test").TicketType };
      case "Question":
        const Question = await getQuestionsById(id_question);
        if (!Question) return null;
        return { ...Question, _type: require("./test").QuestionType };
      case "Answer":
        const Answer = await getAnswersById(id_answer);
        if (!Answer) return null;
        return { ...Answer, _type: require("./test").AnswerType };
      default:
        return null;
    }
  },
  obj => obj && obj._type
);

export { nodeInterface, nodeField };
