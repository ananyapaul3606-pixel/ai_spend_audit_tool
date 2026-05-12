# 📊 METRICS.md

## 🎯 North Star Metric

**Number of high-quality audits completed (with savings identified)**

---

### ❓ Why this metric?

This product is not a daily-use app. Users typically run an audit:

* When reviewing costs
* When scaling their team
* When evaluating tools

So metrics like DAU/MAU are not meaningful.

Instead, the most important signal is:

👉 **How many users complete an audit and discover actionable savings**

This directly correlates with:

* User value delivered
* Lead quality for Credex
* Revenue potential

---

## 📈 Input Metrics (Drivers of North Star)

---

### 1. Audit Completion Rate

**Definition:**
Percentage of users who start the form and complete the audit

**Why it matters:**

* Indicates UX quality
* Shows whether users find the tool easy to use

**Target:**

> 60%+

---

### 2. Email Capture Rate

**Definition:**
Percentage of users who submit email after viewing results

**Why it matters:**

* Measures conversion from value → lead
* Indicates trust in the product

**Target:**

> 25–30%

---

### 3. High-Savings Rate

**Definition:**
Percentage of audits showing >$500/month savings

**Why it matters:**

* Identifies high-intent, high-value users
* Directly linked to Credex revenue opportunity

**Target:**

> 10–20%

---

## 🔍 What I Would Instrument First

To track these metrics, I would instrument:

### Events:

* `form_started`
* `form_completed`
* `audit_generated`
* `email_submitted`
* `report_shared`

---

### Additional Tracking:

* Time taken to complete audit
* Drop-off points in form
* Most selected tools

---

### Tools:

* PostHog / Mixpanel (for product analytics)
* Backend logging (FastAPI)

---

## ⚠️ Pivot Trigger

A pivot would be considered if:

👉 **Audit Completion Rate < 30% after initial traction**

This would indicate:

* Poor UX
* Confusing input process
* Lack of perceived value

---

### Other Warning Signals:

* Email capture rate < 10%
* Very low high-savings rate (<5%)
* Users not sharing results

---

## 📊 Secondary Metrics

* Share rate (viral loop indicator)
* Average savings per audit
* Conversion to consultation (backend metric)

---

## 🧠 Key Insight

This is not a “usage frequency” product.

Success is defined by:

👉 Delivering **high-impact insights in a single session**
👉 Converting that insight into **high-quality leads**

---

## 🚀 Final Thought

If users:

* Complete audits
* See meaningful savings
* Share results

Then the product is working — even if they don’t return frequently.
