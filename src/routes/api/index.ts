import express from "express";

const routes = express.Router();

routes.get("/", (req: express.Request, res: express.Response): void => {
  res.send("main api route works as expected");
});

export default routes;
