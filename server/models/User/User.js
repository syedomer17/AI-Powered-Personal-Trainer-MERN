import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      maxlength: 20,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      maxAge:70,
      minAge:10,
      required:true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength:30,
      minlength:10
    },
    fitnessGoal: {
      type: String,
      enum: ["weightLoss", "muscleGain", "endurance", "flexibility"],
    },
    fitnessLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced", "expert"],
    },
    subscriptionStatus: {
      type: String,
      enum: ["free", "basic", "premium"],
      default: "free",
    },
    userVerified: {
      email: {
        type: Boolean,
        default: false,
      },
    },
    userVerifiedToken: {
      email: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("Users", userSchema, "users");

export default userModel;
