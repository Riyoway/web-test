var timerCount = 0;
function addResult(name, success, detail) {
  var table = byId('js-results');
  if (!table || !table.insertRow) { return; }
  var row = table.insertRow(table.rows.length);
  var c1 = row.insertCell(0);
  var c2 = row.insertCell(1);
  var c3 = row.insertCell(2);
  c1.appendChild(document.createTextNode(name));
  c2.appendChild(document.createTextNode(success ? 'PASS' : 'FAIL'));
  c2.className = success ? 'status-ok' : 'status-bad';
  c3.appendChild(document.createTextNode(detail));
}
function runJsTests() {
  addResult('Date', !!Date, new Date().toString());
  addResult('Math.random', typeof Math.random == 'function', String(Math.random()));
  addResult('DOM lookup', byId('js-results') !== null, 'getElementById or document.all');
  addResult('Screen object', !!window.screen, window.screen ? screen.width + ' x ' + screen.height : 'Unavailable');
  try {
    document.cookie = 'retrotest=1; path=/';
    addResult('Cookie write', document.cookie.indexOf('retrotest=1') >= 0, document.cookie || 'No cookie returned');
  } catch (e) {
    addResult('Cookie write', false, 'Exception');
  }
  setText('timer-state', 'Waiting for timer...');
  window.setTimeout(function () {
    timerCount = timerCount + 1;
    setText('timer-state', 'PASS - timer fired (' + timerCount + ')');
    var el = byId('timer-state');
    if (el) { el.className = 'status-ok'; }
  }, 1200);
}
