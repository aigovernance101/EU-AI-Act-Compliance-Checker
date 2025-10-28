import React from 'react';
import type { Question, Answer } from '../types';
import { TooltipInfo } from './TooltipInfo';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: Answer) => void;
}

const categoryStyles: Record<Question['category'], string> = {
    Entity: 'bg-indigo-100 text-indigo-800',
    Scope: 'bg-green-100 text-green-800',
    Risk: 'bg-yellow-100 text-yellow-800',
    Transparency: 'bg-blue-100 text-blue-800',
    Exclusion: 'bg-gray-100 text-gray-800',
};


export const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer }) => {

  const handleOptionClick = (value: string, next: string) => {
    onAnswer({
      questionId: question.id,
      value: value,
      nextQuestionId: next,
    });
  };

  return (
    <div className="flex flex-col animate-fade-in">
        <div className="mb-6">
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${categoryStyles[question.category]}`}>{question.category}</span>
        </div>
      <h2 className="text-2xl font-bold mb-8 text-gray-900">{question.question}</h2>
      <div className="grid grid-cols-1 gap-4">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleOptionClick(option.value, option.next)}
            className="group relative w-full text-left p-5 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-gray-800 group-hover:text-blue-600">{option.label}</span>
              {(option.hint || option.legalReference) && (
                <TooltipInfo hint={option.hint} legalReference={option.legalReference} />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};