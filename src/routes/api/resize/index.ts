import express from "express";
import Resizer from "../../../utilities/resizer";

const resizeRoutes = express.Router();

resizeRoutes.get("/resize/:width/:height", Resizer, (req: express.Request, res: express.Response): void => {
  res.send(`input width is ${req.params.width} and height is ${req.params.height}`);
});

export default resizeRoutes;