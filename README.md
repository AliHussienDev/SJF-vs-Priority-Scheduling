# CPU Scheduling Simulator: SJF vs. Priority

## Project Overview
This project is part of the Operating Systems course (C4 — CPU Scheduling Comparison Project). It compares three CPU scheduling algorithms using an interactive, browser-based simulator:
- **SJF (Shortest Job First) — Preemptive (SRTF)**
- **SJF (Shortest Job First) — Non-Preemptive**
- **Priority Scheduling — Preemptive**

The simulator runs all three algorithms on the same input at the same time. It generates Gantt charts, process metrics (WT, TAT, RT, CT), and a final comparison to determine the best algorithm for the given workload.

---

## Team Members
| No. | Name | ID |
|-----|------|----|
| 1 | فاطمة على عبد الله علام | 20240687 |
| 2 | فيرينا شاكر نخلة شاكر | 20240696 |
| 3 | ليديا روماني عزاري | 20240747 |
| 4 | علي محمد سعد حسين | 20240602 |
| 5 | عمر شحاته إسماعيل عبد الحميد | 20240630 |
| 6 | مؤمن محمد علي ابراهيم | 20241032 |

---

## Implemented Algorithms

### 1. SJF — Preemptive (SRTF)
- Selects the process with the shortest remaining burst time.
- Preempts (interrupts) the current process if a new process arrives with a shorter time.
- Resolves ties by arrival time, then alphabetically by Process ID.
- Achieves the lowest average waiting time among preemptive algorithms.

### 2. SJF — Non-Preemptive
- Selects the process with the shortest total burst time when the CPU is free.
- Once started, a process runs until it finishes without interruption.
- Resolves ties by burst time, then arrival time, then Process ID.
- Has fewer context switches, but long running jobs can block shorter ones.

### 3. Priority Scheduling (Preemptive)
- Selects the process with the highest priority (lower number = higher priority).
- Preempts the current process if a new one has a higher priority.
- Resolves ties by arrival time, then Process ID.
- Can cause "starvation" where low-priority jobs wait forever in heavy workloads.

---

## Features
- **Dynamic Input:** Add processes easily while running.
- **Validation:** Prevents invalid inputs (e.g., negative times or duplicate IDs).
- **Visualizations:** Displays three separate Gantt charts side by side.
- **Detailed Metrics:** Shows WT, TAT, RT, and CT for every process.
- **Summary:** Calculates average metrics and highlights the best algorithm.
- **Test Scenarios:** Includes four built-in test cases for quick demonstrations.

---

## Performance Metrics

| Metric | Description | Formula |
|--------|-------------|---------|
| **CT (Completion Time)** | When the process finishes | - |
| **TAT (Turnaround Time)** | Total time from arrival to finish | CT - Arrival Time |
| **WT (Waiting Time)** | Time spent waiting in the queue | TAT - Burst Time |
| **RT (Response Time)** | Time until the first CPU execution | First CPU time - Arrival Time |

---

## Requirements
- **No installation needed.** Built with plain HTML, CSS, and JavaScript.
- Runs in any modern browser (Google Chrome is recommended).

---

## How to Run

### Option 1: Direct Run (Recommended)
1. Open the `src/` folder.
2. Double-click `SJF(Preemptive) vs SJF(Non-Preemptive) vs Priority.html`.
3. The simulator will open in your browser automatically.

### Option 2: Pre-rendered Scenarios
Open any file in the `screenshots/` folder to view pre-calculated results without running the simulator.

---

## How to Use
1. **Add Processes:** Enter Process ID, Arrival Time, Burst Time, and Priority (1–10). Click **+ Add**.
2. **Load Scenarios:** Click scenario buttons (A, B, C, or D) to load built-in data.
3. **Simulate:** Click the **Run Simulation** button.
4. **View Results:** Check the charts, tables, and the final conclusion.
5. **Reset:** Click **Clear All** to start over.

---

## Built-in Test Scenarios

| Scenario | Description | Purpose |
|----------|-------------|---------|
| **A: Basic Mixed Workload** | Normal mixed inputs | Standard comparison |
| **B: Urgency vs. Efficiency** | High-priority long job vs. short low-priority jobs | Urgency vs efficiency trade-off |
| **C: Simultaneous Arrival** | Multiple processes arriving at the same time | Verifies tie-breaking logic |
| **D: Input Validation Test** | Malformed or edge-case inputs | Tests system error handling |

*Detailed step-by-step documentation for these scenarios is available in the `test-cases` folder.*

---

## Algorithm Summary

| Feature | SJF (Preemptive) | SJF (Non-Preemptive) | Priority (Preemptive) |
|---------|:---:|:---:|:---:|
| **Preemptive?** | Yes | No | Yes |
| **Efficiency (Avg WT)** | Optimal | High | Varies |
| **Context Switches** | High | Low | High |
| **Starvation Risk** | Long Jobs | Long Jobs | Low Priority |
| **Best Use Case** | High Throughput | Low Overhead | Urgent Tasks |

---

## Technologies Used
- HTML5, CSS3, Vanilla JavaScript
- No external frameworks or dependencies
