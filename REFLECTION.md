# 🧠 REFLECTION.md

## 1. The hardest bug I hit this week, and how I debugged it

The hardest issue I encountered was inconsistent audit results caused by incorrect aggregation of tool pricing when multiple tools and seats were involved. Specifically, the total monthly savings calculation was sometimes lower than expected, even when individual recommendations clearly indicated higher savings.

Initially, I assumed the issue was with the pricing data itself, so I verified all values against official pricing pages. When that didn’t reveal the issue, I formed a second hypothesis: the problem might be in how I was summing per-tool savings. I added debug logs to trace intermediate values and discovered that in certain cases, I was overwriting savings values instead of accumulating them.

To confirm, I wrote small unit tests targeting edge cases like multiple tools with different seat counts. These tests failed, which validated the hypothesis. I refactored the aggregation logic to ensure all savings were summed correctly and added defensive checks to avoid silent overwrites.

What worked was breaking the problem into smaller verifiable units and writing targeted tests instead of guessing. This experience reinforced the importance of validating assumptions with data rather than relying on intuition.

---

## 2. A decision I reversed mid-week, and what made me reverse it

Initially, I planned to use an AI model to generate both the audit recommendations and the summary. The idea was to make the system more “intelligent” and flexible.

However, after implementing a basic version, I realized that the outputs were inconsistent and sometimes lacked clear, defensible reasoning. For example, the AI would recommend switching tools without considering exact pricing differences or team size constraints. This made the results unreliable and difficult to justify.

I reversed this decision and moved to a fully rule-based audit engine for all calculations and recommendations. AI was then limited only to generating the final summary.

The key factor behind this decision was the requirement that a finance-literate person should agree with the audit logic. Deterministic rules with clear pricing references made the system more trustworthy and explainable.

This change significantly improved both the quality and reliability of the output.

---

## 3. What I would build in week 2 if I had it

If I had an additional week, I would focus on making the product more insightful and closer to a real SaaS tool.

First, I would implement a benchmarking feature that compares a user’s AI spend per developer against industry averages. This would provide stronger context and make the audit more actionable.

Second, I would add a PDF export feature so users can download and share their reports with stakeholders. This is especially useful for founders or engineering managers presenting cost optimizations internally.

Third, I would improve the audit engine by incorporating usage-based recommendations instead of only plan-based comparisons. For example, suggesting API usage instead of subscriptions where appropriate.

Finally, I would invest in UI polish and micro-interactions to make the product feel more premium, as this directly impacts shareability and perceived value.

---

## 4. How I used AI tools

I used AI tools primarily for:

* Generating boilerplate code (React components, API routes)
* Debugging specific errors in FastAPI and frontend integration
* Structuring documentation files and improving clarity

I used them as assistants rather than relying on them for full solutions. For example, I did not trust AI for audit logic or pricing decisions, since these require precise and verifiable reasoning.

One instance where AI was wrong was during the audit engine implementation. It suggested a simplified logic that ignored seat-based pricing differences, which would have led to incorrect savings calculations. I caught this by manually reviewing the logic and testing with realistic scenarios.

This reinforced that AI is useful for speed, but not for critical decision-making logic. I treated AI outputs as drafts that needed verification rather than final answers.

---

## 5. Self-rating

**Discipline: 8/10**
I maintained consistent daily progress and structured my work across the week, though I could have started slightly earlier on documentation.

**Code Quality: 7.5/10**
The code is modular and readable, but there is room for improvement in test coverage and abstraction.

**Design Sense: 7/10**
The UI is clean and functional, but not highly polished. More time could improve visual hierarchy and micro-interactions.

**Problem Solving: 8.5/10**
I approached issues methodically, formed hypotheses, and validated them through testing rather than guessing.

**Entrepreneurial Thinking: 8/10**
I focused on building a realistic product with user value and lead generation in mind, though deeper market validation could improve this further.
