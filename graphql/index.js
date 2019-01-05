import express from "express";
import cors from "cors";

import resolveQuery from "./query";

express()
  .use(cors({ origin: true, credentials: true }))
  .use(resolveQuery)
  .listen(4000, () => console.log("Server has started"));
