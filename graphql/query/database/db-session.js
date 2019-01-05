import db from "./database";

const table = () => db("sessions");
const raw = sessionId => table().where("session_id", "=", sessionId);

const dataExists = data => data && data[0];

const resolveSessionId = async sessionId => {
  const data = await raw(sessionId).select("user_id");
  return dataExists(data) ? data[0].user_id : null;
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
  const newData = { user_id: userId, updated_at: new Date() };

  const data = { user_id: userId, updated_at: new Date() };
  if (oldUserId) {
    await raw(sessionId).update(data);
  } else {
    await table().insert({ session_id: sessionId, ...data });
  }
};

const cleanUpSessionId = async sessionId => {
  await raw(sessionId).delete();
};

export { getUserId, setUserId, cleanUpSessionId };
