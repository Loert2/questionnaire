import db from "./database";

const table = () => db("user");
const rawByField = (fieldName, value) => table().where(fieldName, "=", value);

const dataExists = data => data && data[0];

export const getUserById = async id_user => {
  const fields = ["e_mail", "full_name", "password", "role"];
  const data = await rawByField("id_user", id_user).select(...fields);
  return dataExists(data) ? { id_user, ...data[0] } : null;
};

export const getUserByE_mail = async login => {
  const fields = ["id", "full_name", "password"];
  const data = await rawByField("e_mail", e_mail).select(...fields);
  return dataExists(data) ? { e_mail, ...data[0] } : null;
};

export const changePassword = async ({ id, password }) => {
  await rawByField("id", id).update({ password, updated_at: new Date() });
};

export const addUser = async ({ e_mail, full_name, password, role }) => {
  const timestamp = { created_at: new Date(), updated_at: new Date() };
  const data = { e_mail, full_name, password, role, ...timestamp };

  const returningData = await table()
    .returning("id")
    .insert(data);

  return dataExists(returningData) ? returningData[0] : null;
};
