const { jsPDF } = require("jspdf");
require("jspdf-autotable");

class StudentReportService {
  /**
   * Generate grouped PDF with rowspan support
   * @param {Array<Object>} data - Table data
   * @param {Object} options
   * @param {Array<string>} options.groupKeys - Columns to group by
   */
  static generate(data, options = {}) {
    // Validate input
    if (!Array.isArray(data) || !data.length) {
      throw new Error("Invalid data");
    }

    const { groupKeys = [] } = options;
    const doc = new jsPDF();

    /* ================= HEADER ================= */
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Company Name Pvt. Ltd.", 105, 15, { align: "center" });

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Dynamic Grouped Report", 105, 22, { align: "center" });

    doc.line(14, 26, 196, 26);

    /* ================= COLUMNS ================= */
    // Detect all unique columns from data
    const columns = [...new Set(data.flatMap(o => Object.keys(o)))];

    // Valid group columns
    const groups = groupKeys.filter(k => columns.includes(k));

    // Non-group columns
    const normals = columns.filter(c => !groups.includes(c));

    /* ================= SORT DATA ================= */
    // Sorting is required for rowspan logic
    const sorted = [...data].sort((a, b) => {
      for (const g of groups) {
        const diff = String(a[g] ?? "").localeCompare(String(b[g] ?? ""));
        if (diff !== 0) return diff;
      }
      return 0;
    });

    /* ================= HELPER FUNCTIONS ================= */

    // Check if two rows are same up to group index
    const sameUpto = (a, b, idx) => {
      for (let i = 0; i <= idx; i++) {
        if (a[groups[i]] !== b[groups[i]]) return false;
      }
      return true;
    };

    // Calculate rowspan for a grouped cell
    const calcSpan = (start, idx) => {
      let span = 1;
      for (let i = start + 1; i < sorted.length; i++) {
        if (!sameUpto(sorted[start], sorted[i], idx)) break;
        span++;
      }
      return span;
    };

    /* ================= BUILD TABLE BODY ================= */
    const body = [];

    sorted.forEach((row, rowIndex) => {
      const tableRow = [];

      // Add grouped columns with rowspan
      groups.forEach((key, keyIndex) => {
        const isFirstRow =
          rowIndex === 0 ||
          !sameUpto(sorted[rowIndex], sorted[rowIndex - 1], keyIndex);

        if (isFirstRow) {
          tableRow.push({
            content: String(row[key] ?? ""),
            rowSpan: calcSpan(rowIndex, keyIndex),
            styles: {
              halign: "center",
              valign: "middle",
              fontStyle: "bold"
            }
          });
        }
      });

      // Add normal columns
      normals.forEach(col => {
        tableRow.push(row[col] != null ? String(row[col]) : "");
      });

      body.push(tableRow);
    });

    /* ================= GENERATE TABLE ================= */
    doc.autoTable({
      startY: 32,
      head: [[...groups, ...normals].map(h => h.toUpperCase())],
      body,
      theme: "grid",
      styles: {
        fontSize: 10,
        halign: "center"
      },
      headStyles: {
        fontStyle: "bold"
      },
      margin: {
        left: 14,
        right: 14
      }
    });

    // Return PDF buffer
    return Buffer.from(doc.output("arraybuffer"));
  }
}

module.exports = StudentReportService;
