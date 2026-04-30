// ─────────────────────────────────────────────
//  DATABASE CONFIG (SQLite via sql.js — pure JS)
// ─────────────────────────────────────────────

const initSqlJs = require("sql.js");
const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "..", "data", "database.db");
const DATA_DIR = path.join(__dirname, "..", "data");

let db;

/**
 * Initialize the database and create tables if they don't exist.
 */
async function initDB() {
  const SQL = await initSqlJs();

  // Ensure data directory exists
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Load existing DB or create new one
  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  // Create clients table
  db.run(`
    CREATE TABLE IF NOT EXISTS clients (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT    NOT NULL,
      created_at TEXT    DEFAULT (datetime('now'))
    )
  `);

  saveDB();
  console.log("✅ Database initialized →", DB_PATH);
}

/**
 * Persist the in-memory database to disk.
 */
function saveDB() {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buffer);
}

/**
 * Get the database instance.
 */
function getDB() {
  if (!db) throw new Error("Database not initialized. Call initDB() first.");
  return db;
}

module.exports = { initDB, getDB, saveDB };
