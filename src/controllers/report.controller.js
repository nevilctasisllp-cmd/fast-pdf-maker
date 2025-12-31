const StudentReportService = require("../services/pdf/student-report.service");

exports.generateStudentReport = (req, res) => {
  try {
    const { data, groupKeys } = req.body;

    const pdfBuffer = StudentReportService.generate(data, {
      groupKeys
    });

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
    const { data , groupKeys , includeFirstColumn } = req.body;

    const pdfBuffer = StudentReportService.generate(data, {
      groupKeys,
      includeFirstColumn: true  
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=student-report.pdf"
    );

    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
