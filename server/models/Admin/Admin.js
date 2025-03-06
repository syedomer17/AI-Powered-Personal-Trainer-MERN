import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    adminName: {
      type: String,
      required: true,
      maxlength: 20,
      minlength: 1,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "superadmin"],
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
