import express from "express";
import * as dotenv from "dotenv";
import employeeRouter from "./routes/employee.routes.js";
import setorRouter from "./routes/setor.routes.js";
import processosRouter from "./routes/processos.routes.js";

dotenv.config();
const app = express();
app.use(express.json());
// app.use("/employee", employeeRouter);
app.use("/process", processosRouter);

app.listen(Number(process.env.PORT), () => {
  console.log(`server up and running on port ${process.env.PORT}`);
});
