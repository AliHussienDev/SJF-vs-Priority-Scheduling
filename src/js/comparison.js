function renderComparison(sjf, sjfNp, pri) {
  const avg = r => ({
    wt: (r.reduce((a,x)=>a+x.wt,0)/r.length).toFixed(2),
    tat: (r.reduce((a,x)=>a+x.tat,0)/r.length).toFixed(2),
    rt: (r.reduce((a,x)=>a+x.rt,0)/r.length).toFixed(2)
  });
  const s = avg(sjf), sn = avg(sjfNp), p = avg(pri);

  const rows = [
    ['Avg Waiting Time', s.wt, sn.wt, p.wt],
    ['Avg Turnaround Time', s.tat, sn.tat, p.tat],
    ['Avg Response Time', s.rt, sn.rt, p.rt]
  ];

  document.getElementById('compare-sjf').innerHTML = rows.map(r => `
    <div class="compare-row"><span class="metric-name">${r[0]}</span><span class="metric-val">${r[1]}</span></div>`).join('');
    
  document.getElementById('compare-sjf-np').innerHTML = rows.map(r => `
    <div class="compare-row"><span class="metric-name">${r[0]}</span><span class="metric-val">${r[2]}</span></div>`).join('');

  document.getElementById('compare-pri').innerHTML = rows.map(r => `
    <div class="compare-row"><span class="metric-name">${r[0]}</span><span class="metric-val">${r[3]}</span></div>`).join('');

  document.getElementById('head-to-head').innerHTML = rows.map(r => {
    const sv = parseFloat(r[1]), snv = parseFloat(r[2]), pv = parseFloat(r[3]);
    const minVal = Math.min(sv, snv, pv);
    let winner = [];
    if (sv === minVal) winner.push('<span class="algo-sjf">SJF(Pre)</span>');
    if (snv === minVal) winner.push('<span class="algo-sjf-np">SJF(NP)</span>');
    if (pv === minVal) winner.push('<span class="algo-pri">Priority</span>');
    return `<tr>
      <td style="text-align:left; font-weight:600;">${r[0]}</td>
      <td>${r[1]}</td>
      <td>${r[2]}</td>
      <td>${r[3]}</td>
      <td>${winner.join(', ')}</td>
    </tr>`;
  }).join('');

  document.getElementById('analysis-section').innerHTML = `
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:1rem; margin-top:1rem;">
      <div class="alert alert-info" style="flex-direction:column; gap:0.3rem;">
        <strong>SJF (Preemptive) Analysis</strong>
        <p style="font-size:0.82rem; margin-top:0.25rem;">Always picks shortest remaining burst. Typically minimizes average wait time overall but causes many context switches.</p>
      </div>
      <div class="alert alert-info" style="flex-direction:column; gap:0.3rem; background:#f0f9ff; border-color:#bae6fd; color:#0369a1;">
        <strong>SJF (Non-Preemptive) Analysis</strong>
        <p style="font-size:0.82rem; margin-top:0.25rem;">Once a job starts, it finishes. Less context switching, but a short job arriving later must wait for a long running job.</p>
      </div>
      <div class="alert alert-info" style="flex-direction:column; gap:0.3rem; background:#faf5ff; border-color:#e9d5ff; color:#6d28d9;">
        <strong>Priority Analysis</strong>
        <p style="font-size:0.82rem; margin-top:0.25rem;">Favors low priority numbers. Can cause starvation for low priority tasks.</p>
      </div>
    </div>
  `;
}

function renderConclusion(sjf, sjfNp, pri) {
  const avg = r => ({
    wt: r.reduce((a,x)=>a+x.wt,0)/r.length,
    tat: r.reduce((a,x)=>a+x.tat,0)/r.length,
    rt: r.reduce((a,x)=>a+x.rt,0)/r.length
  });
  const s = avg(sjf), sn = avg(sjfNp), p = avg(pri);
  
  const getBest = (v1, v2, v3, n1, n2, n3) => {
    let min = Math.min(v1, v2, v3);
    let best = [];
    if (v1 === min) best.push(n1);
    if (v2 === min) best.push(n2);
    if (v3 === min) best.push(n3);
    return best.join(' & ');
  };
  
  const betterWT = getBest(s.wt, sn.wt, p.wt, 'SJF(Pre)', 'SJF(NP)', 'Priority');
  const betterTAT = getBest(s.tat, sn.tat, p.tat, 'SJF(Pre)', 'SJF(NP)', 'Priority');
  const betterRT = getBest(s.rt, sn.rt, p.rt, 'SJF(Pre)', 'SJF(NP)', 'Priority');

  document.getElementById('conclusion-box').innerHTML = `
    <div class="conclusion-box">
      <h3>Conclusion & Recommendation</h3>
      <p>
        Based on the simulation results:
        <strong>${betterWT}</strong> achieved better average waiting time,
        <strong>${betterTAT}</strong> achieved better average turnaround time, and
        <strong>${betterRT}</strong> had better average response time.
        <br><br>
        <strong>Main Trade-off:</strong> SJF(Preemptive) often gives the lowest waiting time but has more overhead due to preemption. 
        SJF(Non-Preemptive) provides a balance with fewer context switches. Priority Scheduling ensures urgent tasks run first but risks starving others.
      </p>
    </div>
  `;
}
