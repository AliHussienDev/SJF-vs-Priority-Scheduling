# Scenario A: Basic Mixed Workload

## 1. Objective
To verify that all three scheduling algorithms work correctly using a standard set of inputs, establishing a baseline for comparison.

## 2. Description
A typical workload with five processes, each having different arrival times, burst times, and priorities.

## 3. Input Data

| PID | Arrival Time | Burst Time | Priority |
|-----|-------------|------------|----------|
| P1  | 0           | 6          | 3        |
| P2  | 1           | 4          | 1        |
| P3  | 2           | 8          | 4        |
| P4  | 3           | 2          | 2        |
| P5  | 4           | 5          | 5        |

## 4. SJF (Preemptive / SRTF) Results
*Rule: Interrupts the current process if a new one arrives with a shorter remaining time.*

**Timeline:**
- **0–1:** P1 runs.
- **1–5:** P2 arrives (BT=4 is shorter than P1's remaining 5). P2 preempts P1 and finishes.
- **5–7:** P4 arrives (BT=2). P4 runs and finishes.
- **7–12:** P1 resumes and finishes.
- **12–17:** P5 runs and finishes.
- **17–25:** P3 runs and finishes.

| PID | CT | TAT | WT | RT |
|-----|----|-----|----|----|
| P1  | 12 | 12  | 6  | 0  |
| P2  | 5  | 4   | 0  | 0  |
| P3  | 25 | 23  | 15 | 15 |
| P4  | 7  | 4   | 2  | 2  |
| P5  | 17 | 13  | 8  | 8  |

**Averages:** WT = 6.20 | TAT = 11.20 | RT = 5.00

## 5. SJF (Non-Preemptive) Results
*Rule: Processes run to completion. When the CPU is free, it picks the shortest available job.*

**Timeline:**
- **0–6:** P1 is the only process at start, so it runs completely.
- **6–8:** P4 is the shortest available. P4 finishes.
- **8–12:** P2 is the shortest available. P2 finishes.
- **12–17:** P5 is the shortest available. P5 finishes.
- **17–25:** P3 finishes last.

| PID | CT | TAT | WT | RT |
|-----|----|-----|----|----|
| P1  | 6  | 6   | 0  | 0  |
| P2  | 12 | 11  | 7  | 7  |
| P3  | 25 | 23  | 15 | 15 |
| P4  | 8  | 5   | 3  | 3  |
| P5  | 17 | 13  | 8  | 8  |

**Averages:** WT = 6.60 | TAT = 11.60 | RT = 6.60

## 6. Priority Scheduling (Preemptive) Results
*Rule: Lower number means higher priority. Interrupts current process if a higher priority job arrives.*

**Timeline:**
- **0–1:** P1 runs (Priority 3).
- **1–5:** P2 arrives (Priority 1). Preempts P1 and finishes.
- **5–7:** P4 arrives (Priority 2). Preempts P1 again and finishes.
- **7–12:** P1 resumes (Priority 3) and finishes.
- **12–20:** P3 runs (Priority 4) and finishes.
- **20–25:** P5 runs (Priority 5) and finishes.

| PID | Priority | CT | TAT | WT | RT |
|-----|----------|----|-----|----|----|
| P1  | 3        | 12 | 12  | 6  | 0  |
| P2  | 1        | 5  | 4   | 0  | 0  |
| P3  | 4        | 20 | 18  | 10 | 10 |
| P4  | 2        | 7  | 4   | 2  | 2  |
| P5  | 5        | 25 | 21  | 16 | 16 |

**Averages:** WT = 6.80 | TAT = 11.80 | RT = 5.60

## 7. Comparison Summary

| Metric  | SJF (Preemptive) | SJF (Non-Preemptive) | Priority (Preemptive) | Winner |
|---------|------------------|----------------------|-----------------------|--------|
| Avg WT  | **6.20** | 6.60 | 6.80 | SJF (Preemptive) |
| Avg TAT | **11.20** | 11.60 | 11.80 | SJF (Preemptive) |
| Avg RT  | **5.00** | 6.60 | 5.60 | SJF (Preemptive) |

## 8. Key Observations
- **SJF Preemptive** performs the best overall. It allows shorter jobs (P2, P4) to finish quickly by interrupting P1.
- **SJF Non-Preemptive** is slower because P1 runs fully at the start, delaying P2 and P4.
- **Priority Scheduling** strictly follows process importance, causing the lowest priority process (P5) to wait the longest.
