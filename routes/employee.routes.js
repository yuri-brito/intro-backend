import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const data = [
  {
    name: "Yuri",
    cpf: "612847623873",
    setor: "",
  },
];

router.get("/", (request, response) => {
  return response.status(200).json(data);
});

router.get("/:id", (request, response) => {
  const { id } = request.params;

  const findById = data.find((item) => item.id == id);

  return response.status(200).json(findById);
});

router.post("/create", (request, response) => {
  const newData = {
    ...request.body,
    id: uuidv4(),
  };
  data.push(newData);
  return response.status(201).json(data);
});

router.put("/edit/:id", (request, response) => {
  const { id } = request.params;
  const update = data.find((item) => item.id === id);
  const index = data.indexOf(update);
  data[index] = { ...update, ...request.body };
  return response.status(200).json(data[index]);
});

router.delete("/delete/:id", (request, response) => {
  const { id } = request.params;
  const deleteItem = data.find((item) => item.id === id);
  const index = data.indexOf(deleteItem);
  data.splice(index, 1);
  return response.status(200).json(data);
});

export default router;
