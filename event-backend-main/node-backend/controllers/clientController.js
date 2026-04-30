// ─────────────────────────────────────────────
//  CLIENT CONTROLLER — business logic for each route
// ─────────────────────────────────────────────

const ClientModel = require("../models/clientModel");
const { saveToExcel } = require("../utils/excel");
const { normalizeText } = require("../utils/normalize");
const { BANNED_WORDS, GUEST_NAMES } = require("../utils/constants");

const ClientController = {
  // ──────────────────────────────────────────
  //  POST /submit-name
  // ──────────────────────────────────────────
  submitName(req, res) {
    const name = (req.body.name || "").trim();

    // --- Validation ---
    if (!name) {
      return res.status(400).json({ error: "Name required" });
    }

    if (name.split(" ").length < 2) {
      return res.status(400).json({ error: "Please enter your full name" });
    }

    if (name.length < 2 || name.length > 50) {
      return res.status(400).json({ error: "Name must be 2-50 characters" });
    }

    // --- Abuse filter ---
    const cleaned = normalizeText(name);

    for (const word of BANNED_WORDS) {
      if (cleaned.includes(word)) {
        return res
          .status(400)
          .json({ error: "sorry this contains a banned phrase/word" });
      }
    }

    // --- Limit check (max 500) ---
    if (ClientModel.count() >= 500) {
      return res.status(400).json({ error: "Max limit reached" });
    }

    // --- Save to DB ---
    const client = ClientModel.create(name);

    // --- Save to Excel ---
    saveToExcel(client);

    return res.json({ message: "Name submitted successfully" });
  },

  // ──────────────────────────────────────────
  //  GET /get-names
  // ──────────────────────────────────────────
  getNames(req, res) {
    const names = ClientModel.getAllNames();

    // Min 100 logic — pad with guest names
    if (names.length < 100) {
      for (const guest of GUEST_NAMES) {
        if (!names.includes(guest)) {
          names.push(guest);
        }
        if (names.length >= 100) break;
      }
    }

    return res.json({ names: names.slice(0, 500) });
  },

  // ──────────────────────────────────────────
  //  POST /reset
  // ──────────────────────────────────────────
  resetData(req, res) {
    ClientModel.deleteAll();
    return res.json({ message: "All data cleared" });
  },
};

module.exports = ClientController;
