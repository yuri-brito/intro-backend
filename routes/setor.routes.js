import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const data = [
  {
    nome: "backend",
    funcionarios: [],
    chefe: "",
    substituto: "",
  },
];

router.get("/", (request, response) => {
  return response.status(200).json(data);
});
router.get("/random", (request, response) => {
  const index = Math.floor(Math.random() * data.length);

  return response.status(200).json(data[index]);
});

router.get("/:id", (request, response) => {
  const { id } = request.params;

  const findById = data.find((item) => item.id == id);

  return response.status(200).json(findById);
});
router.get("/quantity/:nome", (request, response) => {
  const { nome } = request.params;

  const findById = data.find((item) => item.nome === nome);

  return response.status(200).json(findById.quantity);
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
