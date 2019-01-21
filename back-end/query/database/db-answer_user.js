import db from "./database";

const answerUserTable = () => db("answer_user");

const dataExists = data => data && data[0];

export const getAnswerUserList = async ({ id_ticket, id_user }) => {
  return await answerUserTable()
    .where({
      id_ticket: id_ticket,
      id_user: id_user
    })
    .select("correct");
};

export const getAnswerUserById = async id => {
  const data = await answerUserTable().where("id_answer_user", id);
  return dataExists(data) ? { id, ...data[0] } : null;
};

export const changeAnswerUser = async ({ id_answer_user, correct }) => {
  await answerUserTable()
    .where("id_answer_user", id_answer_user)
    .update({
      correct
    });
};

export const addAnswerUser = async ({
  id_user,
  id_ticket,
  id_answer,
  correct
}) => {
  const data = { id_user, id_ticket, id_answer, correct };
  const returningData = await answerUserTable()
    .returning("id_answer_user")
    .insert(data);

  return dataExists(returningData) ? returningData[0] : null;
};
