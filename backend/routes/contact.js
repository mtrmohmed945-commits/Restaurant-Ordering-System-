import express from "express";
import db from "../db.js";

const router = express.Router();

/* =====================
   SEND MESSAGE
===================== */
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await db.query(
      "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)",
      [name, email, message]
    );

    res.json({ success: true, message: "Message sent successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send message" });
  }
});

/* =====================
   ADMIN: GET ALL MESSAGES
===================== */
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM contact_messages ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

/* =====================
   ADMIN: DELETE MESSAGE
===================== */
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM contact_messages WHERE id = ?", [
      req.params.id
    ]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;
