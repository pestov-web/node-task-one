class HistoryModel {
  static async getHistory(filters) {
    const { shopId, plu, action, startDate, endDate, page, limit } = filters;

    const offset = (page - 1) * limit;

    const query = `
      SELECT * FROM history
      WHERE ($1::integer IS NULL OR shop_id = $1)
        AND ($2::integer IS NULL OR product_id = $2)
        AND ($3::text IS NULL OR action = $3)
        AND ($4::timestamp IS NULL OR created_at >= $4)
        AND ($5::timestamp IS NULL OR created_at <= $5)
      ORDER BY created_at DESC
      LIMIT $6 OFFSET $7
    `;

    const countQuery = `
      SELECT COUNT(*) FROM history
      WHERE ($1::integer IS NULL OR shop_id = $1)
        AND ($2::integer IS NULL OR product_id = $2)
        AND ($3::text IS NULL OR action = $3)
        AND ($4::timestamp IS NULL OR created_at >= $4)
        AND ($5::timestamp IS NULL OR created_at <= $5)
    `;

    const queryParams = [
      shopId || null,
      plu || null,
      action || null,
      startDate || null,
      endDate || null,
      limit,
      offset,
    ];

    const { rows } = await db.query(query, queryParams);
    const { rows: countRows } = await db.query(
      countQuery,
      queryParams.slice(0, 5)
    ); // Первые 5 параметров

    return {
      data: rows,
      total: parseInt(countRows[0].count, 10),
    };
  }
}

module.exports = HistoryModel;
