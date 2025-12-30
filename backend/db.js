import mysql from "mysql2/promise"; // promise version
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Optional test connection
(async () => {
  try {
    const [rows] = await pool.query('SELECT 1'); // simple test
    console.log("✅ MySQL connected (promise pool)");
  } catch (err) {
    console.error("❌ MySQL pool error:", err.message);
  }
})();

export default pool;


