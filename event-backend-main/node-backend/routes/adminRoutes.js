// ─────────────────────────────────────────────
//  ADMIN ROUTES
// ─────────────────────────────────────────────

const express = require("express");
const multer = require("multer");
const router = express.Router();

const AdminController = require("../controllers/adminController");

// Multer — store file in memory (buffer), no disk write needed
const upload = multer({ storage: multer.memoryStorage() });

// GET    /api/admin/names         →  All names in DB (for admin table)
router.get("/names", AdminController.getAllNames);

// POST   /api/admin/upload-excel  →  Bulk import registrations from .xlsx/.csv
router.post("/upload-excel", upload.single("file"), AdminController.uploadExcel);

// POST   /api/admin/upload-filler →  Upload filler names pool
router.post("/upload-filler", upload.single("file"), AdminController.uploadFiller);

// POST   /api/admin/transfer      →  Push names to Diya display
router.post("/transfer", AdminController.transferNames);

// GET    /api/admin/transferred   →  Get transferred names (display reads this)
router.get("/transferred", AdminController.getTransferredNames);

// DELETE /api/admin/names/:id     →  Remove one name
router.delete("/names/:id", AdminController.deleteName);

// POST   /api/admin/reset         →  Clear all data
router.post("/reset", AdminController.resetAll);

module.exports = router;
