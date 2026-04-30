// ─────────────────────────────────────────────
//  CLIENT ROUTES — public-facing APIs
// ─────────────────────────────────────────────

const express = require("express");
const router = express.Router();

const ClientController = require("../controllers/clientController");

// POST  /api/submit-name  →  Register a new name (from QR page)
router.post("/submit-name", ClientController.submitName);

module.exports = router;
