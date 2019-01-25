import { nodeDefinitions, fromGlobalId } from "graphql-relay";

import { getUserById } from "../database/db-user";
import {
  getTestById,
  getTicketById,
  getQuestionByIdTicketAndNumber,
  getAnswerById
} from "../database/db-test";
import { getAnswerUserById } from "../database/db-answer_user";
import { getResultById } from "../database/db-result";

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
        return { ...Ticket, _type: require("./ticket").TicketType };
      case "Question":
        const Question = await getQuestionByIdTicketAndNumber(id);
        if (!Question) return null;
        return { ...Question, _type: require("./question").QuestionType };
      case "Answer":
        const Answer = await getAnswerById(id);
        if (!Answer) return null;
        return { ...Answer, _type: require("./answer").AnswerType };
      case "AnswerUser":
        const AnswerUser = await getAnswerUserById(id);
        if (!AnswerUser) return null;
        return { ...AnswerUser, _type: require("./answerUser").AnswerUserType };
      case "Result":
        const Result = await getResultById(id);
        if (!Result) return null;
        return { ...Result, _type: require("./result").ResultType };
      case "QuestionCurrect":
        const QuestionCurrect = await getQuestionById(id);
        if (!QuestionCurrect) return null;
        return {
          ...QuestionCurrect,
          _type: require("./question").QuestionCurrectType
        };
      default:
        return null;
    }
  },
  obj => obj && obj._type
);

export { nodeInterface, nodeField };
