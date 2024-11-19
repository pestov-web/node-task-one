const db = require("../db");

class ProductModel {
  static async create(plu, name) {
    const { rows } = await db.query(
      "INSERT INTO products (plu, name) VALUES ($1, $2) RETURNING *",
      [plu, name]
    );
    return rows;
  }

  static async findByFilters(filters) {
    const { name, plu, page, limit } = filters;
    const offset = (page - 1) * limit;

    const query = `
      SELECT * FROM products
      WHERE ($1::text IS NULL OR name ILIKE '%' || $1 || '%')
        AND ($2::text IS NULL OR plu = $2)
      ORDER BY name ASC
      LIMIT $3 OFFSET $4
    `;

    const countQuery = `
      SELECT COUNT(*) FROM products
      WHERE ($1::text IS NULL OR name ILIKE '%' || $1 || '%')
        AND ($2::text IS NULL OR plu = $2)
    `;

    const queryParams = [name || null, plu || null, limit, offset];

    const { rows } = await db.query(query, queryParams);
    const { rows: countRows } = await db.query(
      countQuery,
      queryParams.slice(0, 2)
    );

    return {
      data: rows,
      total: parseInt(countRows[0].count, 10),
    };
  }
}

module.exports = ProductModel;
