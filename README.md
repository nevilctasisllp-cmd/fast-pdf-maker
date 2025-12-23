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
