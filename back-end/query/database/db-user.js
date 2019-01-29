import db from "./database";

const table = () => db("system_user");
const rawByField = (fieldName, value) => table().where(fieldName, "=", value);

const dataExists = data => data && data[0];

export const getUserById = async id_user => {
  const fields = ["e_mail", "full_name", "password", "role"];
  const data = await rawByField("id_user", id_user).select(...fields);
  return dataExists(data) ? { id_user, ...data[0] } : null;
};

export const getUserResById = async id_user => {
  const data = await rawByField("id_user", id_user);
  return dataExists(data) ? { ...data[0] } : null;
};

export const getUserByE_mail = async e_mail => {
  const fields = ["id_user", "full_name", "password"];
  const data = await rawByField("e_mail", e_mail).select(...fields);
  return dataExists(data) ? { e_mail, ...data[0] } : null;
};

export const changePassword = async ({ id_user, password }) => {
  await rawByField("id_user", id_user).update({
    password
  });
};

export const addUser = async ({ e_mail, full_name, password, role }) => {
  const data = { e_mail, full_name, password, role };
  const returningData = await table()
    .returning("id_user")
    .insert(data);

  return dataExists(returningData) ? returningData[0] : null;
};
