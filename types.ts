
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
export type RiskLevel = "High" | "Medium" | "Low" | "N/A";
export type ObligationStatus = "complete" | "in-progress" | "not-started";

export interface Obligation {
    name: string;
    status: ObligationStatus;
}

export interface ComplianceReport {
  timestamp: string;
  version: string;
  system_id: string;
  classification: Classification;
  risk_score: number;
  risk_level: RiskLevel;
  summary: string;
  owner: string;
  obligations: Obligation[];
  references: string[];
  notes: string;
  hash?: string; // Optional because it's added just before export
}
