import React, { useState } from 'react';

const faqData = [
  {
    question: 'What is the EU AI Act?',
    answer: 'The EU AI Act is a landmark piece of legislation by the European Union to regulate Artificial Intelligence. It follows a risk-based approach, meaning the legal obligations for an AI system are tailored to its level of risk. The Act categorizes AI systems into four levels: unacceptable risk (prohibited), high-risk, limited risk, and minimal risk.',
  },
  {
    question: 'Is this tool a substitute for legal advice?',
    answer: 'Absolutely not. This checker is an educational tool designed to provide a preliminary, informational assessment based on your answers. It simplifies a complex legal framework and does not cover every nuance. For specific compliance needs and legal advice, you must consult with a qualified legal professional.',
  },
  {
    question: "How should I interpret the 'High-Risk' classification?",
    answer: "A 'High-Risk' classification means your AI system falls into one of the categories defined in the Act that requires strict compliance obligations before it can be placed on the market. This includes requirements for risk management, data governance, technical documentation, transparency, human oversight, and cybersecurity. The list of obligations provided in the summary is a starting point for the extensive requirements you will need to meet.",
  },
  {
    question: "What if my AI system is classified as 'Out-of-Scope'?",
    answer: "'Out-of-Scope' suggests that based on your inputs (e.g., the system is not used within the EU), the AI Act may not apply. However, you should carefully consider if your system could have an effect on individuals within the EU, which might bring it into scope. This classification warrants a careful review of your specific situation.",
  },
  {
    question: 'How often is this tool updated?',
    answer: "We strive to keep the tool's logic aligned with the latest developments and official texts of the EU AI Act. However, as interpretations and guidance from regulatory bodies evolve, there may be delays. The version number in the footer indicates the last significant update.",
  },
];

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-800 hover:text-blue-600 focus:outline-none"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <svg
          className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}
      >
        <p className="text-gray-600 pr-6">{answer}</p>
      </div>
    </div>
  );
};


export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 sm:p-10 mt-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 text-center mb-8">Frequently Asked Questions</h2>
      <div className="space-y-2">
        {faqData.map((item, index) => (
          <FaqItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  );
};