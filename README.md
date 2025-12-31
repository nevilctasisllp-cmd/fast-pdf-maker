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

- Group data by multiple keys (Department, Year, Name, etc.)

- Automatically merge rows (rowSpan) for grouped columns

- Prevents duplicate group values in table body

- Fully dynamic table structure

- Supports download & inline PDF response

- Easy to integrate into existing Node/Express projects

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
{
"groupKeys": ["Department", "Year", "Name"],
"data": [
{ "Department": "Sales", "Year": "2024", "Name": "Amit", "Subject": "Eng", "Marks": 80 },
{ "Department": "Sales", "Year": "2024", "Name": "Amit", "Subject": "Hindi", "Marks": 85 },
{ "Department": "Sales", "Year": "2025", "Name": "Kunal", "Subject": "Eng", "Marks": 78 },
{ "Department": "HR", "Year": "2024", "Name": "Neha", "Subject": "Gujarati", "Marks": 92 },
{ "Department": "HR", "Year": "2024", "Name": "Neha", "Subject": "Hindi", "Marks": 88 }
]
}
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
const data = {
"groupKeys": ["Department", "Year", "Name"],
"data": [
{ "Department": "Sales", "Year": "2024", "Name": "Amit", "Subject": "Eng", "Marks": 80 },
{ "Department": "Sales", "Year": "2024", "Name": "Amit", "Subject": "Hindi", "Marks": 85 },
{ "Department": "Sales", "Year": "2025", "Name": "Kunal", "Subject": "Eng", "Marks": 78 },
{ "Department": "HR", "Year": "2024", "Name": "Neha", "Subject": "Gujarati", "Marks": 92 },
{ "Department": "HR", "Year": "2024", "Name": "Neha", "Subject": "Hindi", "Marks": 88 }
]
}

StudentReportService.saveToFile(data, "report.pdf");

📊 Output Behavior

Group columns are merged vertically

No duplicate Department / Year / Name in rows

Clean professional PDF layout

Auto-generated headers and footer

⚙️ Tech Stack

Node.js

jsPDF

jspdf-autotable

Express (optional)

- 🧪 Testing with Postman

* Method: POST

* URL: http://localhost:3000/report/pdf

* Headers:

Content-Type: application/json

Body: (raw → JSON)

{
"groupKeys": ["Department", "Year", "Name"],
"data": [ ... ]
}
