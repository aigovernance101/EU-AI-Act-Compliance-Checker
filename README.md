# 🇪🇺 EU AI Act Compliance Checker 2.0

An open-source interactive tool to help organizations determine their obligations under the **EU Artificial Intelligence Act (AI Act)**.

This project reimagines the EU’s official compliance checker with a **modern UX**, **dynamic logic engine**, and **educational guidance layer**—making regulatory compliance accessible to providers, deployers, distributors, and importers of AI systems.

---

## 🧠 Purpose

The EU AI Act introduces the world’s first comprehensive regulatory framework for artificial intelligence.  
This project translates complex legal requirements into an **intuitive wizard-style experience** that:

- Identifies whether your AI system is **in scope**.
- Determines if it qualifies as **high-risk**, **prohibited**, or **out of scope**.
- Maps your **obligations** by entity type (Provider, Deployer, Distributor, etc.).
- Generates a **traceable compliance report** (PDF + JSON) with references to the legal text.

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React 18 + TypeScript |
| **UI Library** | shadcn/ui + Tailwind + Radix UI |
| **State Management** | Zustand |
| **Routing** | React Router v6 |
| **i18n** | react-i18next |
| **Accessibility** | WCAG 2.2 AA + ARIA |
| **Testing** | Vitest + React Testing Library |
| **Build & Deploy** | Vite + Cloudflare Pages (or Vercel) |

---

## 🧩 Features

### 🧭 Interactive Wizard
- Role-based logic paths (Provider, Deployer, etc.)
- Dynamic branching based on prior answers
- Legal references linked to the **EU AI Act Articles & Annexes**

### 🧾 Compliance Reports
- Generates **structured outputs (JSON + PDF)**
- Includes timestamp, legal basis, and classification outcome
- Suitable for ISO/IEC 42001 and AI Governance workflows

### 🌍 Multilingual Support
- English, Spanish, and French (extendable)
- Plain-language explanations for non-legal users

### ♿ Accessibility & Ethics
- Keyboard and screen reader support
- High-contrast mode
- Disclaimer: “Results are informational; not legal advice.”

---

## 📁 Project Structure

```
src/
 ├── app/
 │   ├── layout.tsx
 │   ├── router.tsx
 │   ├── store/
 │   ├── i18n/
 ├── components/
 │   ├── Wizard.tsx
 │   ├── QuestionCard.tsx
 │   ├── SummaryView.tsx
 │   ├── ReportExport.tsx
 ├── data/
 │   ├── questions.schema.json
 │   ├── obligations.json
 │   └── mappings/
 ├── utils/
 │   ├── complianceLogic.ts
 │   ├── pdfGenerator.ts
 │   ├── jsonExporter.ts
 ├── pages/
 │   ├── Home.tsx
 │   ├── WizardPage.tsx
 │   ├── ResultsPage.tsx
 └── index.tsx
```

---

## 🛠️ Getting Started

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/eu-ai-act-compliance-checker.git
cd eu-ai-act-compliance-checker
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

### 5. Run Tests
```bash
npm run test
```

---

## 🧮 Configuration

### Environment Variables
| Variable | Description |
|-----------|-------------|
| `VITE_APP_VERSION` | Displayed in footer for version tracking |
| `VITE_ENABLE_ANALYTICS` | Enables anonymous usage analytics |
| `VITE_DEFAULT_LANGUAGE` | Default language (e.g., `en`) |

### Internationalization
Language files located under `src/app/i18n/`.  
To add a new language:
1. Copy `en.json` → `it.json`
2. Translate question and option text
3. Update `i18n.ts` configuration

---

## 🧰 Development Guidelines

- Follow **WCAG 2.2 AA** accessibility rules.
- Use **TypeScript strict mode** for type safety.
- Include **ARIA roles** for all form elements.
- Keep question logic in `questions.schema.json` (machine-readable format).
- Never hardcode regulatory text — use linked references.

---

## 🧾 Output Example

After completing the wizard, the user receives:

```json
{
  "timestamp": "2025-10-28T17:00:00Z",
  "entityType": "Provider",
  "classification": "HighRisk",
  "obligations": [
    "Article 16: Provider obligations",
    "Article 26: Deployer obligations"
  ],
  "references": ["Annex III, Article 6", "Recital 85"],
  "version": "2.0"
}
```

---

## 🛡️ Disclaimer

This tool is **for informational and educational purposes only**.  
It does **not constitute legal advice** and does not replace consultation with qualified legal professionals or national competent authorities.  
Use at your own responsibility.

---

## 🤝 Contributing

Pull requests are welcome!  
For major changes, please open an issue first to discuss what you’d like to change.

- Fork the repo  
- Create your feature branch: `git checkout -b feature/new-flow`
- Commit changes: `git commit -m "Add new high-risk path"`
- Push to branch: `git push origin feature/new-flow`
- Open a pull request

---

## 🧾 License

MIT License © 2025 — OpenAI Governance Community  
EU AI Act text and definitions © European Commission.

---

## 💬 Feedback

Have suggestions or found a bug?  
Open an issue or contact the maintainers through the repository’s Discussions tab.

---

## 🌐 Resources

- [Official EU AI Act Service Desk](https://ai-act-service-desk.ec.europa.eu/en/eu-ai-act-compliance-checker)  
- [EU AI Act Full Text (EUR-Lex)](https://eur-lex.europa.eu/eli/reg/2024/1689)  
- [ISO/IEC 42001:2023 – AI Management Systems](https://www.iso.org/standard/81230.html)

---

**Built for clarity. Designed for compliance.**
