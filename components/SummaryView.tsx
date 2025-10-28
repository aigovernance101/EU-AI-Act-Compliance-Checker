import React from 'react';
import type { ComplianceReport, Classification, Obligation } from '../types';
import { useReportGenerator } from '../hooks/useReportGenerator';
import { LegalReferenceLink } from './LegalReferenceLink';

interface SummaryViewProps {
  report: ComplianceReport | null;
  onRestart: () => void;
}

const classificationStyles: Record<Classification, { bg: string, text: string, border: string, icon: React.ReactElement }> = {
    "Prohibited": { 
        bg: 'bg-red-50', text: 'text-red-800', border: 'border-red-500', 
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
    },
    "High-Risk": { 
        bg: 'bg-yellow-50', text: 'text-yellow-800', border: 'border-yellow-500', 
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
    },
    "In-Scope": { 
        bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-500', 
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
    },
    "Minimal-Risk": { 
        bg: 'bg-green-50', text: 'text-green-800', border: 'border-green-500', 
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.707 12.293a1 1 0 01-1.414 0L6 11.001a1 1 0 111.414-1.414l1.293 1.292 3.293-3.292a1 1 0 111.414 1.414l-4 4z" /></svg>
    },
    "Out-of-Scope": { 
        bg: 'bg-gray-50', text: 'text-gray-800', border: 'border-gray-400',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
    }
};

const statusColors: Record<Obligation['status'], string> = {
    'not-started': 'bg-gray-200 text-gray-700',
    'in-progress': 'bg-yellow-200 text-yellow-800',
    'complete': 'bg-green-200 text-green-800',
};


export const SummaryView: React.FC<SummaryViewProps> = ({ report, onRestart }) => {
  const { exportPdfReport, isGeneratingPdf, exportJsonReport, isGeneratingJson } = useReportGenerator(report);

  if (!report) {
    return (
      <div className="text-center animate-fade-in">
        <h2 className="text-2xl font-bold mb-4">Generating Report...</h2>
        <p>An error occurred. Please restart the assessment.</p>
        <button
            onClick={onRestart}
            className="mt-8 bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
        >
            Start Over
        </button>
      </div>
    );
  }

  const styles = classificationStyles[report.classification];
  const completedObligations = report.obligations.filter(o => o.status === 'complete').length;
  const totalObligations = report.obligations.length;
  const compliancePercentage = totalObligations > 0 ? Math.round((completedObligations / totalObligations) * 100) : 100;

  return (
    <div className="text-left animate-fade-in-fast">
        <div className={`p-6 rounded-lg border-2 text-center ${styles.border} ${styles.bg} ${styles.text}`}>
            <div className="flex justify-center items-center mb-4">
                {styles.icon}
                <h2 className="text-3xl font-bold ml-3">Result: {report.classification}</h2>
            </div>
            <p className="text-lg">{report.summary}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h4 className="text-sm font-semibold text-gray-500 uppercase">Risk Score</h4>
                <p className="text-3xl font-bold text-gray-800">{report.risk_score}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h4 className="text-sm font-semibold text-gray-500 uppercase">Risk Level</h4>
                <p className="text-3xl font-bold text-gray-800">{report.risk_level}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h4 className="text-sm font-semibold text-gray-500 uppercase">Compliance</h4>
                <p className="text-3xl font-bold text-gray-800">{compliancePercentage}%</p>
            </div>
        </div>

        {totalObligations > 0 && (
            <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800">Compliance Progress</h3>
                <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                    <div className="bg-green-500 h-4 rounded-full" style={{ width: `${compliancePercentage}%` }}></div>
                </div>
            </div>
        )}

        {report.obligations.length > 0 && (
            <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Potential Obligations:</h3>
            <div className="space-y-3">
                {report.obligations.map((obligation, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                    <span className="text-gray-700">{obligation.name}</span>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColors[obligation.status]}`}>
                        {obligation.status.replace('-', ' ')}
                    </span>
                </div>
                ))}
            </div>
            </div>
        )}

      {report.references.length > 0 && (
        <div className="mt-6 text-left">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Relevant Legal References:</h3>
          <div className="flex flex-wrap gap-2">
            {report.references.map((ref, index) => (
              <LegalReferenceLink key={index} reference={ref} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 border-t pt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
        <button
          onClick={onRestart}
          className="w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors order-last sm:order-first"
        >
          New Assessment
        </button>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-4">
            <button
              onClick={exportPdfReport}
              disabled={isGeneratingPdf}
              className="w-full sm:w-auto bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isGeneratingPdf ? 'Generating PDF...' : 'Export PDF'}
            </button>
            <button
              onClick={exportJsonReport}
              disabled={isGeneratingJson}
              className="w-full sm:w-auto bg-gray-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isGeneratingJson ? 'Generating JSON...' : 'Export JSON'}
            </button>
        </div>
      </div>
    </div>
  );
};