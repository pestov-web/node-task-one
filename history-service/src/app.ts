import express from "express";
import historyRoutes from "./routes/historyRoutes";

const app = express();
app.use(express.json());
app.use("/api/history", historyRoutes);

export default app;
