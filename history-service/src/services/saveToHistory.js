const db = require("../db");

async function saveToHistory({ productId, shopId, action, quantity }) {
  const sql = `
        INSERT INTO history (product_id, shop_id, action, quantity)
        VALUES ($1, $2, $3, $4)
    `;
  const values = [productId, shopId, action, quantity];

  try {
    await db.query(sql, values);
    console.log("Data successfully saved to history table.");
  } catch (err) {
    console.error("Error saving data to history:", err);
  }
}

module.exports = { saveToHistory };
