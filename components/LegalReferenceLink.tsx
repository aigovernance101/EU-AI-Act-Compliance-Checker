import React from 'react';

// URL to the final, published version of the EU AI Act
const AI_ACT_URL = 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=OJ:L_202401801';

interface LegalReferenceLinkProps {
  reference: string;
}

export const LegalReferenceLink: React.FC<LegalReferenceLinkProps> = ({ reference }) => {
  return (
    <a
      href={AI_ACT_URL}
      target="_blank"
      rel="noopener noreferrer"
      title={`Learn more about ${reference} in the official EU AI Act text`}
      className="inline-flex items-center gap-2 bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full hover:bg-blue-200 hover:text-blue-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {reference}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  );
};