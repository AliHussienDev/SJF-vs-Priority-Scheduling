function renderResultsTable(tbodyId, results, showPriority) {
  const tbody = document.getElementById(tbodyId);
  const avgWT = (results.reduce((a,r)=>a+r.wt,0)/results.length).toFixed(2);
  const avgTAT = (results.reduce((a,r)=>a+r.tat,0)/results.length).toFixed(2);
  const avgRT = (results.reduce((a,r)=>a+r.rt,0)/results.length).toFixed(2);

  tbody.innerHTML = results.map(r => `
    <tr>
      <td><span class="pid-badge" style="background:${r.color}">${r.pid}</span></td>
      <td>${r.at}</td>
      <td>${r.bt}</td>
      ${showPriority ? `<td>${r.pr}</td>` : ''}
      <td>${r.ct}</td>
      <td>${r.tat}</td>
      <td>${r.wt}</td>
      <td>${r.rt}</td>
    </tr>
  `).join('') + `
    <tr class="avg-row">
      <td colspan="${showPriority?4:3}" style="text-align:right; color:var(--text-secondary)">Average</td>
      <td>—</td>
      <td>${avgTAT}</td>
      <td>${avgWT}</td>
      <td>${avgRT}</td>
    </tr>
  `;
}

function renderStats(containerId, results, color) {
  const avgWT = (results.reduce((a,r)=>a+r.wt,0)/results.length).toFixed(2);
  const avgTAT = (results.reduce((a,r)=>a+r.tat,0)/results.length).toFixed(2);
  const avgRT = (results.reduce((a,r)=>a+r.rt,0)/results.length).toFixed(2);
  document.getElementById(containerId).innerHTML = `
    <div class="stat-card"><div class="val" style="color:${color}">${avgWT}</div><div class="lbl">Avg Wait Time</div></div>
    <div class="stat-card"><div class="val" style="color:${color}">${avgTAT}</div><div class="lbl">Avg Turnaround</div></div>
    <div class="stat-card"><div class="val" style="color:${color}">${avgRT}</div><div class="lbl">Avg Response</div></div>
  `;
}
