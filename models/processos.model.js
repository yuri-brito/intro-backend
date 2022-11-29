import { Schema, model } from "mongoose";

const processosSchema = new Schema(
  {
    documentName: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Em andamento", "Finalizado"],
    },
    details: { type: String },
    dateInit: {
      type: Date,
    },
    comments: {
      type: [String],
    },
    dateEnd: {
      type: String,
    },
    setor: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ProcessosModel = model("Processo", processosSchema);

export default ProcessosModel;
