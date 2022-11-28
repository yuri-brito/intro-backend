import express from "express";
import * as dotenv from "dotenv";
import employeeRouter from "./routes/employee.routes.js";
import setorRouter from "./routes/setor.routes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/employee", employeeRouter);
app.use("/setor", setorRouter);

app.listen(Number(process.env.PORT), () => {
  console.log(`server on port ${process.env.PORT}`);
});
