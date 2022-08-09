import express from "express";
import routes from "./routes/api";

const app = express();
const port = 3000;

app.use("/api", routes);

app.listen(port, () => {
  console.log(`server is listening on http://localhost:${port}/api`);
});

export default app;
