// ─────────────────────────────────────────────
//  CLIENT MODEL — all database queries live here
// ─────────────────────────────────────────────

const { getDB, saveDB } = require("../config/database");

const ClientModel = {
  /**
   * Insert a new client and return the created record.
   */
  create(name) {
    const db = getDB();
    db.run("INSERT INTO clients (name) VALUES (?)", [name]);
    saveDB();

    const row = db.exec("SELECT last_insert_rowid() as id")[0].values[0];
    const id = row[0];

    return {
      id,
      name,
      created_at: new Date().toISOString().replace("T", " ").slice(0, 19),
    };
  },

  /**
   * Get all client names (from DB).
   */
  getAllNames() {
    const db = getDB();
    const result = db.exec("SELECT name FROM clients");
    if (result.length === 0) return [];
    return result[0].values.map((row) => row[0]);
  },

  /**
   * Get all clients with full details.
   */
  getAll() {
    const db = getDB();
    const result = db.exec("SELECT id, name, created_at FROM clients ORDER BY id DESC");
    if (result.length === 0) return [];
    return result[0].values.map((row) => ({
      id: row[0],
      name: row[1],
      created_at: row[2],
    }));
  },

  /**
   * Get total count of clients.
   */
  count() {
    const db = getDB();
    const result = db.exec("SELECT COUNT(*) as total FROM clients");
    return result[0].values[0][0];
  },

  /**
   * Delete a client by ID.
   */
  deleteById(id) {
    const db = getDB();
    db.run("DELETE FROM clients WHERE id = ?", [id]);
    saveDB();
  },

  /**
   * Delete all clients (for testing/reset).
   */
  deleteAll() {
    const db = getDB();
    db.run("DELETE FROM clients");
    saveDB();
  },
};

module.exports = ClientModel;
