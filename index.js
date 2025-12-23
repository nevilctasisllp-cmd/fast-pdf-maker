/**
 * Dynamic Grouped PDF Report Generator
 * -----------------------------------
 * Author: Your Name
 * Package: your-npm-package-name
 */

const StudentReportService = require("./src/services/pdf/student-report.service");

/**
 * Generate PDF as Buffer
 * @param {Array<Object>} data
 * @returns {Buffer}
 */
function generatePDF(data) {
  return StudentReportService.generate(data);
}

/**
 * Generate PDF and save to file
 * @param {Array<Object>} data
 * @param {string} outputPath
 * @returns {string}
 */
function savePDF(data, outputPath) {
  return StudentReportService.saveToFile(data, outputPath);
}

/**
 * Generate PDF from JSON file
 * @param {string} filePath
 * @returns {Buffer}
 */
function generateFromFile(filePath) {
  return StudentReportService.generateFromFile(filePath);
}

module.exports = {
  generatePDF,
  savePDF,
  generateFromFile,
};
