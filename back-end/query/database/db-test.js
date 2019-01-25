import db from "./database";

const questionTable = () => db("question");
const ticketTable = () => db("ticket");
const testTable = () => db("test");

const dataExists = data => data && data[0];

export const getQuestionByIdTicketAndNumber = async ({ id, number }) => {
  const data = await questionTable().where({
    id_ticket: id,
    number_question: number
  });
  return dataExists(data) ? { id, ...data[0] } : null;
};

//Для логики анализа ответов
export const getQuestionById = async id => {
  const data = await questionTable().where({
    id_question: id
  });
  return dataExists(data) ? { id, ...data[0] } : null;
};

export const getTicketById = async id => {
  const data = await ticketTable().where("id_ticket", id);
  return dataExists(data) ? { id, ...data[0] } : null;
};
export const getTestById = async id => {
  const data = await testTable().where("id_test", id);
  return dataExists(data) ? { id, ...data[0] } : null;
};
