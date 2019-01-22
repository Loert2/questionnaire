import db from "./database";

const resultTable = () => db("result");

const dataExists = data => data && data[0];

export const getResultList = () => {
  return resultTable();
};

export const getResultById = async id => {
  const data = await resultTable().where("id_result", id);
  return dataExists(data) ? { id, ...data[0] } : null;
};

export const addResult = async ({ id_test, id_user, point, result }) => {
  const data = { id_user, id_test, point, result, date: new Date() };
  const returningData = await resultTable()
    .returning("id_result")
    .insert(data);

  return dataExists(returningData) ? returningData[0] : null;
};
