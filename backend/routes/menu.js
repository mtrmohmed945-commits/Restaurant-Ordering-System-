import express from "express";
import multer from "multer";
import path from "path";
import db from "../db.js";

const router = express.Router();

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder to save uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// =====================
// GET ALL MENU ITEMS
// =====================
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM menu_items");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// =====================
// CREATE NEW MENU ITEM
// =====================
router.post("/", upload.single("image"), async (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!name || !description || !price) {
    return res.status(400).json({ message: "Name, description, and price are required" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO menu_items (name, description, price, image) VALUES (?, ?, ?, ?)",
      [name, description, price, image]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      description,
      price,
      image
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// =====================
// UPDATE MENU ITEM
// =====================
router.put("/:id", upload.single("image"), async (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    // If no new image is uploaded, keep the old one
    const [current] = await db.query("SELECT image FROM menu_items WHERE id = ?", [req.params.id]);
    if (current.length === 0) return res.status(404).json({ message: "Menu item not found" });

    const imageToSave = image || current[0].image;

    const [result] = await db.query(
      "UPDATE menu_items SET name=?, description=?, price=?, image=? WHERE id=?",
      [name, description, price, imageToSave, req.params.id]
    );

    res.json({ message: "Menu item updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// =====================
// DELETE MENU ITEM
// =====================
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM menu_items WHERE id=?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Menu item not found" });

    res.json({ message: "Menu item deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
