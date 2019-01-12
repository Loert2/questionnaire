import db from "./database";

const answerTable = () => db("answer");
const questionTable = () => db("question");
const ticketTable = () => db("ticket");
const testTable = () => db("test");

const dataExists = data => data && data[0];

export const getAnswerList = async id => {
  return await answerTable().where("id_question", id);
};

export const getAnswerById = async id => {
  const data = await answerTable().where("id_answer", id);
  return dataExists(data) ? { id, ...data[0] } : null;
};
export const getQuestionById = async id => {
  const data = await questionTable().where("id_question", 2);
  return dataExists(data) ? { id, ...data[0] } : null;
};
export const getTicketById = async id => {
  const data = await ticketTable().where("id_ticket", 2);
  return dataExists(data) ? { id, ...data[0] } : null;
};
export const getTestById = async id => {
  const data = await testTable().where("id_test", 1);
  return dataExists(data) ? { id, ...data[0] } : null;
};
