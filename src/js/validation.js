function showError(fieldId, msgId, show) {
  const f = document.getElementById(fieldId);
  const m = document.getElementById(msgId);
  if (show) { f.classList.add('error'); m.style.display='block'; }
  else { f.classList.remove('error'); m.style.display='none'; }
}

function validateProcessInput(pid, at, bt, pr, processes) {
  let valid = true;
  if (!pid || processes.find(p => p.pid === pid)) { showError('inp-pid','err-pid',true); valid=false; } else showError('inp-pid','err-pid',false);
  if (at === '' || isNaN(at) || parseInt(at) < 0) { showError('inp-at','err-at',true); valid=false; } else showError('inp-at','err-at',false);
  if (!bt || isNaN(bt) || parseInt(bt) < 1) { showError('inp-bt','err-bt',true); valid=false; } else showError('inp-bt','err-bt',false);
  if (!pr || isNaN(pr) || parseInt(pr) < 1 || parseInt(pr) > 10) { showError('inp-pr','err-pr',true); valid=false; } else showError('inp-pr','err-pr',false);
  return valid;
}
