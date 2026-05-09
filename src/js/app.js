const COLORS = ['#3b82f6','#ef4444','#f59e0b','#10b981','#8b5cf6','#ec4899','#06b6d4','#84cc16'];
let processes = [];
let colorIdx = 0;

function getColor(idx, customColor) {
  if (customColor && customColor !== '0') return COLORS[parseInt(customColor)-1];
  return COLORS[idx % COLORS.length];
}

function addProcess() {
  const pid = document.getElementById('inp-pid').value.trim().toUpperCase();
  const at = document.getElementById('inp-at').value;
  const bt = document.getElementById('inp-bt').value;
  const pr = document.getElementById('inp-pr').value;
  const cl = document.getElementById('inp-color').value;

  if (!validateProcessInput(pid, at, bt, pr, processes)) return;

  const color = getColor(colorIdx, cl);
  colorIdx++;
  processes.push(new Process(pid, parseInt(at), parseInt(bt), parseInt(pr), color));
  renderProcessTable();
  
  document.getElementById('inp-pid').value='';
  document.getElementById('inp-at').value='';
  document.getElementById('inp-bt').value='';
  document.getElementById('inp-pr').value='';
  document.getElementById('inp-color').value='0';
  document.getElementById('inp-pid').focus();
}

function removeProcess(idx) {
  processes.splice(idx,1);
  renderProcessTable();
}

function renderProcessTable() {
  const tbody = document.getElementById('process-tbody');
  const noProc = document.getElementById('no-processes');
  const tableWrap = document.getElementById('table-wrap');
  const count = document.getElementById('process-count');
  count.textContent = processes.length + ' process' + (processes.length !== 1 ? 'es' : '');

  if (processes.length === 0) { noProc.classList.remove('hidden'); tableWrap.classList.add('hidden'); return; }
  noProc.classList.add('hidden'); tableWrap.classList.remove('hidden');

  tbody.innerHTML = processes.map((p,i) => `
    <tr>
      <td><span class="pid-badge" style="background:${p.color}">${p.pid}</span></td>
      <td>${p.at}</td>
      <td>${p.bt}</td>
      <td><strong>${p.pr}</strong></td>
      <td><button class="del-btn" onclick="removeProcess(${i})">✕</button></td>
    </tr>
  `).join('');
}

function runSimulation() {
  if (processes.length < 2) {
    const errDiv = document.getElementById('validation-error');
    errDiv.textContent = 'Please add at least 2 processes to run the simulation.';
    errDiv.classList.remove('hidden');
    return;
  }
  document.getElementById('validation-error').classList.add('hidden');

  const [sjfResults, sjfTimeline] = simulateSJF([...processes]);
  const [sjfNpResults, sjfNpTimeline] = simulateSJFNonPreemptive([...processes]);
  const [priResults, priTimeline] = simulatePriority([...processes]);

  document.getElementById('results-section').classList.remove('hidden');

  renderGantt('gantt-sjf', 'times-sjf', 'exec-order-sjf', sjfTimeline);
  renderGantt('gantt-sjf-np', 'times-sjf-np', 'exec-order-sjf-np', sjfNpTimeline);
  renderGantt('gantt-pri', 'times-pri', 'exec-order-pri', priTimeline);
  renderResultsTable('results-sjf', sjfResults, false);
  renderResultsTable('results-sjf-np', sjfNpResults, false);
  renderResultsTable('results-pri', priResults, true);
  renderStats('stats-sjf', sjfResults, '#0d9488');
  renderStats('stats-sjf-np', sjfNpResults, '#0284c7');
  renderStats('stats-pri', priResults, '#7c3aed');
  renderComparison(sjfResults, sjfNpResults, priResults);
  renderConclusion(sjfResults, sjfNpResults, priResults);

  document.getElementById('results-section').scrollIntoView({behavior:'smooth', block:'start'});
}

function clearAll() {
  processes = [];
  colorIdx = 0;
  renderProcessTable();
  document.getElementById('results-section').classList.add('hidden');
  document.getElementById('validation-error').classList.add('hidden');
}

function loadScenario(s) {
  clearAll();
  const scenarios = {
    A: [
      {pid:'P1',at:0,bt:6,pr:3},{pid:'P2',at:1,bt:4,pr:1},{pid:'P3',at:2,bt:8,pr:4},
      {pid:'P4',at:3,bt:2,pr:2},{pid:'P5',at:4,bt:5,pr:5}
    ],
    B: [
      {pid:'P1',at:0,bt:10,pr:1},{pid:'P2',at:1,bt:2,pr:5},{pid:'P3',at:2,bt:3,pr:4},
      {pid:'P4',at:3,bt:1,pr:3},{pid:'P5',at:4,bt:4,pr:2}
    ],
    C: [
      {pid:'P1',at:0,bt:5,pr:4},
      {pid:'P2',at:0,bt:2,pr:2},
      {pid:'P3',at:0,bt:8,pr:1},
      {pid:'P4',at:0,bt:4,pr:5},
      {pid:'P5',at:0,bt:3,pr:3}
    ],
    D: null
  };

  if (s === 'D') {
    document.getElementById('inp-pid').value = 'P1';
    document.getElementById('inp-at').value = '-1';
    document.getElementById('inp-bt').value = '0';
    document.getElementById('inp-pr').value = '15';
    document.getElementById('validation-error').textContent =
      'Scenario D — Validation Test: Try clicking "+ Add" with the pre-filled invalid values. The simulator will reject them.';
    document.getElementById('validation-error').className = 'alert alert-info';
    document.getElementById('validation-error').classList.remove('hidden');
    return;
  }

  scenarios[s].forEach((p, i) => {
    processes.push(new Process(p.pid, p.at, p.bt, p.pr, COLORS[i % COLORS.length]));
    colorIdx++;
  });
  renderProcessTable();

  const names = {
    A: 'Basic Mixed Workload',
    B: 'Urgency vs. Efficiency',
    C: 'Simultaneous Arrival'
  };
  document.getElementById('validation-error').textContent = `Loaded Scenario ${s}: ${names[s]}`;
  document.getElementById('validation-error').className = 'alert alert-success';
  document.getElementById('validation-error').classList.remove('hidden');
}
