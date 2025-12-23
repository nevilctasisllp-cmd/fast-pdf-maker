# Documentation

How to use?

Install

npm i np-js.pdf

Usage

Then you're ready to start making your document:

const { jsPDF } = require("jspdf");
require("jspdf-autotable");

If you want to change the font size, orientation, or units, you can do:

const doc = new jsPDF();

    /* ================= HEADER ================= */
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");

    doc.setFontSize(11);

    doc.setDrawColor(22, 160, 133);
    doc.setLineWidth(0.5);
    doc.line(14, 26, 196, 26);

Running in Node.js
const { jsPDF } = require("jspdf"); // will automatically load the node version

📄 Dynamic Grouped PDF Report Generator (Node.js)

A fully dynamic PDF report generator built using Node.js, jsPDF, and jspdf-autotable.
This project automatically generates grouped, clean, professional PDF tables from any JSON data without requiring the user to define columns, rows, or grouping logic manually.

🚀 Features

✅ Fully dynamic data support (no fixed schema)

✅ Automatic column detection

✅ Automatic grouping (rowspan) based on first column

✅ Smart duplicate data handling

Same values are hidden in subsequent rows

Margin/padding applied for visual clarity

✅ Professional PDF layout

✅ Pagination, footer, and timestamps

✅ Works with any API / Postman data

🧠 How It Works (Concept)

Accepts any JSON array

Automatically:

Detects columns

Groups rows using the first column

Applies:

Rowspan for grouped values

Margin logic for repeated values

Generates a clean PDF table

Returns a PDF Buffer (ready for API response or file save)

📥 Example Input Data (Postman / API)
[
{ "name": "Rahul", "subject": "Maths", "marks": 85, "grade": "A" },
{ "name": "Rahul", "subject": "Maths", "marks": 85, "grade": "A" },
{ "name": "Rahul", "subject": "Science", "marks": 78, "grade": "B" },
{ "name": "Ankit", "subject": "Maths", "marks": 92, "grade": "A+" }
]

⚙️ Key Design Decisions

No hardcoded columns
No UI dependency (React/HTML not required)
Grouping logic handled internally
Safe for any unknown dataset
Production-ready formatting

🧪 Supported Data Types

Strings
Numbers
Boolean (converted to string)
Missing fields handled gracefully

❗ Notes & Best Practices

First column is always treated as grouping key
Data should be an array of objects
Sorting is handled automatically
Suitable for:
Reports
Invoices
Marksheets
Admin dashboards
Exports

Purpose: Reusable, scalable, dynamic PDF reporting solution

📌 Import
const StudentReportService = require("dynamic-grouped-pdf-report");

⚡ Quick Usage
const data = [
{ name: "Rahul", subject: "Maths", marks: 85, grade: "A" },
{ name: "Rahul", subject: "Science", marks: 78, grade: "B" },
{ name: "Ankit", subject: "Maths", marks: 92, grade: "A+" }
];

StudentReportService.saveToFile(data, "report.pdf");
