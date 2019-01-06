import db from "./database";

const testTable = () => db("test");
const ticketTable = () => db("ticket");
const questionTable = () => db("question");
const answerTable = () => db("answer");

const dataExists = data => data && data[0];

export const getTestById = async ({ id_test }) => {
  return await testTable()
    .where("id_test", "=", id_test)
    .select("*");
};
export const getTicketById = async ({ id_ticket }) => {
  return await ticketTable()
    .where("id_ticket", "=", id_ticket)
    .select("*");
};
export const getQuestionsById = async ({ id_question }) => {
  return questionTable()
    .where("id_question", "=", id_question)
    .select("*");
};
export const getAnswersById = async ({ id_answer }) => {
  return await answerTable()
    .where("id_answer", "=", id_answer)
    .select("*");
};
