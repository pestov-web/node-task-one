const express = require("express");
import historyRoutes from "./routes/historyRoutes";
import { connectRabbitMQ } from "./rabbitmqClient";

const app = express();
app.use(express.json());
app.use("/history", historyRoutes);

connectRabbitMQ();

export default app;
