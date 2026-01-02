import express from "express";
import db from "../db.js";

const router = express.Router();

// GET ALL ORDERS (ADMIN)
router.get("/", async (req, res) => {
  try {
    const [orders] = await db.query(`
      SELECT o.id, o.total, o.status, o.created_at, u.name AS customer
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `);

    for (const order of orders) {
      const [items] = await db.query(`
        SELECT m.name, oi.quantity, oi.price
        FROM order_items oi
        JOIN menu_items m ON oi.menu_item_id = m.id
        WHERE oi.order_id = ?
      `, [order.id]);

      order.items = items;
    }

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch admin orders" });
  }
});

// UPDATE ORDER STATUS
router.put("/:id/status", async (req, res) => {
  const { status } = req.body;

  try {
    await db.query(
      "UPDATE orders SET status = ? WHERE id = ?",
      [status, req.params.id]
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" });
  }
});

// DELETE ORDER
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM orders WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete order" });
  }
});

export default router;
