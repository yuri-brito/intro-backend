import express from "express";
import EmployeeModel from "../models/employee.models";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const data = await EmployeeModel.find();
    return response.status(200).json(data);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Algo de errado não está certo!" });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const employee = await EmployeeModel.findById(id);
    if (!employee) {
      return response.status(404).json("Usuário não foi encontrado!");
    }
    return response.status(200).json(employee);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Algo de errado não está certo!" });
  }
});

router.post("/create", async (request, response) => {
  try {
    const newEmployee = await EmployeeModel.create(request.body);

    return response.status(201).json(newEmployee);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Algo de errado não está certo!" });
  }
});

router.put("/edit/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const update = await EmployeeModel.findByIdAndUpdate(
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

router.delete("/delete/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const deleteEmployee = await EmployeeModel.findByIdAndDelete(id);
    return response.status(200).json(deleteEmployee);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Algo de errado não está certo!" });
  }
});

export default router;
