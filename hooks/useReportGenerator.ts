import { useState, useCallback } from 'react';
import type { ComplianceReport } from '../types';
import { generatePdf } from '../utils/pdfGenerator';
import { exportJson } from '../utils/jsonExporter';

export const useReportGenerator = (report: ComplianceReport | null) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const exportReport = useCallback(async () => {
    if (!report || isGenerating) return;

    setIsGenerating(true);
    try {
      // Wrap in a promise to handle async-like behavior and give UI time to update
      await new Promise(resolve => setTimeout(resolve, 50)); 
      
      // The generatePdf function requires the 'jspdf' library.
      // If it's not available in the project, this line will fail.
      generatePdf(report); 
      exportJson(report);

    } catch (error) {
      console.error("Failed to generate report:", error);
      alert("Failed to generate PDF report. Please ensure the 'jspdf' library is available. A JSON report will still be downloaded.");
      if (report) {
        exportJson(report);
      }
    } finally {
      // Add a small delay so the user sees the 'Generating...' state
      setTimeout(() => {
        setIsGenerating(false);
      }, 500);
    }
  }, [report, isGenerating]);

  return { exportReport, isGenerating };
};