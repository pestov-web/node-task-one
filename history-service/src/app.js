const express = require("express");
const historyRoutes = require("./routes/historyRoutes");
const db = require("./db");
const { startConsumer } = require("./services/rabbitmqClient");
const { logger, errorLogger } = require("./middlewares/logger");
const { errors } = require("celebrate");
const errorsHandler = require("./middlewares/errorsHandler");
const helmet = require("helmet");
const limiter = require("./middlewares/rateLimitter");

const app = express();
app.use(helmet());

//rate limiter
app.use(limiter);

app.use(express.json());

app.use("/history", historyRoutes);

app.use(logger);
app.use(errorLogger);

// Проверка соединения bd при старте приложения
db.query("SELECT 1")
  .then(() => console.log("Database connection established"))
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });

// Обработка ошибок
app.use(errors()); // Celebrate
app.use(errorsHandler);

const PORT = process.env.PORT || 3011;
app.listen(PORT, async () => {
  console.log(`History service running on port ${PORT}`);
  await startConsumer().then(() => {
    console.log("RabbitMQ Consumer started.");
  });
});
