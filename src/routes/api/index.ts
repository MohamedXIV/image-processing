import express from "express";
import resizeRoutes from "./resize";

const routes = express.Router();

routes.use(resizeRoutes);

export default routes;
