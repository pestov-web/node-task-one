const db = require("../db");

async function saveToHistory({
  plu,
  shopId,
  action,
  shelfQuantity,
  orderQuantity,
}) {
  const sql = `
        INSERT INTO history (plu, shop_id, action, shelf_quantity, order_quantity)
        VALUES ($1, $2, $3, $4, $5)
    `;
  const values = [plu, shopId, action, shelfQuantity, orderQuantity];
  console.log(values);
  try {
    await db.query(sql, values);
    console.log("Data successfully saved to history table.");
  } catch (err) {
    console.error("Error saving data to history:", err);
  }
}

module.exports = { saveToHistory };
