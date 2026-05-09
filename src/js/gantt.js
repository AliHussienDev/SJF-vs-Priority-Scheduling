function renderGantt(containerId, timesId, orderId, timeline) {
  const container = document.getElementById(containerId);
  const timesEl = document.getElementById(timesId);
  const orderEl = document.getElementById(orderId);

  if (!timeline || timeline.length === 0) return;
  const maxTime = timeline[timeline.length-1].end;
  const minTime = timeline[0].start;
  const span = maxTime - minTime;
  const W = Math.max(600, span * 36);

  container.style.width = W + 'px';
  timesEl.style.width = W + 'px';

  container.innerHTML = '';
  timesEl.innerHTML = '';

  timeline.forEach(block => {
    const left = ((block.start - minTime) / span) * 100;
    const width = ((block.end - block.start) / span) * 100;
    const div = document.createElement('div');
    div.className = 'gantt-block' + (block.pid === 'idle' ? ' gantt-idle' : '');
    div.style.left = left + '%';
    div.style.width = 'calc(' + width + '% - 2px)';
    if (block.pid !== 'idle') {
      div.style.background = block.color;
      div.textContent = block.pid;
      div.title = `${block.pid}: ${block.start} → ${block.end}`;
    }
    container.appendChild(div);
  });

  const times = new Set();
  timeline.forEach(b => { times.add(b.start); times.add(b.end); });
  [...times].sort((a,b)=>a-b).forEach(t => {
    const label = document.createElement('div');
    label.className = 'gantt-time-label';
    label.style.left = ((t - minTime) / span * 100) + '%';
    label.textContent = t;
    timesEl.appendChild(label);
  });

  const seen = new Set();
  const execOrder = timeline.filter(b => b.pid !== 'idle' && !seen.has(b.pid) && seen.add(b.pid));
  orderEl.innerHTML = execOrder.map(b =>
    `<span class="queue-item" style="background:${b.color}">${b.pid}</span>`
  ).join('');
}
