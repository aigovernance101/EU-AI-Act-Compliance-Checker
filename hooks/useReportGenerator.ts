import { useState, useCallback } from 'react';
import type { ComplianceReport } from '../types';
import { generatePdf } from '../utils/pdfGenerator';
import { exportJson } from '../utils/jsonExporter';

export const useReportGenerator = (report: ComplianceReport | null) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isGeneratingJson, setIsGeneratingJson] = useState(false);

  const exportPdfReport = useCallback(async () => {
    if (!report || isGeneratingPdf) return;

    setIsGeneratingPdf(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 50));
      generatePdf(report);
    } catch (error) {
      console.error("Failed to generate PDF report:", error);
      alert("Failed to generate PDF report. Please ensure the 'jspdf' library is available.");
    } finally {
      setTimeout(() => setIsGeneratingPdf(false), 500);
    }
  }, [report, isGeneratingPdf]);

  const exportJsonReport = useCallback(async () => {
    if (!report || isGeneratingJson) return;
    
    setIsGeneratingJson(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 50));
      exportJson(report);
    } catch (error) {
      console.error("Failed to generate JSON report:", error);
      alert("Failed to generate JSON report.");
    } finally {
       setTimeout(() => setIsGeneratingJson(false), 500);
    }
  }, [report, isGeneratingJson]);


  return { exportPdfReport, isGeneratingPdf, exportJsonReport, isGeneratingJson };
};
