const express = require("express");
const productRoutes = require("./routes/products.js");
const stockRoutes = require("./routes/stocks.js");
const db = require("./db");
const { logger, errorLogger } = require("./middlewares/logger");
const { errors } = require("celebrate");
const errorsHandler = require("./middlewares/errorsHandler.js");
const cors = require("cors");
const helmet = require("helmet");
const limiter = require("./middlewares/rateLimitter");
const { connectRabbitMQ } = require("./rabbitmqClient");

const app = express();

// app.use(
//   cors({
//     origin: LEGAL_CORS,
//     credentials: true,
//   })
// );

app.use(helmet());

//rate limiter
app.use(limiter);

app.use(express.json());

app.use("/products", productRoutes);
app.use("/stocks", stockRoutes);

connectRabbitMQ();

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

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Inventory service running on port ${PORT}`);
});
