const db = require("../db");

class StockModel {
  static async create(plu, shopId, shelfQuantity = 0, orderQuantity = 0) {
    const { rows } = await db.query(
      `INSERT INTO stocks (plu, shop_id, shelf_quantity, order_quantity)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [plu, shopId, shelfQuantity, orderQuantity]
    );
    return rows;
  }

  static async updateStock(
    plu,
    shopId,
    shelfQuantity,
    orderQuantity,
    operation
  ) {
    const operator = operation === "increase" ? "+" : "-";

    const { rows } = await db.query(
      `UPDATE
         stocks
       SET 
         shelf_quantity = GREATEST(shelf_quantity ${operator} $3, 0), 
         order_quantity = GREATEST(order_quantity ${operator} $4, 0)
       WHERE plu = $1 AND shop_id = $2
       RETURNING *;`,
      [plu, shopId, shelfQuantity, orderQuantity]
    );

    return rows;
  }

  static async increase(plu, shopId, shelfQuantity, orderQuantity) {
    return await this.updateStock(
      plu,
      shopId,
      shelfQuantity,
      orderQuantity,
      "increase"
    );
  }

  static async decrease(plu, shopId, shelfQuantity, orderQuantity) {
    return await this.updateStock(
      plu,
      shopId,
      shelfQuantity,
      orderQuantity,
      "decrease"
    );
  }

  static async findByFilters(filters) {
    const { plu, shopId, minShelf, maxShelf, minOrder, maxOrder, page, limit } =
      filters;
    const offset = (page - 1) * limit;

    const query = `
      SELECT s.*, p.plu, p.name
      FROM stocks s
      JOIN products p ON s.plu = p.plu 
      WHERE ($1::text IS NULL OR p.plu = $1)
        AND ($2::int IS NULL OR s.shop_id = $2)
        AND ($3::int IS NULL OR s.shelf_quantity >= $3)
        AND ($4::int IS NULL OR s.shelf_quantity <= $4)
        AND ($5::int IS NULL OR s.order_quantity >= $5)
        AND ($6::int IS NULL OR s.order_quantity <= $6)
      ORDER BY p.name ASC, s.shop_id ASC
      LIMIT $7 OFFSET $8
    `;

    const countQuery = `
      SELECT COUNT(*)
      FROM stocks s
      JOIN products p ON s.plu = p.plu 
      WHERE ($1::text IS NULL OR p.plu = $1)
        AND ($2::int IS NULL OR s.shop_id = $2)
        AND ($3::int IS NULL OR s.shelf_quantity >= $3)
        AND ($4::int IS NULL OR s.shelf_quantity <= $4)
        AND ($5::int IS NULL OR s.order_quantity >= $5)
        AND ($6::int IS NULL OR s.order_quantity <= $6)
    `;

    const queryParams = [
      plu || null,
      shopId || null,
      minShelf !== undefined ? minShelf : null,
      maxShelf !== undefined ? maxShelf : null,
      minOrder !== undefined ? minOrder : null,
      maxOrder !== undefined ? maxOrder : null,
      limit,
      offset,
    ];

    const { rows } = await db.query(query, queryParams);
    const { rows: countRows } = await db.query(
      countQuery,
      queryParams.slice(0, 6)
    );

    return {
      data: rows,
      total: parseInt(countRows[0].count, 10),
    };
  }
}

module.exports = StockModel;
