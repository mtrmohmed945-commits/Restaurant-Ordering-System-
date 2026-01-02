import express from "express";
import db from "../db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// helper: extract user id from token (NO PROTECTION)
function getUserId(req) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch {
    return null;
  }
}

/* =====================
   CREATE ORDER
===================== */
router.post("/", async (req, res) => {
  const { items, total } = req.body;
  const user_id = getUserId(req);

  if (!user_id) {
    return res.status(400).json({ message: "User not logged in" });
  }

  try {
    const [orderResult] = await db.query(
      "INSERT INTO orders (user_id, total) VALUES (?, ?)",
      [user_id, total]
    );

    const orderId = orderResult.insertId;

    for (const item of items) {
      await db.query(
        "INSERT INTO order_items (order_id, menu_item_id, quantity, price) VALUES (?, ?, ?, ?)",
        [orderId, item.id, item.quantity, item.price]
      );
    }

    res.json({ success: true, orderId });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order save failed" });
  }
});

/* =====================
   GET CURRENT USER ORDERS
===================== */
router.get("/", async (req, res) => {
  const user_id = getUserId(req);

  if (!user_id) {
    return res.json([]); // not logged in → no orders
  }

  try {
    const [orders] = await db.query(
      `SELECT o.id, o.total, o.status, o.created_at, u.name AS customer
       FROM orders o
       JOIN users u ON o.user_id = u.id
       WHERE o.user_id = ?
       ORDER BY o.created_at DESC`,
      [user_id]
    );

    for (const order of orders) {
      const [items] = await db.query(
        `SELECT m.name, oi.quantity, oi.price
         FROM order_items oi
         JOIN menu_items m ON oi.menu_item_id = m.id
         WHERE oi.order_id = ?`,
        [order.id]
      );
      order.items = items;
    }

    res.json(orders);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Fetch orders failed" });
  }
});

export default router;
