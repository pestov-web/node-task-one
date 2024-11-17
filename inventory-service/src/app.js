const express = require("express");
const productRoutes = require("./routes/products.js");
const stockRoutes = require("./routes/stocks.js");
const db = require("./db");

const { logger, errorLogger } = require("./middlewares/logger");

const app = express();
app.use(express.json());

app.use("/products", productRoutes);
app.use("/stocks", stockRoutes);

app.use(logger);
app.use(errorLogger);

// Проверка соединения bd при старте приложения
db.query("SELECT 1")
  .then(() => console.log("Database connection established"))
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Inventory service running on port ${PORT}`);
});
