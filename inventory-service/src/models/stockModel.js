const db = require("../db");

class StockModel {
  static async create(productId, shopId, shelfQuantity = 0, orderQuantity = 0) {
    return db.query(
      `INSERT INTO stocks (product_id, shop_id, shelf_quantity, order_quantity)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [productId, shopId, shelfQuantity, orderQuantity]
    );
  }

  static async increase(stockId, quantity) {
    return db.query(
      "UPDATE stocks SET shelf_quantity = shelf_quantity + $1 WHERE id = $2 RETURNING *",
      [quantity, stockId]
    );
  }

  static async decrease(stockId, quantity) {
    return db.query(
      `UPDATE stocks SET shelf_quantity = shelf_quantity - $1
       WHERE id = $2 AND shelf_quantity >= $1 RETURNING *`,
      [quantity, stockId]
    );
  }

  static async findByFilters(
    plu,
    shopId,
    minShelf,
    maxShelf,
    minOrder,
    maxOrder
  ) {
    return db.query(
      `SELECT s.*, p.plu, p.name
       FROM stocks s
       JOIN products p ON s.product_id = p.id
       WHERE ($1::text IS NULL OR p.plu = $1)
         AND ($2::int IS NULL OR s.shop_id = $2)
         AND ($3::int IS NULL OR s.shelf_quantity >= $3)
         AND ($4::int IS NULL OR s.shelf_quantity <= $4)
         AND ($5::int IS NULL OR s.order_quantity >= $5)
         AND ($6::int IS NULL OR s.order_quantity <= $6)`,
      [
        plu || null,
        shopId || null,
        minShelf || null,
        maxShelf || null,
        minOrder || null,
        maxOrder || null,
      ]
    );
  }
}

module.exports = StockModel;
