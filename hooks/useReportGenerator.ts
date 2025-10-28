import { useState, useCallback } from 'react';
import type { ComplianceReport } from '../types';
import { generatePdf } from '../utils/pdfGenerator';
import { exportJson } from '../utils/jsonExporter';
import { generateSha256 } from '../utils/hashGenerator';

export const useReportGenerator = (report: ComplianceReport | null) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isGeneratingJson, setIsGeneratingJson] = useState(false);

  const generateHashedReport = useCallback(async (baseReport: ComplianceReport): Promise<ComplianceReport> => {
      const reportForHashing = { ...baseReport };
      delete reportForHashing.hash; // Ensure hash is not part of the content being hashed
      const hash = await generateSha256(reportForHashing);
      return { ...baseReport, hash };
  }, []);

  const exportPdfReport = useCallback(async () => {
    if (!report || isGeneratingPdf) return;

    setIsGeneratingPdf(true);
    try {
      const finalReport = await generateHashedReport(report);
      generatePdf(finalReport);
    } catch (error) {
      console.error("Failed to generate PDF report:", error);
      alert("Failed to generate PDF report. Please try again.");
    } finally {
      setTimeout(() => setIsGeneratingPdf(false), 500);
    }
  }, [report, isGeneratingPdf, generateHashedReport]);

  const exportJsonReport = useCallback(async () => {
    if (!report || isGeneratingJson) return;
    
    setIsGeneratingJson(true);
    try {
      const finalReport = await generateHashedReport(report);
      exportJson(finalReport);
    } catch (error) {
      console.error("Failed to generate JSON report:", error);
      alert("Failed to generate JSON report.");
    } finally {
       setTimeout(() => setIsGeneratingJson(false), 500);
    }
  }, [report, isGeneratingJson, generateHashedReport]);


  return { exportPdfReport, isGeneratingPdf, exportJsonReport, isGeneratingJson };
};