import dotenv from "dotenv";
dotenv.config(); // MUST be firstnpm 

import express from "express";
import cors from "cors";
import morgan from "morgan";
import db from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import menuRoutes from "./routes/menu.js";   // 👈 add this
import path from "path";
import multer from "multer";
import orderRoutes from "./routes/orders.js";
import adminOrders from "./routes/adminOrders.js";
import contactRoutes from "./routes/contact.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);  // 👈 use the imported router
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/orders", orderRoutes);
app.use("/api/admin/orders", adminOrders);
app.use("/api/contact", contactRoutes);

app.get("/api", (req, res) => {
  res.send("Backend running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
