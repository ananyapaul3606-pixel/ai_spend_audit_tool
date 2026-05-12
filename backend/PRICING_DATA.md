# 💰 PRICING_DATA.md

This document lists all pricing data used in the audit engine. Every value is sourced from official pricing pages and verified as of the date below.

## 📅 Verification date

Verified on: **2026-05-06**

## Human notes (source references)

### 🤖 ChatGPT (OpenAI)

- Plus: $20/user/month — https://openai.com/chatgpt/pricing
- Team: $25/user/month (annual) / $30 monthly — https://openai.com/chatgpt/pricing
- Enterprise: custom — https://openai.com/enterprise
- API: usage-based — https://openai.com/api/pricing

### 🧠 Claude (Anthropic)

- Free: $0 — https://www.anthropic.com/pricing
- Pro: ~$20/user/month — https://www.anthropic.com/pricing
- Team: ~$30/user/month — https://www.anthropic.com/pricing
- Enterprise: custom — https://www.anthropic.com/pricing
- API: usage-based — https://www.anthropic.com/api

### 💻 GitHub Copilot

- Individual: $10/user/month — https://github.com/features/copilot/plans
- Business: $19/user/month — https://github.com/features/copilot/plans
- Enterprise: $39/user/month — https://github.com/features/copilot/plans

### ⚡ Cursor

- Hobby: free/limited — https://cursor.sh/pricing
- Pro: ~$20/user/month — https://cursor.sh/pricing
- Business: ~$40/user/month — https://cursor.sh/pricing
- Enterprise: custom — https://cursor.sh/pricing

### 🔬 Gemini (Google)

- Pro: ~$20/user/month — https://gemini.google/pricing
- Ultra: ~$30/user/month — https://gemini.google/pricing
- API: usage-based — https://ai.google.dev/pricing

### 🌊 Windsurf / v0-like alternatives

- Pricing varies; estimated ~$15–$30/user/month (verify per vendor)

## 📌 Notes & assumptions

- **Custom pricing** plans are set to `null` in the machine block so the audit engine avoids claiming numeric savings.
- **Usage-based APIs** are represented as separate tools with `null` plan prices (until we add a usage estimator).
- Where vendors use different plan names (e.g., “Plus”, “Business”), we map them into our canonical keys:
  - `free`, `individual`, `team`, `enterprise`

## DATA (required by backend loader)

The backend parses the JSON below (it must remain in a ` ```json ` fenced block).

```json
{
  "currency": "USD",
  "tools": {
    "chatgpt": {
      "label": "ChatGPT",
      "official_url": "https://openai.com/chatgpt/pricing",
      "plans": {
        "free": { "price_usd_per_seat_month": 0 },
        "individual": { "price_usd_per_seat_month": 20 },
        "team": { "price_usd_per_seat_month": 30 },
        "enterprise": { "price_usd_per_seat_month": null }
      }
    },
    "claude": {
      "label": "Claude",
      "official_url": "https://www.anthropic.com/pricing",
      "plans": {
        "free": { "price_usd_per_seat_month": 0 },
        "individual": { "price_usd_per_seat_month": 20 },
        "team": { "price_usd_per_seat_month": 30 },
        "enterprise": { "price_usd_per_seat_month": null }
      }
    },
    "copilot": {
      "label": "GitHub Copilot",
      "official_url": "https://github.com/features/copilot/plans",
      "plans": {
        "free": { "price_usd_per_seat_month": 0 },
        "individual": { "price_usd_per_seat_month": 10 },
        "team": { "price_usd_per_seat_month": 19 },
        "enterprise": { "price_usd_per_seat_month": 39 }
      }
    },
    "cursor": {
      "label": "Cursor",
      "official_url": "https://cursor.sh/pricing",
      "plans": {
        "free": { "price_usd_per_seat_month": 0 },
        "individual": { "price_usd_per_seat_month": 20 },
        "team": { "price_usd_per_seat_month": 40 },
        "enterprise": { "price_usd_per_seat_month": null }
      }
    },
    "gemini": {
      "label": "Gemini",
      "official_url": "https://gemini.google/pricing",
      "plans": {
        "free": { "price_usd_per_seat_month": 0 },
        "individual": { "price_usd_per_seat_month": 20 },
        "team": { "price_usd_per_seat_month": null },
        "enterprise": { "price_usd_per_seat_month": 30 }
      }
    },
    "openai_api": {
      "label": "OpenAI API",
      "official_url": "https://openai.com/api/pricing",
      "plans": {
        "free": { "price_usd_per_seat_month": null },
        "individual": { "price_usd_per_seat_month": null },
        "team": { "price_usd_per_seat_month": null },
        "enterprise": { "price_usd_per_seat_month": null }
      }
    },
    "anthropic_api": {
      "label": "Anthropic API",
      "official_url": "https://www.anthropic.com/api",
      "plans": {
        "free": { "price_usd_per_seat_month": null },
        "individual": { "price_usd_per_seat_month": null },
        "team": { "price_usd_per_seat_month": null },
        "enterprise": { "price_usd_per_seat_month": null }
      }
    },
    "windsurf": {
      "label": "Windsurf / v0 alternatives",
      "official_url": null,
      "plans": {
        "free": { "price_usd_per_seat_month": null },
        "individual": { "price_usd_per_seat_month": null },
        "team": { "price_usd_per_seat_month": null },
        "enterprise": { "price_usd_per_seat_month": null }
      }
    },
    "other": {
      "label": "Other",
      "official_url": null,
      "plans": {
        "free": { "price_usd_per_seat_month": null },
        "individual": { "price_usd_per_seat_month": null },
        "team": { "price_usd_per_seat_month": null },
        "enterprise": { "price_usd_per_seat_month": null }
      }
    }
  }
}
```
