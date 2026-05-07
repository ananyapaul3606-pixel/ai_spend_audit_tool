# 🤖 PROMPTS.md

This document contains all prompts used for the AI-generated summary feature, along with the thinking behind how they evolved over time.

---

## 📌 Why AI Is Used in This Project

AI is used only to generate a short, personalized summary of the audit results.

It does **not** handle:

* Pricing calculations
* Audit logic
* Savings recommendations

Those parts stay fully rule-based to keep the results accurate, predictable, and easy to verify.

The AI’s job is simply to turn the audit data into a clear summary that feels natural and helpful for the user.

---

## 🧠 Final Prompt (Production)

```text id="final-prompt"
You are a financial analyst helping a startup reduce unnecessary AI software costs.

Using the audit data below, write a short and professional summary (80–120 words).

Focus on:
- Where the company may be overspending
- Estimated monthly and yearly savings
- Simple optimization ideas like downgrading plans or switching tools
- Being realistic and honest if the current setup already looks efficient

Keep the writing:
- Clear and conversational
- Professional but natural
- Easy for a startup founder to understand

Avoid:
- Technical jargon
- Repeating too many numbers
- Making assumptions not supported by the data

Audit Data:
{{audit_data}}

Write the final summary in a confident, human tone.
```

---

## 🧪 Prompt Iterations & What We Learned

---

### ❌ Version 1 (Rejected)

```text id="v1-prompt"
Analyze this AI tool usage and suggest improvements:
{{audit_data}}
```

**What went wrong:**

* The prompt was too open-ended
* Responses were inconsistent
* The AI sometimes invented recommendations that were not supported by the data

---

### ❌ Version 2 (Rejected)

```text id="v2-prompt"
Act as an AI expert and optimize this usage:
{{audit_data}}
```

**What went wrong:**

* Responses felt generic and robotic
* The financial side was often ignored
* The AI focused more on product features than actual savings

---

### ✅ Version 3 (Improved)

What changed:

* Added a clear role (“financial analyst”)
* Introduced structure and constraints
* Defined tone and audience

**Result:**
The summaries became more focused, relevant, and useful.

---

### ✅ Final Version (Production)

Final improvements included:

* Word limit for consistency
* Clear tone guidance
* Instructions to avoid repetition
* Emphasis on honest, data-backed summaries

**Result:**

* More natural and readable summaries
* Better alignment with the product’s purpose
* Consistent output quality across different audit cases

---

## ⚙️ Input Structure

The `{{audit_data}}` passed into the model is structured JSON like this:

```json id="input-structure"
{
  "total_monthly_savings": 120,
  "total_annual_savings": 1440,
  "tools": [
    {
      "name": "ChatGPT",
      "current_cost": 60,
      "recommended_cost": 20,
      "savings": 40,
      "reason": "Team plan overkill for 2 users"
    }
  ]
}
```

This structure helps keep the summaries grounded in real audit data instead of vague assumptions.

---

## 🔄 Fallback Strategy

LLM responses are not always reliable.
To keep the experience stable, a fallback summary is used when:

* The API request fails
* The response is empty
* The output format is invalid

---

### 🛟 Fallback Template

```text id="fallback"
Your current AI software setup may have opportunities to reduce costs by around ${{monthly}} per month and ${{yearly}} per year.

Some tools appear to be more expensive than necessary for the current team size or usage. Reviewing plan tiers or exploring lower-cost alternatives could help improve efficiency without affecting productivity.

Overall, only a few targeted adjustments may be needed to optimize spending.
```

---

## ⚠️ Challenges Faced

### 1. Inconsistent tone

Early summaries sounded too robotic or overly formal.

**Fix:**
Defined a specific role, audience, and writing style.

---

### 2. Hallucinated recommendations

The AI sometimes suggested things not present in the audit data.

**Fix:**
Restricted AI to summarization only while keeping all logic deterministic.

---

### 3. Overly long responses

Some outputs became too detailed and repetitive.

**Fix:**
Added strict word limits and clearer instructions.

---

### 4. Formatting inconsistencies

Outputs occasionally included unnecessary formatting or awkward spacing.

**Fix:**
Added post-processing steps like trimming and validation.

---

## 🧠 Key Learnings

* AI performs better with clear structure and constraints
* Financial logic should remain deterministic and rule-based
* Small prompt changes can significantly improve output quality
* Reliability matters just as much as creativity in production systems
* Fallbacks are essential for a smooth user experience
