// ─────────────────────────────────────────────
//  ADMIN CONTROLLER — admin panel operations
// ─────────────────────────────────────────────

const ClientModel = require("../models/clientModel");
const ExcelJS = require("exceljs");

// In-memory stores
let transferredNames = [];
let fillerPool = [];       // uploaded filler names pool
const MAX_GRID_SLOTS = 504; // 30×20 grid minus center hole

// ─── HELPER: parse Excel/CSV buffer into array of names ──
async function parseNamesFromFile(buffer, originalname) {
  const workbook = new ExcelJS.Workbook();

  if (originalname.endsWith(".csv")) {
    const stream = require("stream");
    const readable = new stream.PassThrough();
    readable.end(buffer);
    await workbook.csv.read(readable);
  } else {
    await workbook.xlsx.load(buffer);
  }

  const sheet = workbook.worksheets[0];
  if (!sheet) return [];

  // Detect First Name / Last Name columns
  let firstNameCol = null;
  let lastNameCol = null;
  const headerRow = sheet.getRow(1);

  headerRow.eachCell((cell, colNumber) => {
    const header = String(cell.value || "").toLowerCase().trim();
    if (header.includes("first") && header.includes("name")) {
      firstNameCol = colNumber;
    } else if (header.includes("last") && header.includes("name")) {
      lastNameCol = colNumber;
    }
  });

  const hasSplitColumns = firstNameCol !== null || lastNameCol !== null;

  function cellToString(cell) {
    if (!cell || !cell.value) return "";
    const val =
      typeof cell.value === "object"
        ? cell.value.text || cell.value.result || String(cell.value)
        : String(cell.value);
    return val.trim();
  }

  const names = [];

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // skip header

    let name = "";

    if (hasSplitColumns) {
      const firstName = firstNameCol ? cellToString(row.getCell(firstNameCol)) : "";
      const lastName = lastNameCol ? cellToString(row.getCell(lastNameCol)) : "";
      name = `${firstName} ${lastName}`.trim();
    } else {
      row.eachCell((cell) => {
        if (!name) {
          const val = cellToString(cell);
          if (val.length >= 2) name = val;
        }
      });
    }

    if (name && name.length >= 2) {
      names.push(name);
    }
  });

  return names;
}

// ─── HELPER: shuffle array (Fisher-Yates) ──
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const AdminController = {
  // ──────────────────────────────────────────
  //  GET /api/admin/names — all names in DB
  // ──────────────────────────────────────────
  getAllNames(req, res) {
    const clients = ClientModel.getAll();
    const count = ClientModel.count();
    const fillerCount = fillerPool.length;
    return res.json({ clients, count, fillerCount });
  },

  // ──────────────────────────────────────────
  //  POST /api/admin/upload-excel — bulk import registrations
  // ──────────────────────────────────────────
  async uploadExcel(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const names = await parseNamesFromFile(req.file.buffer, req.file.originalname);

      let imported = 0;
      for (const name of names) {
        ClientModel.create(name);
        imported++;
      }

      console.log(`✅ Excel upload: ${imported} names imported`);
      return res.json({ message: `${imported} names imported`, imported, skipped: names.length - imported });
    } catch (err) {
      console.error("❌ Excel upload error:", err.message);
      return res.status(500).json({ error: "Failed to parse file" });
    }
  },

  // ──────────────────────────────────────────
  //  POST /api/admin/upload-filler — upload filler names pool
  // ──────────────────────────────────────────
  async uploadFiller(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      fillerPool = await parseNamesFromFile(req.file.buffer, req.file.originalname);

      console.log(`✅ Filler pool loaded: ${fillerPool.length} names`);
      return res.json({
        message: `${fillerPool.length} filler names loaded`,
        count: fillerPool.length,
      });
    } catch (err) {
      console.error("❌ Filler upload error:", err.message);
      return res.status(500).json({ error: "Failed to parse file" });
    }
  },

  // ──────────────────────────────────────────
  //  POST /api/admin/transfer — push names to Diya display
  // ──────────────────────────────────────────
  transferNames(req, res) {
    let names = ClientModel.getAllNames();
    const realCount = names.length;

    // If not enough to fill the grid, pad with random filler names
    if (names.length < MAX_GRID_SLOTS && fillerPool.length > 0) {
      // Shuffle the filler pool and pick non-duplicate names
      const shuffled = shuffle(fillerPool);
      for (const filler of shuffled) {
        if (!names.includes(filler)) {
          names.push(filler);
        }
        if (names.length >= MAX_GRID_SLOTS) break;
      }
    }

    // Cap at max grid slots
    transferredNames = names.slice(0, MAX_GRID_SLOTS);

    const fillerUsed = transferredNames.length - realCount;
    console.log(`✅ Transferred ${transferredNames.length} names (${realCount} real + ${fillerUsed} filler)`);

    return res.json({
      message: `${transferredNames.length} names transferred (${realCount} real + ${fillerUsed} filler)`,
      count: transferredNames.length,
      realCount,
      fillerUsed,
    });
  },

  // ──────────────────────────────────────────
  //  GET /api/admin/transferred — display reads from here
  // ──────────────────────────────────────────
  getTransferredNames(req, res) {
    return res.json({ names: transferredNames, count: transferredNames.length });
  },

  // ──────────────────────────────────────────
  //  DELETE /api/admin/names/:id — remove one name
  // ──────────────────────────────────────────
  deleteName(req, res) {
    const id = parseInt(req.params.id);
    ClientModel.deleteById(id);
    return res.json({ message: "Name deleted" });
  },

  // ──────────────────────────────────────────
  //  POST /api/admin/reset — clear everything
  // ──────────────────────────────────────────
  resetAll(req, res) {
    ClientModel.deleteAll();
    transferredNames = [];
    return res.json({ message: "All data cleared" });
  },
};

module.exports = AdminController;
