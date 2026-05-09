# Scenario B: Urgency vs. Efficiency

## 1. Objective
To demonstrate the conflict between process priority and burst time, showing how the algorithms make different decisions.

## 2. Description
P1 has a very high priority but a long execution time. The other processes have low priorities but very short execution times.

## 3. Input Data

| PID | Arrival Time | Burst Time | Priority |
|-----|-------------|------------|----------|
| P1  | 0           | 10         | 1        |
| P2  | 1           | 2          | 5        |
| P3  | 2           | 3          | 4        |
| P4  | 3           | 1          | 3        |
| P5  | 4           | 4          | 2        |

## 4. SJF (Preemptive) Results
**Timeline:**
- **0–1:** P1 runs.
- **1–3:** P2 arrives (BT=2). P2 preempts P1 and finishes.
- **3–4:** P4 arrives (BT=1). P4 preempts and finishes.
- **4–7:** P3 is shortest (BT=3). P3 finishes.
- **7–11:** P5 is shortest (BT=4). P5 finishes.
- **11–20:** P1 resumes and finishes its remaining 9 units.

**Averages:** WT = 3.00 | TAT = 7.00 | RT = 1.00

## 5. SJF (Non-Preemptive) Results
**Timeline:**
- **0–10:** P1 runs completely because it was the only process at start.
- **10–11:** P4 (shortest) finishes.
- **11–13:** P2 finishes.
- **13–16:** P3 finishes.
- **16–20:** P5 finishes.

**Averages:** WT = 8.00 | TAT = 12.00 | RT = 8.00

## 6. Priority Scheduling (Preemptive) Results
**Timeline:**
- **0–10:** P1 runs completely because it has the highest priority (1).
- **10–14:** P5 (Priority 2) finishes.
- **14–15:** P4 (Priority 3) finishes.
- **15–18:** P3 (Priority 4) finishes.
- **18–20:** P2 (Priority 5) finishes.

**Averages:** WT = 9.40 | TAT = 13.40 | RT = 9.40

## 7. Comparison Summary
**Winner:** SJF (Preemptive) is the most efficient with an average Wait Time of **3.00** compared to Priority's **9.40**.

## 8. Key Observations
- **SJF (Preemptive)** allows short jobs to cut the line, creating the best overall efficiency.
- **Priority** forces all short jobs to wait behind P1 simply because P1 is considered more urgent.

---

# Scenario C: Simultaneous Arrival

## 1. Objective
To test how the algorithms handle multiple processes arriving at the exact same time (t=0) to verify their tie-breaking logic.

## 2. Description
Five processes arrive at t=0. Preemptive and Non-Preemptive SJF will behave identically here because no new jobs arrive later to cause interruptions.

## 3. Input Data

| PID | Arrival Time | Burst Time | Priority |
|-----|-------------|------------|----------|
| P1  | 0           | 5          | 4        |
| P2  | 0           | 2          | 2        |
| P3  | 0           | 8          | 1        |
| P4  | 0           | 4          | 5        |
| P5  | 0           | 3          | 3        |

## 4. SJF Results (Both Preemptive & Non-Preemptive)
**Timeline:**
- **0–2:** P2 finishes (Shortest).
- **2–5:** P5 finishes.
- **5–9:** P4 finishes.
- **9–14:** P1 finishes.
- **14–22:** P3 finishes (Longest).

**Averages:** WT = 6.00 | TAT = 10.40 | RT = 6.00

## 5. Priority Scheduling (Preemptive) Results
**Timeline:**
- **0–8:** P3 finishes (Highest Priority).
- **8–10:** P2 finishes.
- **10–13:** P5 finishes.
- **13–18:** P1 finishes.
- **18–22:** P4 finishes (Lowest Priority).

**Averages:** WT = 9.80 | TAT = 14.20 | RT = 9.80

## 6. Comparison Summary
**Winner:** SJF wins on all metrics. Average WT is **6.00** compared to Priority's **9.80**.

## 7. Key Observations
- **SJF** easily clears the queue by finishing quick tasks first.
- **Priority** chooses to run the longest task first (P3) because of its priority, causing everyone else to wait much longer.
