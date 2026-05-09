function simulateSJF(procs) {
  const n = procs.length;
  const remaining = procs.map(p => p.bt);
  const finished = new Array(n).fill(false);
  const ct = new Array(n).fill(0);
  const rt = new Array(n).fill(-1);
  const timeline = [];
  let time = 0;
  let done = 0;
  const maxTime = procs.reduce((a,p)=>a+p.bt,0) + Math.max(...procs.map(p=>p.at)) + 1;

  while (done < n && time <= maxTime) {
    const avail = procs.map((p,i) => (!finished[i] && p.at <= time) ? i : -1).filter(i=>i>=0);
    if (avail.length === 0) {
      const prev = timeline[timeline.length-1];
      if (prev && prev.pid === 'idle') prev.end = time+1;
      else timeline.push(new GanttSegment('idle', time, time+1, '#e2e8f0'));
      time++; continue;
    }
    avail.sort((a,b) => remaining[a]-remaining[b] || procs[a].at-procs[b].at || procs[a].pid.localeCompare(procs[b].pid));
    const cur = avail[0];
    if (rt[cur] === -1) rt[cur] = time;
    const prev = timeline[timeline.length-1];
    if (prev && prev.pid === procs[cur].pid) prev.end = time+1;
    else timeline.push(new GanttSegment(procs[cur].pid, time, time+1, procs[cur].color));
    remaining[cur]--;
    time++;
    if (remaining[cur] === 0) { finished[cur]=true; ct[cur]=time; done++; }
  }

  const results = procs.map((p,i) => new SchedulingResult(
    p.pid, p.at, p.bt, p.pr, p.color,
    ct[i], ct[i]-p.at, ct[i]-p.at-p.bt, rt[i]-p.at
  ));
  return [results, timeline];
}
