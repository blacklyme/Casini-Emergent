# Casini - Website Firmă Contabilitate Timișoara

## Original Problem Statement
Create a professional website for "Casini" accounting firm from Timișoara, Romania with:
- 20+ years of experience highlight
- Complete accounting, fiscal, ANAF representation, and legal consulting services
- Women-led firm emphasis
- Two fiscal calculators (Salary Brut-Net 2025 and Tax Comparator Micro/SRL/PFA)
- All Romanian certifications (CECCAR, Camera Consultanților Fiscali)
- Contact form
- Romanian language only

## User Personas
1. **Romanian SME Owners** - Need accounting services, tax optimization
2. **Entrepreneurs** - Choosing between Micro/SRL/PFA business structures
3. **Employees** - Calculating net salary from gross
4. **Companies in Timișoara** - Looking for local accounting firm

## Core Requirements (Static)
- Professional landing page design
- Contact: Str. Cozia 1b Timișoara, +40 722 123 456, casini2003@yahoo.com, L-V 8-18
- Services: Contabilitate, Consultanță Fiscală, Reprezentare ANAF, Consultanță Juridică, Înființare Firme, Salarizare
- Certifications: CECCAR, Camera Consultanților Fiscali, UNPIR, Baroul Timiș
- Salary Calculator with 2025 Romanian tax rates (CAS 25%, CASS 10%, Impozit 10%)
- Tax Comparator (Micro-întreprindere vs SRL vs PFA)

## What's Been Implemented (March 2026)
- [x] Hero section with 20+ years experience badge
- [x] Navigation with smooth scroll
- [x] Services section (6 service cards)
- [x] Certifications section (4 certifications)
- [x] Salary Calculator (brut-net) with API
- [x] Tax Comparator (Micro/SRL/PFA) with API
- [x] About section with Timișoara image
- [x] Contact form with backend storage
- [x] Footer with contact info
- [x] Mobile responsive design
- [x] Professional emerald/gold color scheme
- [x] Playfair Display + Manrope typography

## Tech Stack
- Frontend: React + Tailwind CSS + Shadcn UI
- Backend: FastAPI
- Database: MongoDB

## API Endpoints
- POST /api/calculator/salary - Salary calculation
- POST /api/calculator/tax-comparison - Tax comparison
- POST /api/contact - Contact form submission
- GET /api/contact - Retrieve contact messages (admin)

## Prioritized Backlog
### P0 - Done
- All core features implemented

### P1 - Next Phase
- Google Maps integration for location
- Newsletter subscription
- Blog/news section for fiscal updates

### P2 - Future
- Client portal with document upload
- Online appointment booking
- Multi-language support (English)
