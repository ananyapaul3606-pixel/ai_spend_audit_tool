# 🗣️ USER_INTERVIEWS.md

This document summarizes three user interviews conducted with individuals who actively use AI tools in their workflows. Each conversation lasted approximately 10–15 minutes.

---

## 👤 Interview 1

**Name:** A.R.
**Role:** Indie Hacker (Solo SaaS Builder)
**Company Stage:** Pre-revenue side project

---

### 💬 Direct Quotes

> “I’m probably overpaying, but I don’t know what to compare against.”

> “I use ChatGPT Plus and Copilot, but I haven’t really thought about whether I need both.”

> “Switching tools feels risky—I don’t want to lose productivity just to save a few dollars.”

---

### 😮 Most Surprising Insight

The user was **aware of potential overspending**, but had **no mental model or benchmark** to evaluate whether their spending was reasonable.

---

### 🔄 What it changed in my design

* Added **clear reasoning for each recommendation** instead of just showing savings
* Avoided aggressive “switch tool” suggestions without justification
* Focused on trust-building explanations rather than just numbers

---

## 👤 Interview 2

**Name:** S.K.
**Role:** Engineering Team Lead
**Company Stage:** Early-stage startup (~12 employees)

---

### 💬 Direct Quotes

> “We upgraded to team plans just because collaboration sounded useful.”

> “Honestly, we didn’t calculate whether it’s worth it for our team size.”

> “If you can show me how much we’re wasting in a simple way, I’d definitely use that.”

---

### 😮 Most Surprising Insight

Decisions about upgrading plans were often made **based on perceived value, not actual usage or cost analysis**.

---

### 🔄 What it changed in my design

* Added logic to detect **over-provisioned plans (e.g., team plan for small teams)**
* Highlighted **monthly + annual savings clearly in the UI**
* Simplified output to make it easy for non-technical stakeholders

---

## 👤 Interview 3

**Name:** R.M.
**Role:** Freelance Developer
**Company Stage:** Individual contributor

---

### 💬 Direct Quotes

> “I try different AI tools all the time, but I don’t track how much I’m spending in total.”

> “Subscriptions feel small individually, but together it adds up.”

> “If I could see everything in one place, that would be useful.”

---

### 😮 Most Surprising Insight

The user didn’t perceive spending as a problem because **costs were fragmented across multiple tools**.

---

### 🔄 What it changed in my design

* Designed the tool to **aggregate all AI spend into one view**
* Emphasized **total savings (monthly + yearly)** prominently
* Added support for multiple tools in the input form

---

## 🧠 Key Learnings Across Interviews

1. **Lack of visibility is the core problem**
   Users don’t track total AI spending across tools

2. **Trust matters more than savings**
   Users need clear reasoning before changing tools or plans

3. **Small costs accumulate silently**
   Individual subscriptions seem cheap, but total spend is significant

4. **Simple insights > complex analysis**
   Users prefer clear, actionable recommendations over detailed breakdowns

---

## 📌 Final Insight

The biggest takeaway:

👉 Users are not actively trying to optimize AI spend
👉 But once shown clear savings, they are highly interested

This validates the core idea of the product:
**Make hidden inefficiencies visible, then guide action.**
