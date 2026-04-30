// ─────────────────────────────────────────────
//  SERVER ENTRY POINT
// ─────────────────────────────────────────────

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const { initDB } = require("./config/database");
const clientRoutes = require("./routes/clientRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ─── MIDDLEWARE ──────────────────────────────
app.use(cors());
app.use(express.json());

// ─── SERVE STATIC ASSETS (Diya video, logo, etc.) ─
app.use("/assets", express.static(path.join(__dirname, "public", "assets")));

// ─── API ROUTES ──────────────────────────────
app.use("/api", clientRoutes);
app.use("/api/admin", adminRoutes);

// ─── HEALTH CHECK ────────────────────────────
app.get("/", (req, res) => {
  res.json({ status: "Backend running" });
});

// ─── PAGE: REGISTER (QR target — users enter name) ──
app.get("/dulux/register", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "register.html"));
});

// ─── PAGE: DISPLAY (Diya screen — names under diyas) ──
app.get("/dulux/display", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "display.html"));
});

// ─── PAGE: ADMIN (control panel) ─────────────
app.get("/dulux/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "admin.html"));
});

// ─── START ───────────────────────────────────
async function start() {
  await initDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running  → http://localhost:${PORT}`);
    console.log(`📝 Register page   → http://localhost:${PORT}/dulux/register`);
    console.log(`🪔 Diya display    → http://localhost:${PORT}/dulux/display`);
    console.log(`⚙️  Admin panel     → http://localhost:${PORT}/dulux/admin`);
  });
}

start();
