const db = require("../db");

class ProductModel {
  static async create(plu, name) {
    return db.query(
      "INSERT INTO products (plu, name) VALUES ($1, $2) RETURNING *",
      [plu, name]
    );
  }

  static async findByFilters(name, plu) {
    return db.query(
      `SELECT * FROM products
       WHERE ($1::text IS NULL OR name ILIKE '%' || $1 || '%')
         AND ($2::text IS NULL OR plu = $2)`,
      [name || null, plu || null]
    );
  }
}

module.exports = ProductModel;
