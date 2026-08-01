var memoryValues = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H'];
var memoryOpen = [], memoryDone = [], memoryMoves = 0, memoryLock = false;
function shuffleMemory() {
  var i, j, t;
  for (i = memoryValues.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    t = memoryValues[i]; memoryValues[i] = memoryValues[j]; memoryValues[j] = t;
  }
}
function buildMemory() {
  var table = byId('memoryboard'), i, row, cell, a;
  if (!table || !table.insertRow) { setText('memory-status','This browser cannot build the board.'); return; }
  shuffleMemory();
  for (i = 0; i < 16; i++) {
    if (i % 4 == 0) { row = table.insertRow(table.rows.length); }
    cell = row.insertCell(row.cells.length);
    a = document.createElement('a');
    a.href = '#'; a.id = 'm_' + i; a.className = 'memory-tile'; a.innerHTML = '?';
    a.onclick = (function(n){ return function(){ return openMemory(n); }; })(i);
    cell.appendChild(a);
    memoryDone[i] = false;
  }
  setText('memory-status','Choose two tiles.');
}
function openMemory(n) {
  var tile;
  if (memoryLock || memoryDone[n]) { return false; }
  if (memoryOpen.length > 0 && memoryOpen[0] == n) { return false; }
  tile = byId('m_' + n); if (!tile) { return false; }
  tile.innerHTML = memoryValues[n]; tile.className = 'memory-tile open';
  memoryOpen.push(n);
  if (memoryOpen.length == 2) {
    memoryMoves++;
    setText('memory-moves', String(memoryMoves));
    if (memoryValues[memoryOpen[0]] == memoryValues[memoryOpen[1]]) {
      memoryDone[memoryOpen[0]] = true; memoryDone[memoryOpen[1]] = true;
      byId('m_' + memoryOpen[0]).className = 'memory-tile done';
      byId('m_' + memoryOpen[1]).className = 'memory-tile done';
      memoryOpen = [];
      checkMemoryWin();
    } else {
      memoryLock = true;
      setText('memory-status','No match...');
      window.setTimeout(closeMemory, 750);
    }
  }
  return false;
}
function closeMemory() {
  var a = memoryOpen[0], b = memoryOpen[1];
  byId('m_' + a).innerHTML = '?'; byId('m_' + a).className = 'memory-tile';
  byId('m_' + b).innerHTML = '?'; byId('m_' + b).className = 'memory-tile';
  memoryOpen = []; memoryLock = false;
  setText('memory-status','Choose two tiles.');
}
function checkMemoryWin() {
  var i;
  for (i = 0; i < memoryDone.length; i++) if (!memoryDone[i]) { setText('memory-status','Match found!'); return; }
  setText('memory-status','Complete in ' + memoryMoves + ' moves!');
}
function resetMemory() { location.reload(); return false; }
