import db from "./database";

const answerTable = () => db("answer");

const dataExists = data => data && data[0];

export const getAnswerList = async id => {
  return await answerTable().where("id_question", id);
};
export const getAnswerById = async id => {
  const data = await answerTable().where("id_answer", id);
  return dataExists(data) ? { id, ...data[0] } : null;
};

export const getAnswerValidById = async id => {
  const data = await answerTable()
    .where("id_answer", id)
    .select("is_valid");
  return dataExists(data) ? { ...data[0] } : null;
};

export const getAnswerCurrect = () => {
  const data = answerTable().where({
    is_valid: true
  });
  return dataExists(data) ? { ...data[0] } : null;
};
