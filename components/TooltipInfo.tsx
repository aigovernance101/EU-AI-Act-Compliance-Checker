import React from 'react';

interface TooltipInfoProps {
  hint?: string;
  legalReference?: string;
}

export const TooltipInfo: React.FC<TooltipInfoProps> = ({ hint, legalReference }) => {
  if (!hint && !legalReference) return null;

  return (
    <div className="relative group flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div className="absolute bottom-full mb-2 w-72 bg-gray-800 text-white text-sm rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 right-0 transform translate-x-1/2 md:translate-x-0 md:left-auto md:right-1/2">
        {hint && <p className="font-sans">{hint}</p>}
        {legalReference && <p className="mt-2 text-xs text-gray-300 font-mono">{legalReference}</p>}
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-gray-800"></div>
      </div>
    </div>
  );
};