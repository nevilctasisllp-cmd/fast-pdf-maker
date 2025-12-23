const { jsPDF } = require("jspdf");
require("jspdf-autotable");

class StudentReportService {
  static generate(data) {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Invalid data: Data must be a non-empty array");
    }

    const doc = new jsPDF();

    /* ================= HEADER ================= */
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Company Name Pvt. Ltd.", 105, 15, { align: "center" });

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Dynamic Grouped Report", 105, 22, { align: "center" });

    doc.setDrawColor(22, 160, 133);
    doc.setLineWidth(0.5);
    doc.line(14, 26, 196, 26);

    /* ================= AUTO DETECT COLUMNS ================= */
    const columnsSet = new Set();
    data.forEach((row) => {
      if (row && typeof row === "object") {
        Object.keys(row).forEach((key) => columnsSet.add(key));
      }
    });

    const columns = Array.from(columnsSet);

    if (columns.length === 0) {
      throw new Error("No columns found in data");
    }

    /* ================= IDENTIFY GROUP KEY ================= */
    // First column is the grouping key
    const groupKey = columns[0];
    const otherColumns = columns.slice(1);

    /* ================= SORT DATA BY GROUP KEY ================= */
    const sortedData = [...data].sort((a, b) => {
      const aVal = a[groupKey] ?? "";
      const bVal = b[groupKey] ?? "";
      return String(aVal).localeCompare(String(bVal));
    });

    /* ================= GROUP DATA ================= */
    const grouped = {};
    sortedData.forEach((row) => {
      const groupValue = row[groupKey] ?? "";
      if (!grouped[groupValue]) {
        grouped[groupValue] = [];
      }
      grouped[groupValue].push(row);
    });

    /* ================= BUILD TABLE DATA ================= */
    const tableData = [];

    Object.entries(grouped).forEach(([groupValue, rows]) => {
      rows.forEach((row, index) => {
        const tableRow = [];

        // First column with rowspan
        if (index === 0) {
          tableRow.push({
            content: String(groupValue),
            rowSpan: rows.length,
            styles: {
              valign: "middle",
              halign: "center",
              fontStyle: "bold",
              fillColor: [240, 248, 255],
            },
          });
        }

        // Other columns
        otherColumns.forEach((col) => {
          const value = row[col];
          tableRow.push(
            value !== undefined && value !== null ? String(value) : ""
          );
        });

        // Only add row if it's the first of the group OR if it has data
        if (index === 0 || tableRow.slice(1).some((cell) => cell !== "")) {
          tableData.push(tableRow);
        }
      });
    });

    /* ================= GENERATE TABLE ================= */
    doc.autoTable({
      startY: 32,
      head: [columns.map((col) => col.toUpperCase())],
      body: tableData,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 5,
        halign: "center",
        valign: "middle",
        lineColor: [200, 200, 200],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        halign: "center",
        fontSize: 11,
      },
      bodyStyles: {
        textColor: [50, 50, 50],
      },
      alternateRowStyles: {
        fillColor: [249, 249, 249],
      },
      columnStyles: {
        0: {
          cellWidth: 40,
          fontStyle: "bold",
        },
      },
      margin: { left: 14, right: 14 },
      didDrawPage: (data) => {
        // Footer
        doc.setFontSize(9);
        doc.setTextColor(100);
        doc.text(
          `Generated on: ${new Date().toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}`,
          14,
          doc.internal.pageSize.height - 10
        );

        // Page numbers
        const pageCount = doc.internal.getNumberOfPages();
        doc.text(
          `Page ${data.pageNumber} of ${pageCount}`,
          doc.internal.pageSize.width - 40,
          doc.internal.pageSize.height - 10
        );
      },
    });

    return Buffer.from(doc.output("arraybuffer"));
  }

  // Helper method to generate from file path
  static generateFromFile(filePath) {
    const fs = require("fs");
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return this.generate(data);
  }

  // Helper method to save PDF
  static saveToFile(data, outputPath) {
    const fs = require("fs");
    const pdfBuffer = this.generate(data);
    fs.writeFileSync(outputPath, pdfBuffer);
    return outputPath;
  }
}

module.exports = StudentReportService;
