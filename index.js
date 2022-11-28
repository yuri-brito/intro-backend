import express, { response } from "express";
import * as dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();
const app = express();
app.use(express.json());

const data = [
  {
    name: "Yuri",
    setor: "full-stack",
  },
];

app.get("/", (request, response) => {
  return response.status(200).json(data);
});

app.get("/:id", (request, response) => {
  const { id } = request.params;

  const findById = data.find((item) => item.id == id);

  return response.status(200).json(findById);
});

app.post("/create", (request, response) => {
  const newData = {
    ...request.body,
    id: uuidv4(),
  };
  data.push(newData);
  return response.status(201).json(data);
});

app.put("/edit/:id", (request, response) => {
  const { id } = request.params;
  const update = data.find((item) => item.id === id);
  const index = data.indexOf(update);
  data[index] = { ...update, ...request.body };
  return response.status(200).json(data[index]);
});

app.delete("/delete/:id", (request, response) => {
  const { id } = request.params;
  const deleteItem = data.find((item) => item.id === id);
  const index = data.indexOf(deleteItem);
  data.splice(index, 1);
  return response.status(200).json(data);
});

app.listen(Number(process.env.PORT), () => {
  console.log(`server on port ${process.env.PORT}`);
});
