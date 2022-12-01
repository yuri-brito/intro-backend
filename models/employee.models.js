import { Schema, model } from "mongoose";

const employeeSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
      lowercase: true,
    },
    gender: {
      type: String,
      enum: ["Female", "Male"],
    },
    age: {
      type: Number,
    },
    year_of_birth: {
      type: Number,
    },
    active: {
      type: Boolean,
      default: true,
    },
    favorite_color: {
      type: String,
    },
    address: {
      city: { type: String },
      country: { type: String },
    },
    car: {
      type: String,
    },
    department: {
      type: String,
      enum: ["T.I.", "Marketing", "People", "CEO", "Estagiário"],
    },
    processos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Processo",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const EmployeeModel = model("Employee", employeeSchema);

export default EmployeeModel;
