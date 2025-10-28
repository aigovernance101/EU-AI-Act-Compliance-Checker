// NOTE: This utility requires the 'jspdf' library.
// For this environment, it should be available via an import map in index.html.
// Example: "jspdf": "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.es.min.js"
import { jsPDF } from "jspdf";
import type { ComplianceReport } from '../types';

export const generatePdf = (report: ComplianceReport): void => {
  const doc = new jsPDF();
  const margin = 15;
  const listMargin = margin + 5;
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = 20;

  const addPageIfNeeded = () => {
    if (yPos > 280) { // Check for new page
      doc.addPage();
      yPos = 20;
    }
  };

  // --- Header ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("EU AI Act Compliance Report", pageWidth / 2, yPos, { align: "center" });
  yPos += 10;
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date(report.timestamp).toLocaleString()}`, pageWidth / 2, yPos, { align: "center" });
  yPos += 15;
  
  // --- Classification Box ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setFillColor(230, 247, 255); // A light blue
  doc.rect(margin, yPos, pageWidth - (margin * 2), 20, 'F');
  doc.setTextColor(0, 51, 153);
  doc.text(`Result: ${report.classification}`, margin + 5, yPos + 13);
  yPos += 30;
  doc.setTextColor(0, 0, 0);

  // --- Summary ---
  addPageIfNeeded();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Summary", margin, yPos);
  yPos += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const summaryLines = doc.splitTextToSize(report.summary, pageWidth - (margin * 2));
  doc.text(summaryLines, margin, yPos);
  yPos += summaryLines.length * 5 + 10;

  // --- Obligations ---
  if (report.obligations.length > 0) {
    addPageIfNeeded();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Potential Obligations", margin, yPos);
    yPos += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    report.obligations.forEach(obligation => {
      addPageIfNeeded();
      const obligationLines = doc.splitTextToSize(`• ${obligation}`, pageWidth - listMargin - margin);
      doc.text(obligationLines, listMargin, yPos);
      yPos += obligationLines.length * 5 + 3;
    });
    yPos += 10;
  }

  // --- References ---
  if (report.references.length > 0) {
    addPageIfNeeded();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Relevant Legal References", margin, yPos);
    yPos += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const referencesText = report.references.join(', ');
    const referenceLines = doc.splitTextToSize(referencesText, pageWidth - (margin * 2));
    doc.text(referenceLines, margin, yPos);
  }
  
  doc.save("EU-AI-Act-Compliance-Report.pdf");
};