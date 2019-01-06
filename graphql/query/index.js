import { Router } from "express";
import graphqlHTTP from "express-graphql";
import schema from "./graphql/schema";
import cookieSession from "cookie-session";
import uuid from "uuid";

import { getUserId, setUserId, cleanUpSessionId } from "./database/db-session";

const router = Router();

const developerMode = true;

router.use(
  cookieSession({
    name: "session",
    secret: "question-secret",
    maxAge: 24 * 60 * 60 * 1000
  })
);

router.use(async (req, res, next) => {
  let sessionId = req.session.id || uuid();
  req.session = { id: sessionId };

  req.sessionInfo = {
    userId: await getUserId(sessionId),
    setUserId: async userId => {
      if (userId) {
        await setUserId(sessionId, userId);
        req.sessionInfo.userId = userId;
      } else {
        await cleanUpSessionId(sessionId);
        req.sessionInfo.userId = null;
      }
    }
  };

  next();
});

router.use(
  graphqlHTTP(req => ({
    schema,
    graphiql: developerMode,
    context: req.sessionInfo,
    formatError: error => ({
      message: error.message,
      locations: error.locations,
      stack: error.stack ? error.stack.split("\n") : [],
      path: error.path
    })
  }))
);

export default router;
