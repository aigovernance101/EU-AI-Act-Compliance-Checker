import React, { useState, useMemo, useCallback } from 'react';
import { QuestionCard } from './components/QuestionCard';
import { SummaryView } from './components/SummaryView';
import { ProgressBar } from './components/ProgressBar';
import { questions, evaluateCompliance, getQuestionById } from './data/questions';
import type { ComplianceReport, Answer, Question } from './types';
import { DisclaimerModal } from './components/DisclaimerModal';
import { FaqSection } from './components/FaqSection';

const App: React.FC = () => {
  const [currentQuestionId, setCurrentQuestionId] = useState<string>('start');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [report, setReport] = useState<ComplianceReport | null>(null);
  const [questionPath, setQuestionPath] = useState<string[]>(['start']);
  const [showDisclaimer, setShowDisclaimer] = useState<boolean>(true);

  const currentQuestion: Question | undefined = useMemo(() => getQuestionById(currentQuestionId), [currentQuestionId]);

  const handleAnswer = useCallback((answer: Answer) => {
    const newAnswers = { ...answers, [answer.questionId]: answer.value };
    setAnswers(newAnswers);

    if (!questionPath.includes(answer.nextQuestionId)) {
        setQuestionPath(prev => [...prev, answer.nextQuestionId]);
    }

    if (answer.nextQuestionId === 'finish') {
      const finalReport = evaluateCompliance(newAnswers);
      setReport(finalReport);
      setIsFinished(true);
    } else {
      setCurrentQuestionId(answer.nextQuestionId);
    }
  }, [answers, questionPath]);

  const handleRestart = useCallback(() => {
    setCurrentQuestionId('start');
    setAnswers({});
    setIsFinished(false);
    setReport(null);
    setQuestionPath(['start']);
  }, []);

  const progress = useMemo(() => {
    const totalQuestions = questions.length;
    // A simple progress calculation: number of answered questions / total questions
    const answeredCount = Object.keys(answers).length;
    if (isFinished) return 100;
    return Math.round((answeredCount / totalQuestions) * 100);
  }, [answers, isFinished]);

  if (showDisclaimer) {
      return <DisclaimerModal onAccept={() => setShowDisclaimer(false)} />;
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800 flex flex-col items-center p-4 sm:p-6 md:p-8">
      <header className="w-full max-w-4xl text-center my-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-900">EU AI Act Compliance Checker</h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">A free, interactive tool to help you assess your AI system's risk level and navigate the complexities of the European Union's AI regulation.</p>
      </header>

      <main className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 sm:p-10 flex flex-col flex-grow">
        {!isFinished && currentQuestion ? (
          <>
            <ProgressBar progress={progress} />
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              onAnswer={handleAnswer}
            />
          </>
        ) : (
          <SummaryView report={report} onRestart={handleRestart} />
        )}
      </main>

      <FaqSection />

      <footer className="w-full max-w-4xl text-center mt-8 text-sm text-gray-500">
        <p>Version 2.0 | This tool provides informational guidance and is not legal advice.</p>
        <p className="mt-2">This web app does not use cookies or tracking technologies other than those strictly necessary for its technical operation.</p>
        <div className="flex justify-center items-center mt-2 space-x-2">
            <span>
              Created by <a href="https://www.linkedin.com/in/nicoroddz/" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 hover:underline">Nico Roddz</a>
            </span>
            <span className="text-gray-400">|</span>
            <span>Made with</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor" role="img" aria-label="love icon"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
            <span>in the EU</span>
            <svg className="w-6 h-auto" viewBox="0 0 200 133.33" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="European Union flag"><rect width="200" height="133.33" fill="#003399"/><g fill="#FFCC00"><path d="M100 21.665a45 45 0 0 0 0 90 45 45 0 0 0 0-90zm0 15l4.635 13.905h14.63l-11.835 8.595 4.635 13.905-11.835-8.595-11.835 8.595 4.635-13.905-11.835-8.595h14.63z"/></g></svg>
        </div>
      </footer>
    </div>
  );
};

export default App;