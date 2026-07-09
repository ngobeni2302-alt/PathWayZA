# PathwayZA — Career Guidance Hub

PathwayZA is the central platform of a digital student ecosystem, designed by **Ntsako Ngobeni** ([pathway.co.za](https://pathway.co.za)). It helps primary, high school, and college students in South Africa map their school subjects and personal interests to real, relevant, and high-demand career paths. 

The platform treats all qualification routes — including university degrees, TVET college diplomas, apprenticeships, learnerships, and internships — with equal weight, backed by South African job market data, salary benchmarks, funding diagnostics, and AI-powered career scoring.

---

## 🌟 Core Features

1. **AI-Powered Subject-to-Career Matcher**: Computes real-time career suitability scores based on Grade 10–12 subject selections and interest profiles, respecting South African university admission constraints (e.g., Pure Mathematics vs. Math Literacy).
2. **South African Career Explorer**: Displays a searchable, filterable database of 20+ major local careers with live market demand statuses, average salaries, and minimum academic qualifications.
3. **NSFAS & Funding Finder**: Features an interactive household income diagnostic tool to check provisional NSFAS eligibility, alongside a filterable database of corporate and SETA bursaries.
4. **Artisan & Work-Based Opportunities**: Lists apprenticeships, learnerships, and graduate internships to support practical, direct-to-work pathways.
5. **5-10 Year Career Trend Forecasting**: Visualizes local sector growth projections (Tech, Green Energy, Health, Finance, Engineering) using interactive **Chart.js** line graphs and economic insights.
6. **Recognition of Prior Learning (RPL) TVET Bridge**: Visualizes step-by-step academic credit articulation pathways from TVET N4–N6 courses to university BTech/Advanced Diplomas.
7. **Course & Accreditation Validator**: Scans institution profiles against a simulated DHET/SAQA database of all **26 public universities**, **50 public TVET colleges**, and known bogus/unaccredited academies to safeguard students.
8. **Claude Career AI Assistant**: Provides simulated, highly contextualized advice regarding study roadmaps and bursaries, powered by a customized Claude 3.5 Sonnet response system.
9. **Single Sign-On (SSO) Profile Exchange**: Simulates JWT-based profile integration across the ecosystem (connecting PathwayZA directly with the *Certification Hub* and *Job Board*).

---

## 🛠️ Technology Stack

- **Structure**: Semantic HTML5
- **Styling**: Vanilla CSS3 (Custom design system featuring CSS Grid, Flexbox, glassmorphic card overlays, neon accent glow elements, and micro-animations)
- **Logic**: Vanilla ES6+ JavaScript
- **Visuals**: Chart.js (via CDN) for responsive vector graph rendering

---

## 🚀 How to Open and Run

The application is powered by a modern **React frontend** built with **Vite** for incredibly fast local development and instant hot module replacement.

### Setup and Running Locally

1. Open your terminal in the root project folder:
   ```bash
   cd /path/to/PathWayZA
   ```
2. Install the required Node.js dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server (bound to `0.0.0.0` for local network access):
   ```bash
   npm run dev -- --host 0.0.0.0
   ```
4. Open your browser and navigate to the Local or Network URL provided in the terminal (usually `http://localhost:5173`).

---

## 🔗 Role in the Ecosystem

PathwayZA serves as the primary entry point for students. Once a matching career pathway is established:
- **SSO Profile**: The student's subject list and grade level are encoded into a secure local token.
- **Outward Routing**: The dashboard exports this token to the **Certification Hub** (to close specific skill gaps) and the **Job Board** (to apply for entry-level vacancies) using a single, unified sign-on.