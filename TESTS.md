# 🧪 TESTS.md

This document lists all automated tests written for the audit engine. These tests validate that the core business logic (cost optimization and savings calculation) behaves correctly across different scenarios.

---

## 🧰 Test Setup

**Framework:** pytest
**Location:** `backend/tests/`

### Run tests:

```bash id="run-tests"
pytest -v
```

---

## ✅ Test Cases

---

### 1. test_downgrade_plan_saves_money

**File:** `test_audit_engine.py`

**What it covers:**
Ensures that when a user is on a higher-tier plan with low usage, the system recommends downgrading and calculates correct savings.

**Input:**

```json id="t1-input"
{
  "tools": [
    {
      "name": "ChatGPT",
      "plan": "Team",
      "monthly_cost": 60,
      "seats": 2
    }
  ],
  "team_size": 2,
  "use_case": "coding"
}
```

**Expected Behavior:**

* Recommendation: downgrade to "Plus"
* Savings > 0
* Reason mentions overkill plan for small team

---

### 2. test_no_savings_for_optimal_plan

**File:** `test_audit_engine.py`

**What it covers:**
Validates that if the user is already on an optimal plan, the system does not fabricate savings.

**Input:**

```json id="t2-input"
{
  "tools": [
    {
      "name": "ChatGPT",
      "plan": "Plus",
      "monthly_cost": 20,
      "seats": 1
    }
  ],
  "team_size": 1,
  "use_case": "writing"
}
```

**Expected Behavior:**

* Savings = 0
* Recommendation: keep current plan
* Message: "You're spending well" or equivalent

---

### 3. test_alternative_tool_recommendation

**File:** `test_audit_engine.py`

**What it covers:**
Checks if the system suggests a cheaper alternative tool for similar use case.

**Input:**

```json id="t3-input"
{
  "tools": [
    {
      "name": "GitHub Copilot",
      "plan": "Business",
      "monthly_cost": 19,
      "seats": 5
    }
  ],
  "team_size": 5,
  "use_case": "coding"
}
```

**Expected Behavior:**

* Suggest alternative (e.g., Cursor or similar)
* Show cost difference
* Savings > 0

---

### 4. test_multiple_tools_aggregation

**File:** `test_audit_engine.py`

**What it covers:**
Ensures that savings across multiple tools are correctly aggregated.

**Input:**

```json id="t4-input"
{
  "tools": [
    {
      "name": "ChatGPT",
      "plan": "Team",
      "monthly_cost": 60,
      "seats": 3
    },
    {
      "name": "Claude",
      "plan": "Max",
      "monthly_cost": 100,
      "seats": 2
    }
  ],
  "team_size": 5,
  "use_case": "mixed"
}
```

**Expected Behavior:**

* Total savings = sum of individual savings
* No overwriting of values
* Annual savings correctly calculated

---

### 5. test_zero_tools_input

**File:** `test_audit_engine.py`

**What it covers:**
Validates behavior when user submits empty tool list.

**Input:**

```json id="t5-input"
{
  "tools": [],
  "team_size": 3,
  "use_case": "coding"
}
```

**Expected Behavior:**

* Return empty recommendations
* Savings = 0
* No crash / error

---

### 6. test_invalid_input_handling

**File:** `test_api.py`

**What it covers:**
Ensures API validation works for incorrect inputs.

**Input:**

```json id="t6-input"
{
  "tools": [
    {
      "name": "ChatGPT",
      "plan": null,
      "monthly_cost": -10,
      "seats": 0
    }
  ]
}
```

**Expected Behavior:**

* API returns 400 / validation error
* Clear error message

---

## 📌 Notes

* All tests are deterministic (no AI dependency)
* Focus is on audit engine logic
* Edge cases (empty input, invalid data) are covered
* Tests are designed to reflect real-world usage scenarios

---

## 🚀 Future Test Improvements

* Integration tests (API + DB)
* Load testing for audit endpoint
* Mock LLM API for summary testing
