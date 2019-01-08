import db from "./database";

const table = () => db("session");
const raw = sessionId => table().where("uuid", "=", sessionId);

const dataExists = data => data && data[0];

const resolveSessionId = async sessionId => {
  const data = await raw(sessionId).select("id_user");
  return dataExists(data) ? data[0].id_user : null;
};

const getUserId = async sessionId => {
  const userId = await resolveSessionId(sessionId);
  if (userId) {
    await raw(sessionId).update({ updated_at: new Date() });
  }
  return userId;
};

const setUserId = async (sessionId, userId) => {
  const oldUserId = await resolveSessionId(sessionId);
  const newData = { id_user: userId, updated_at: new Date() };

  const data = { id_user: userId, updated_at: new Date() };
  if (oldUserId) {
    await raw(sessionId).update(data);
  } else {
    await table().insert({ uuid: sessionId, ...data });
  }
};

const cleanUpSessionId = async sessionId => {
  await raw(sessionId).delete();
};

export { getUserId, setUserId, cleanUpSessionId };
