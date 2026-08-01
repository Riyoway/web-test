function decodePart(s) {
  s = String(s).replace(/\+/g, ' ');
  try { return decodeURIComponent(s); } catch (e) { return unescape(s); }
}
function showQuery() {
  var q = location.search;
  var out = byId('query-output');
  if (!out) { return; }
  if (!q || q.length < 2) {
    setText('query-output', 'No query values were received.');
    return;
  }
  q = q.substring(1);
  var items = q.split('&');
  var html = '<table class="test-table" summary="Submitted form values"><tr><th>Name</th><th>Value</th></tr>';
  var i, pair, key, value;
  for (i = 0; i < items.length; i++) {
    pair = items[i].split('=');
    key = decodePart(pair[0]);
    value = pair.length > 1 ? decodePart(pair.slice(1).join('=')) : '';
    key = key.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    value = value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    html += '<tr><td>' + key + '</td><td>' + value + '</td></tr>';
  }
  html += '</table>';
  out.innerHTML = html;
}
