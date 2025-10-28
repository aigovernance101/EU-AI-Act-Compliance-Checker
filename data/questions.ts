import type { Question, ComplianceReport, Classification, RiskLevel, Obligation } from '../types';

export const questions: Question[] = [
  {
    id: 'start',
    category: 'Entity',
    question: "What is your role in relation to the AI system?",
    options: [
      { label: "Provider (developing the AI system)", value: 'provider', next: 'scope_location' },
      { label: "Deployer (using the AI system)", value: 'deployer', next: 'scope_location' },
      { label: "Importer/Distributor", value: 'importer', next: 'scope_location' },
      { label: "Other", value: 'other', next: 'scope_location', hint: "This includes individuals, researchers, etc." },
    ],
  },
  {
    id: 'scope_location',
    category: 'Scope',
    question: "Is the AI system placed on the market, put into service, or used within the European Union?",
    options: [
      { label: "Yes", value: 'eu_market', next: 'system_purpose', legalReference: "Article 2(1)" },
      { label: "No", value: 'outside_eu', next: 'finish', hint: "The AI Act generally applies to systems affecting people within the EU." },
    ],
  },
  {
    id: 'system_purpose',
    category: 'Risk',
    question: "What is the primary purpose of the AI system?",
    options: [
        { label: "General purpose (e.g. large language models)", value: 'general_purpose', next: 'function_type', legalReference: "Article 3(1)" },
        { label: "Biometric identification or categorization", value: 'biometrics', next: 'finish', hint: "Includes systems for facial recognition in public spaces." },
        { label: "Critical infrastructure management", value: 'critical_infra', next: 'finish', hint: "e.g., water, gas, and electricity supply." },
        { label: "Education, employment, or access to services", value: 'essential_services', next: 'finish', legalReference: "Annex III" },
        { label: "None of the above", value: 'other_purpose', next: 'function_type' },
    ]
  },
  {
    id: 'function_type',
    category: 'Risk',
    question: "Does the AI system perform any of the following functions?",
    options: [
        { label: "Social scoring of natural persons", value: 'social_scoring', next: 'finish', legalReference: "Article 5(1)(c)" },
        { label: "Manipulative techniques to distort behavior", value: 'manipulative', next: 'finish', legalReference: "Article 5(1)(a)" },
        { label: "Exploiting vulnerabilities of a specific group", value: 'exploitative', next: 'finish', legalReference: "Article 5(1)(b)" },
        { label: "None of the above", value: 'none_prohibited', next: 'finish' }
    ]
  }
];

const questionMap = new Map<string, Question>(questions.map(q => [q.id, q]));

export const getQuestionById = (id: string): Question | undefined => {
    return questionMap.get(id);
}


export const evaluateCompliance = (answers: Record<string, string>): ComplianceReport => {
  let classification: Classification = 'Minimal-Risk';
  let obligations: Obligation[] = [];
  let references: string[] = [];
  let summary = '';
  let risk_score = 0;
  let risk_level: RiskLevel = 'N/A';

  const reportBase = {
      timestamp: new Date().toISOString(),
      version: '2.0',
      system_id: `AI-Model-${new Date().getFullYear()}-001`,
      owner: "Data Protection Office",
      notes: "Initial automated assessment. Manual review and status updates required for obligations.",
  };

  // Rule 1: Out of Scope
  if (answers['scope_location'] === 'outside_eu') {
    return {
      ...reportBase,
      classification: 'Out-of-Scope',
      risk_score: 0,
      risk_level: 'N/A',
      summary: "Based on your answers, the AI system appears to be outside the territorial scope of the EU AI Act.",
      obligations: [],
      references: ['Article 2'],
    };
  }

  // Rule 2: Prohibited Systems
  const prohibitedAnswer = answers['function_type'];
  if (prohibitedAnswer === 'social_scoring' || prohibitedAnswer === 'manipulative' || prohibitedAnswer === 'exploitative') {
    classification = 'Prohibited';
    risk_score = 95;
    risk_level = 'High';
    summary = "The described function is likely considered a prohibited practice under the AI Act. These systems are banned from the EU market.";
    obligations = [{ name: "Cease development and deployment in the EU.", status: 'not-started' }];
    references = ['Article 5'];
    return { ...reportBase, classification, risk_score, risk_level, summary, obligations, references };
  }

  // Rule 3: High-Risk Systems
  const highRiskPurpose = answers['system_purpose'];
  if (highRiskPurpose === 'biometrics' || highRiskPurpose === 'critical_infra' || highRiskPurpose === 'essential_services') {
    classification = 'High-Risk';
    risk_score = 82;
    risk_level = 'High';
    summary = "The system falls into a category listed in Annex III, classifying it as High-Risk. This imposes significant compliance obligations.";
    obligations = [
        { name: "Establish a risk management system (Article 9)", status: 'not-started' },
        { name: "Ensure data quality and governance (Article 10)", status: 'not-started' },
        { name: "Maintain technical documentation (Article 11)", status: 'not-started' },
        { name: "Implement record-keeping/logging (Article 12)", status: 'not-started' },
        { name: "Ensure transparency and provide instructions for use (Article 13)", status: 'not-started' },
        { name: "Implement human oversight measures (Article 14)", status: 'not-started' },
        { name: "Ensure accuracy, robustness, and cybersecurity (Article 15)", status: 'not-started' },
    ];
    references = ['Annex III', 'Article 6'];
     return { ...reportBase, classification, risk_score, risk_level, summary, obligations, references };
  }

  // Rule 4: In-Scope but not high-risk or prohibited yet
  if (answers['scope_location'] === 'eu_market') {
     classification = 'In-Scope';
     risk_score = 45;
     risk_level = 'Medium';
     summary = "The system is within the scope of the AI Act but does not appear to be high-risk or prohibited based on the information provided. Transparency obligations may still apply.";
     obligations = [
        { name: "Ensure users are aware they are interacting with an AI system (Article 52).", status: 'not-started' },
        { name: "Consider adopting codes of conduct for non-high-risk AI.", status: 'not-started' }
    ];
     references = ['Article 52'];
     return { ...reportBase, classification, risk_score, risk_level, summary, obligations, references };
  }

  // Default Fallback: Minimal Risk
  return {
    ...reportBase,
    classification: 'Minimal-Risk',
    risk_score: 10,
    risk_level: 'Low',
    summary: "Based on your answers, the system appears to pose minimal or no risk. While direct obligations are limited, voluntary adherence to codes of conduct is encouraged.",
    obligations: [{ name: "Voluntary adoption of codes of conduct.", status: 'not-started' }],
    references: ['Recital 78'],
  };
};