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
