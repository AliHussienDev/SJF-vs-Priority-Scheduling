# Scenario D: Input Validation Test

## 1. Objective
To ensure the simulator correctly rejects invalid data before running any calculations.

## 2. Description
We attempt to input incorrect or missing data to verify the system's error handling.

## 3. Validation Tests

| Test | PID | Arrival | Burst | Priority | Result |
|------|-----|---------|-------|----------|--------|
| **1** | P1 | -1 | 5 | 2 | Rejected: Negative arrival time |
| **2** | P1 | 0 | 0 | 2 | Rejected: Burst time must be ≥ 1 |
| **3** | P1 | 0 | 5 | 15 | Rejected: Priority must be 1–10 |
| **4** | P1 | 0 | 5 | 2 | **Accepted** |
| **5** | P1 | 2 | 3 | 1 | Rejected: Duplicate Process ID |
| **6** | (empty) | 0 | 5 | 2 | Rejected: Missing Process ID |
| **7** | P2 | abc | 5 | 2 | Rejected: Non-numeric arrival time |

## 4. System Rules
- **Process ID:** Required, unique, maximum 5 characters.
- **Arrival Time:** Required, must be 0 or greater.
- **Burst Time:** Required, must be 1 or greater.
- **Priority:** Required, must be between 1 and 10.
- The simulator will block any calculations until all inputs are valid.
