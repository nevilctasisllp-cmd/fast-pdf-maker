const { jsPDF } = require("jspdf");
require("jspdf-autotable");

class StudentReportService {
  static generate(data, options = {}) {
    if (!Array.isArray(data) || !data.length) {
      throw new Error("Invalid data");
    }

    const { groupKeys = [] } = options;
    const doc = new jsPDF();

    /* ===== HEADER ===== */
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Company Name Pvt. Ltd.", 105, 15, { align: "center" });
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Dynamic Grouped Report", 105, 22, { align: "center" });
    doc.line(14, 26, 196, 26);

    /* ===== COLUMNS ===== */
    const columns = [...new Set(data.flatMap(o => Object.keys(o)))];
    const groups = groupKeys.filter(k => columns.includes(k));
    const normals = columns.filter(c => !groups.includes(c));

    /* ===== SORT ===== */
    const sorted = [...data].sort((a, b) => {
      for (const g of groups) {
        const d = String(a[g] ?? "").localeCompare(String(b[g] ?? ""));
        if (d !== 0) return d;
      }
      return 0;
    });

    /* ===== HELPERS ===== */
    const sameUpto = (a, b, idx) => {
      for (let i = 0; i <= idx; i++) {
        if (a[groups[i]] !== b[groups[i]]) return false;
      }
      return true;
    };

    const calcSpan = (start, idx) => {
      let span = 1;
      for (let i = start + 1; i < sorted.length; i++) {
        if (!sameUpto(sorted[start], sorted[i], idx)) break;
        span++;
      }
      return span;
    };

    /* ===== BUILD BODY ===== */
    const body = [];

    sorted.forEach((row, rIdx) => {
      const tr = [];

      groups.forEach((key, kIdx) => {
        const isFirst =
          rIdx === 0 ||
          !sameUpto(sorted[rIdx], sorted[rIdx - 1], kIdx);

        if (isFirst) {
          tr.push({
            content: String(row[key] ?? ""),
            rowSpan: calcSpan(rIdx, kIdx),
            styles: {
              halign: "center",
              valign: "middle",
              fontStyle: "bold"
            }
          });
        }
      });

      normals.forEach(c => {
        tr.push(row[c] != null ? String(row[c]) : "");
      });

      body.push(tr);
    });

    /* ===== TABLE ===== */
    doc.autoTable({
      startY: 32,
      head: [[...groups, ...normals].map(h => h.toUpperCase())],
      body,
      theme: "grid",
      styles: { fontSize: 10, halign: "center" },
      headStyles: { fontStyle: "bold" },
      margin: { left: 14, right: 14 }
    });

    return Buffer.from(doc.output("arraybuffer"));
  }
}

module.exports = StudentReportService;
