# Casini — Contabilitate Profesională

Professional accounting website for **Casini** — a CECCAR-authorized accounting firm based in Timișoara, Romania with 20+ years of experience.

**Live:** [https://casini.ro](https://casini.ro)

---

## Project Structure

```
casini/
├── frontend/              React (CRA + Craco) single-page application
│   ├── src/
│   │   ├── App.js         All pages and components (single-file architecture)
│   │   ├── App.css        Global styles + custom CSS
│   │   ├── components/ui/ shadcn/ui component library (Radix UI + Tailwind)
│   │   ├── hooks/         Custom React hooks (use-toast)
│   │   ├── lib/utils.js   cn() utility (clsx + tailwind-merge)
│   │   └── index.js       Entry point (React 19 + HelmetProvider)
│   ├── public/            Static assets, sitemap.xml, robots.txt, 404.html
│   ├── plugins/           Health check webpack plugin (dev only)
│   ├── craco.config.js    Webpack aliases (@/), ESLint, visual edits
│   ├── tailwind.config.js Tailwind CSS + shadcn/ui theme tokens
│   ├── postcss.config.js  PostCSS + Tailwind + Autoprefixer
│   └── package.json       Dependencies and scripts
├── backend/               FastAPI Python backend (contact form + calculators)
│   ├── server.py          API server (MongoDB, CORS, Pydantic models)
│   └── requirements.txt   Python dependencies
├── tests/                 Test suites
├── test_reports/          Test results
└── design_guidelines.json Brand identity, typography, and color system
```

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| React Router 7 | Client-side routing |
| Craco | CRA configuration override (webpack aliases, ESLint) |
| Tailwind CSS | Utility-first styling |
| shadcn/ui (Radix UI) | Component library (40+ components) |
| Lucide React | Icon system |
| Recharts | Chart visualizations (calculators) |
| react-helmet-async | SEO meta tags per page |
| Sonner | Toast notifications |
| Axios | HTTP client (API calls) |
| Zod + React Hook Form | Form validation |

### Backend
| Technology | Purpose |
|---|---|
| FastAPI | Python API framework |
| Motor | Async MongoDB driver |
| Pydantic | Data validation and serialization |
| MongoDB | Database (contact messages, status checks) |

---

## Pages & Routes

| Route | Component | Description |
|---|---|---|
| `/` | `Home` | Landing page with all sections |
| `/calculator-salariu` | `SalaryCalculatorPage` | Net salary calculator (Romanian tax rates 2025) |
| `/comparator-taxe` | `TaxComparatorPage` | Micro vs SRL vs PFA tax comparison |
| `/intrebari-frecvente` | `FAQPage` | Frequently asked questions |
| `/politica-confidentialitate` | `PrivacyPolicyPage` | Privacy policy (GDPR) |
| `/termeni-si-conditii` | `TermsPage` | Terms and conditions |
| `*` | `NotFoundPage` | 404 page |

### Home Page Sections
- **Navigation** — Fixed header with scroll effect, mobile hamburger menu, calculator dropdown
- **HeroSection** — Main headline, CTA buttons, stats (20+ years, 500+ clients, 100% dedication)
- **ServicesSection** — Accounting services grid (contabilitate, fiscalitate, juridic, salarizare)
- **CertificationsSection** — CECCAR authorization and professional certifications
- **CalculatorsSection** — Interactive salary calculator and tax comparator previews
- **AboutSection** — Company story, values, and team
- **ContactSection** — Contact form (name, email, phone, company, service, message) + map + info
- **Footer** — Links, contact info, legal pages

---

## API Endpoints

Base URL: configured via `REACT_APP_BACKEND_URL` environment variable.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/` | Health check |
| `POST` | `/api/contact` | Submit contact form message |
| `GET` | `/api/contact` | List all contact messages (admin) |
| `POST` | `/api/calculator/salary` | Calculate net salary from gross |
| `POST` | `/api/calculator/tax-comparison` | Compare Micro vs SRL vs PFA taxes |
| `POST` | `/api/status` | Create status check |
| `GET` | `/api/status` | List status checks |

### Salary Calculator
Romanian 2025 tax rates applied:
- **CAS** (pension): 25% of gross
- **CASS** (health): 10% of gross
- **Income tax**: 10% of taxable income (after CAS + CASS)
- **Employer CAM**: 2.25% of gross

### Tax Comparator
Compares three business structures:
- **Micro-întreprindere**: 1% (with employees) or 3% (without) on revenue
- **SRL**: 16% profit tax + 8% dividend tax
- **PFA**: 10% income tax + CAS (25%) + CASS (10%) on normalized income

---

## Design System

Defined in `design_guidelines.json`.

### Brand Colors
| Token | Value | Usage |
|---|---|---|
| Primary | `#134e4a` | Deep Emerald/Teal — headers, buttons, links |
| Secondary | `#d97706` | Amber/Gold — accents, highlights, icons |
| Background | `#fafaf9` | Warm Stone/Alabaster — page background |
| Surface | `#ffffff` | Cards, input fields |
| Text Primary | `#1c1917` | Main body text |
| Text Secondary | `#57534e` | Muted text |

### Typography
| Role | Font | Usage |
|---|---|---|
| Headings | Playfair Display (serif) | H1–H3, conveys tradition and elegance |
| Body | Manrope (sans-serif) | Body text, UI elements, data tables |
| Mono | JetBrains Mono | Numerical data in calculators |

### Theme
- Light mode by default (warm, professional feel)
- shadcn/ui CSS variable theming via `tailwind.config.js`
- "Jewel & Luxury" archetype adapted for professional services

---

## Development

### Prerequisites
- Node.js 18+
- Yarn
- Python 3.11+ (for backend)
- MongoDB instance (for backend)

### Frontend Setup
```bash
cd frontend
yarn install
yarn start          # Starts dev server on http://localhost:3000
```

### Backend Setup
```bash
cd backend
pip install -r requirements.txt

# Required environment variables:
export MONGO_URL="mongodb://..."
export DB_NAME="casini"
export CORS_ORIGINS="http://localhost:3000"

uvicorn server:app --reload --port 8000
```

### Frontend Environment Variables
| Variable | Description | Default |
|---|---|---|
| `REACT_APP_BACKEND_URL` | Backend API base URL | `""` (empty = same origin) |
| `ENABLE_HEALTH_CHECK` | Enable webpack health check plugin | `"false"` |
| `PUBLIC_URL` | Base path for routing | `""` |

### Build
```bash
cd frontend
yarn build          # Outputs to frontend/build/
```

---

## Deployment

### Hosting
- **Frontend**: Vercel (auto-deploys from GitHub on push to `main`)
- **Backend**: Not currently deployed on Vercel (requires separate hosting with MongoDB)
- **Domain**: casini.ro (registered at Zooku Solutions SRL)

### Vercel Configuration
- **Project**: `blacklymes-projects/frontend`
- **GitHub Repo**: `blacklyme/Casini-Emergent`
- **Build Command**: `craco build` (auto-detected from `package.json`)
- **Output Directory**: `build`
- **Framework**: Create React App

### Domain Setup
| Domain | Target |
|---|---|
| `casini.ro` | Vercel (A record → `76.76.21.21`) |
| `www.casini.ro` | Vercel (CNAME → `cname.vercel-dns.com`) |

**DNS**: Nameservers pointed to Vercel (`ns1.vercel-dns.com`, `ns2.vercel-dns.com`) via Zooku.ro domain registrar. Vercel handles SSL certificates automatically.

### Deployment Flow
```
git push origin main → Vercel auto-build → Production at casini.ro
```

---

## Contact Information (Hardcoded)

| Field | Value |
|---|---|
| Address | Str. Cozia 1b, Timișoara |
| Phone | +40 722 123 456 |
| Email | casini2003@yahoo.com |
| Hours | L-V: 8-18 \| Urgențe: 24/7 |

---

## Key Dependencies

### Frontend (package.json)
```
react@19             react-router-dom@7       @craco/craco@7
tailwindcss          tailwindcss-animate      postcss + autoprefixer
@radix-ui/*          lucide-react             recharts@3
react-helmet-async   sonner                   axios
zod                  react-hook-form          @hookform/resolvers
```

### Backend (requirements.txt)
```
fastapi              uvicorn                  motor (async MongoDB)
pydantic             python-dotenv
```

---

## Notes

- The entire frontend is a single-file architecture (`App.js` — 1924 lines) containing all pages and components. Future refactoring could extract these into separate files.
- Calculator logic runs client-side (frontend) with optional server-side validation via the backend API.
- The `@emergentbase/visual-edits` dev dependency enables visual editing in development mode only.
- Cookie consent banner (`CookieConsent` component) is included for GDPR compliance.
- SEO: Each page uses `react-helmet-async` for meta tags. `sitemap.xml` and `robots.txt` are in `public/`.
