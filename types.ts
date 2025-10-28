
export interface QuestionOption {
  label: string;
  value: string;
  next: string; // The ID of the next question, or 'finish'
  legalReference?: string;
  hint?: string;
}

export interface Question {
  id: string;
  category: "Entity" | "Scope" | "Risk" | "Transparency" | "Exclusion";
  question: string;
  options: QuestionOption[];
}

export interface Answer {
  questionId: string;
  value: string;
  nextQuestionId: string;
}

export type Classification = "High-Risk" | "In-Scope" | "Out-of-Scope" | "Prohibited" | "Minimal-Risk";

export interface ComplianceReport {
  timestamp: string;
  classification: Classification;
  obligations: string[];
  references: string[];
  version: string;
  summary: string;
}
