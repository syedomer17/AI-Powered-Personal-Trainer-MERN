import express from "express";
import config from "config";
import publicRouter from "./controllers/public/index.js";
import authMiddleware from "./controllers/middlewares/auth.js";
import userRouter from "./controllers/Users/index.js";
import adminRouter from "./controllers/Admin/index.js";
import "./utils/dbConnect.js";
import rateLimit from "express-rate-limit"; // ✅ Rate Limiting Middleware Import
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";


const app = express();
const PORT = config.get("PORT") || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, "dist")));

app.use(
  cors({
    origin: ["http://localhost:5173", "https://workout.syedomer.xyz"],
  })
); // Apne frontend ka port dalna

app.use(express.json());

// ✅ **Global Rate Limit** (Sabhi Routes Pe Apply Hoga)
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Ek IP se max 100 requests allow hongi
  message: "Too many requests, please try again later.",
  headers: true,
});
app.use(globalLimiter);


app.use("/api/public", publicRouter);

// ✅ **Private Routes Pe Middleware**
// app.use(authMiddleware);

app.use("/api/private/user", userRouter);

app.use("/api/private/admin", adminRouter);

// ✅ Home Route
app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "Server is up and Running" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

// ✅ Not Found Route
app.use((req, res) => {
  res.status(404).json({ message: "Not Found Router" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// ✅ Server Listen
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
