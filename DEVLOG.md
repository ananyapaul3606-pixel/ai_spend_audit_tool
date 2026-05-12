# 📘 DEVLOG.md

## Day 1 — 2026-05-06

**Hours worked:** 5

**What I did:**

* Carefully read and broke down the full assignment requirements
* Defined product scope and MVP features
* Finalized tech stack (React + FastAPI + PostgreSQL)
* Initialized GitHub repository and project structure
* Started frontend setup using React + TypeScript
* Configured Tailwind CSS

**What I learned:**

* The assignment is more product-focused than coding-focused
* Importance of structuring work early to avoid rework later
* Tailwind setup nuances with React TypeScript

**Blockers / what I'm stuck on:**

* Deciding how detailed the audit logic should be for MVP
* Structuring pricing data in a scalable way

**Plan for tomorrow:**

* Complete backend setup (FastAPI + PostgreSQL)
* Define database schema
* Start building input form UI

---

## Day 2 — 2026-05-07

**Hours worked:** 6

**What I did:**

* Set up FastAPI backend
* Connected PostgreSQL database
* Created initial database schema (audits, leads)
* Built basic API structure
* Started input form UI (tool selection + plans)

**What I learned:**

* FastAPI async handling improves API responsiveness
* Importance of designing schema early for flexibility

**Blockers / what I'm stuck on:**

* Handling dynamic tool input cleanly in frontend
* Designing reusable form components

**Plan for tomorrow:**

* Complete input form with validation
* Implement localStorage persistence
* Start audit engine logic

---

## Day 3 — 2026-05-08

**Hours worked:** 7

**What I did:**

* Completed dynamic input form
* Added validation and error handling
* Implemented localStorage persistence
* Started audit engine logic (rule-based)
* Added initial pricing data structure

**What I learned:**

* Persisting form state significantly improves UX
* Rule-based logic is more reliable than AI for calculations

**Blockers / what I'm stuck on:**

* Defining “good” vs “bad” plan logic
* Handling edge cases like mixed tool usage

**Plan for tomorrow:**

* Complete audit engine logic
* Build results API
* Start results UI

---

## Day 4 — 2026-05-09

**Hours worked:** 6

**What I did:**

* Completed audit engine logic
* Implemented savings calculation (monthly + yearly)
* Built API endpoint for audit results
* Started results page UI
* Designed recommendation structure

**What I learned:**

* Clear reasoning in recommendations is more important than complexity
* Users need simple explanations, not technical jargon

**Blockers / what I'm stuck on:**

* Making results UI visually clear and shareable
* Structuring recommendation messages cleanly

**Plan for tomorrow:**

* Complete results page UI
* Integrate LLM summary generation
* Add fallback logic

---

## Day 5 — 2026-05-10

**Hours worked:** 7

**What I did:**

* Integrated NVIDIA LLM API for summary generation
* Implemented fallback summary logic
* Completed results UI (savings + breakdown)
* Built lead capture form
* Connected email sending via SMTP

**What I learned:**

* LLM responses can be inconsistent → fallback is critical
* Showing value before asking for email improves UX

**Blockers / what I'm stuck on:**

* Handling LLM response formatting
* Email delivery reliability

**Plan for tomorrow:**

* Implement shareable report URLs
* Store audit results in database
* Improve UI polish

---

## Day 6 — 2026-05-11

**Hours worked:** 5

**What I did:**

* Implemented unique audit ID generation
* Built public report endpoint
* Ensured personal data is removed from public view
* Added Open Graph metadata for sharing
* Started writing documentation files

**What I learned:**

* Shareability is key for product growth
* Data privacy considerations are important even in MVP

**Blockers / what I'm stuck on:**

* Designing clean share preview
* Structuring documentation clearly

**Plan for tomorrow:**

* Complete all documentation files
* Add tests for audit engine
* Setup CI pipeline
* Deploy frontend and backend

---

## Day 7 — 2026-05-12

**Hours worked:** 6

**What I did:**

* Wrote all required documentation files
* Added unit tests for audit engine
* Setup GitHub Actions CI
* Deployed frontend (Netlify) and backend (Railway)
* Performed end-to-end testing
* Fixed bugs in API responses and UI

**What I learned:**

* Deployment always reveals hidden issues
* Writing documentation helps clarify thinking
* Small UX improvements make a big difference

**Blockers / what I'm stuck on:**

* Minor deployment configuration issues (resolved)

**Plan for tomorrow:**

* Final review and submission
* Double-check all requirements
