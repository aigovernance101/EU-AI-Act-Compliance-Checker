# EU AI Act Compliance Checker

This is an interactive web application designed to help developers, deployers, and other stakeholders navigate the complexities of the European Union's AI Act. Through a guided questionnaire, this tool provides a preliminary assessment of an AI system's potential risk classification and highlights key obligations under the new regulation.

## Scope of the Project

The primary goal of this project is to offer a user-friendly, educational tool that demystifies the EU AI Act. Key features include:

- **Guided Assessment:** A step-by-step questionnaire that adapts based on user input.
- **Risk Classification:** Determines a preliminary classification for an AI system (e.g., Prohibited, High-Risk, In-Scope, Out-of-Scope).
- **Obligation Identification:** Lists potential compliance obligations based on the risk level.
- **Report Generation:** Allows users to export their assessment results as a PDF or JSON file for record-keeping.
- **Multi-language Support:** The interface is available in English, Spanish, and French.

**Disclaimer:** This tool is for informational and educational purposes only and does not constitute legal advice. You should always consult with a qualified legal professional for specific compliance matters.

## Tech Stack

This project is built with a modern, robust, and scalable tech stack:

- **Frontend Framework:** [React](https://reactjs.org/) with TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for a utility-first design system.
- **PDF Generation:** [jsPDF](https://github.com/parallax/jsPDF) with [jspdf-autotable](https://github.com/simonbengtsson/jsPDF-AutoTable) for creating client-side PDF reports.
- **Internationalization (i18n):** [i18next](https://www.i18next.com/) and [react-i18next](https://react.i18next.com/) for multi-language support.
- **Security:** Uses the Web Crypto API (`crypto.subtle`) for generating a SHA-256 hash to ensure report integrity.

## Author

This tool was created by **Nico Roddz**.

- **LinkedIn:** [linkedin.com/in/nicoroddz](https://www.linkedin.com/in/nicoroddz/)
- **Website:** For more resources on AI Governance, visit [AI Governance 101](https://www.aigovernance101.com).

## License

This project is licensed under the MIT License.

---

**MIT License**

Copyright (c) 2024 Nico Roddz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
