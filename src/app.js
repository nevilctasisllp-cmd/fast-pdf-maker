const express = require("express");
const app = express();
const reportRoutes = require("./routes/report.routes");

app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Routes
app.use("/api/reports", reportRoutes);

// Global error fallback
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

module.exports = app;
