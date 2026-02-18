import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middlewares/errorMiddleware.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
// Error Handling Middleware
app.use(errorHandler);



app.get("/", (req, res) => {
  res.send("API Running...");
});

export default app;