const StudentReportService = require("../services/pdf/student-report.service");
const { logError } = require("../utils/logger");

exports.generateStudentReport = (req, res) => {
  try {
    const pdfBuffer = StudentReportService.generate(req.body);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=report.pdf",
    });

    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
exports.downloadStudentReport = (req, res) => {
  try {
    const pdfBuffer = StudentReportService.generate(req.body);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=student-report.pdf"
    );

    res.end(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
