import type { ComplianceReport } from '../types';

export const exportJson = (report: ComplianceReport): void => {
  try {
    const jsonString = JSON.stringify(report, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    const timestamp = new Date(report.timestamp).toISOString().split('T')[0];
    a.download = `EU-AI-Act-Compliance-Report_${report.system_id}_${timestamp}.json`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error exporting JSON:", error);
    alert("Could not generate JSON file.");
  }
};