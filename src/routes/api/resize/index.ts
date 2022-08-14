import express from "express";
import Resizer from "../../../utilities/resizer";

const resizeRoutes = express.Router();

resizeRoutes.get('/', (req: express.Request, res: express.Response) : void => {
  res.send("<center><h4>Hello, Please go to /resize endpoint and enter imageName query string, width, and height,<br/> or only width or height for preserving the aspect ratio</h4></center>");
});

resizeRoutes.get("/resize", Resizer, (): void => {
  //res.send(`input width is ${req.query.width} and height is ${req.query.height}`);
});

export default resizeRoutes;