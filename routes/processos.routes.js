import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const data = [
  {
    id: "e27ab2b1-cb91-4b18-ab90-5895cc9abd29",
    documentName: "Licitação Enap - Curso Web Dev",
    status: "Em andamento",
    details:
      "Processo para capacitação de servidores públicos em desenvolvimento de aplicações na WEB. Parceria com Ironhack",
    dateInit: "28/11/2022",
    comments: [
      "Processo aberto",
      "Processo partiu para as partes assinarem",
      "Processo agora está em análise final",
      "Processo já tem data final",
    ],
    dateEnd: "16/12/2022",
    setor: "enap",
  },
  {
    id: "ee5999d7-02e9-4b3d-a1ab-f067eef54173",
    documentName: "Licitação Compras - Notebooks",
    status: "Em andamento",
    details: "Processo de licitação para compra de notebooks",
    dateInit: "30/11/2022",
    comments: ["Processo em aberto e sem previsão de conclusão"],
    dateEnd: "",
    setor: "tre",
  },
  ,
  {
    id: "ee5999d7-02e9-4b3d-a1ab-f067eef54173",
    documentName: "Licitação Compras - Ar Condicionado",
    status: "Finalizado",
    details: "Processo de licitação para compra de ar-condicionado",
    dateInit: "15/11/2022",
    comments: ["Processo em aberto", "Processo finalizado"],
    dateEnd: "25/11/2022",
    setor: "trj",
  },
];

router.get("/all", (request, response) => {
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

router.get("/setor/:nomeSetor", (request, response) => {
  const { nomeSetor } = request.params;

  const filtered = data.filter((item) => item.setor === nomeSetor);

  return response.status(200).json(filtered);
});
router.get("/status/open", (request, response) => {
  const filtered = data.filter((item) => item.status === "Em andamento");

  return response.status(200).json(filtered);
});

router.get("/status/close", (request, response) => {
  const filtered = data.filter((item) => item.status === "Finalizado");

  return response.status(200).json(filtered);
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

router.put("/addComment/:id", (request, response) => {
  const { id } = request.params;
  const update = data.find((item) => item.id === id);
  const index = data.indexOf(update);
  data[index].comments.push(request.body.comments);
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
