import React from 'react';
import type { ComplianceReport, Classification } from '../types';
import { useReportGenerator } from '../hooks/useReportGenerator';
import { LegalReferenceLink } from './LegalReferenceLink';

interface SummaryViewProps {
  report: ComplianceReport | null;
  onRestart: () => void;
}

// FIX: Changed JSX.Element to React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
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

export const SummaryView: React.FC<SummaryViewProps> = ({ report, onRestart }) => {
  const { exportReport, isGenerating } = useReportGenerator(report);

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

  return (
    <div className="text-center animate-fade-in-fast">
        <div className={`p-6 rounded-lg border-2 ${styles.border} ${styles.bg} ${styles.text}`}>
            <div className="flex justify-center items-center mb-4">
                {styles.icon}
                <h2 className="text-3xl font-bold ml-3">Result: {report.classification}</h2>
            </div>
            <p className="text-lg">{report.summary}</p>
        </div>

      {report.obligations.length > 0 && (
        <div className="mt-8 text-left">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Potential Obligations:</h3>
          <ul className="list-disc list-inside bg-gray-50 p-4 rounded-lg space-y-2">
            {report.obligations.map((obligation, index) => (
              <li key={index} className="text-gray-700">{obligation}</li>
            ))}
          </ul>
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
          className="w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Start a New Assessment
        </button>
        <button
          onClick={exportReport}
          disabled={isGenerating}
          className="w-full sm:w-auto bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'Generating...' : 'Export Report'}
        </button>
      </div>
    </div>
  );
};