// ─────────────────────────────────────────────
//  EXCEL EXPORT — saves each registration to .xlsx
// ─────────────────────────────────────────────

const ExcelJS = require("exceljs");
const path = require("path");
const fs = require("fs");

const EXCEL_PATH = path.join(__dirname, "..", "data", "registrations.xlsx");

/**
 * Append a client record to the Excel file.
 * Creates the file with headers if it doesn't exist.
 */
async function saveToExcel(client) {
  try {
    const workbook = new ExcelJS.Workbook();

    if (fs.existsSync(EXCEL_PATH)) {
      await workbook.xlsx.readFile(EXCEL_PATH);
    } else {
      const sheet = workbook.addWorksheet("Registrations");
      sheet.columns = [
        { header: "ID", key: "id", width: 10 },
        { header: "Name", key: "name", width: 30 },
      ];
    }

    const sheet = workbook.getWorksheet("Registrations");
    sheet.addRow({ id: client.id, name: client.name });

    await workbook.xlsx.writeFile(EXCEL_PATH);
    console.log("✅ Excel saved →", EXCEL_PATH);
  } catch (err) {
    console.error("❌ Excel Error:", err.message);
  }
}

module.exports = { saveToExcel };
