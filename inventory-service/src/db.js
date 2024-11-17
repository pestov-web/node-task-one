const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST || "postgres", // Используем имя контейнера Docker
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "user",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "shop_db",
});

// Функция для выполнения запросов
const query = (text, params) => pool.query(text, params);

module.exports = {
  query,
};
