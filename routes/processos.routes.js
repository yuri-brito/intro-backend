import express from "express";
import { v4 as uuidv4 } from "uuid";
import ProcessosModel from "../models/processos.model.js";
import EmployeeModel from "../models/employee.models.js";
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const data = await ProcessosModel.find().populate("responsable");
    return response.status(200).json(data);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Algo de errado não está certo!" });
  }
});
// router.get("/random", (request, response) => {
//   const index = Math.floor(Math.random() * data.length);
//   return response.status(200).json(data[index]);
// });
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const processo = await ProcessosModel.findById(id).populate("responsable");
    if (!processo) {
      return response.status(404).json("Usuário não foi encontrado!");
    }
    return response.status(200).json(processo);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Algo de errado não está certo!" });
  }
});

// router.get("/setor/:nomeSetor", (request, response) => {
//   const { nomeSetor } = request.params;

//   const filtered = data.filter((item) => item.setor === nomeSetor);

//   return response.status(200).json(filtered);
// });
// router.get("/status/open", (request, response) => {
//   const filtered = data.filter((item) => item.status === "Em andamento");

//   return response.status(200).json(filtered);
// });

// router.get("/status/close", (request, response) => {
//   const filtered = data.filter((item) => item.status === "Finalizado");

//   return response.status(200).json(filtered);
// });

router.post("/create/:employeeId", async (request, response) => {
  try {
    const { employeeId } = request.params;
    const newProcesso = await ProcessosModel.create({
      ...request.body,
      responsable: employeeId,
    });
    await EmployeeModel.findByIdAndUpdate(
      employeeId,
      {
        $push: { processos: newProcesso._id },
      },
      { new: true, runValidators: true }
    );

    return response.status(201).json(newProcesso);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Algo de errado não está certo!" });
  }
});

router.put("/edit/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const update = await ProcessosModel.findByIdAndUpdate(
      id,
      { ...request.body },
      { new: true, runValidators: true }
    );
    return response.status(200).json(update);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Algo de errado não está certo!" });
  }
});

// router.put("/addComment/:id", (request, response) => {
//   const { id } = request.params;
//   const update = data.find((item) => item.id === id);
//   const index = data.indexOf(update);
//   data[index].comments.push(request.body.comments);
//   return response.status(200).json(data[index]);
// });

router.delete("/delete/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const deleteProcesso = await ProcessosModel.findByIdAndDelete(id);
    await EmployeeModel.findByIdAndUpdate(
      deleteProcesso.responsable,
      {
        $pull: { processos: deleteProcesso._id },
      },
      { new: true, runValidators: true }
    );
    return response.status(200).json(deleteProcesso);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Algo de errado não está certo!" });
  }
});

export default router;
