/* ES3-compatible JavaScript for old browsers. */
function byId(id) {
  if (document.getElementById) { return document.getElementById(id); }
  if (document.all) { return document.all[id]; }
  return null;
}
function setText(id, value) {
  var el = byId(id);
  if (!el) { return; }
  if (typeof el.textContent != 'undefined') { el.textContent = value; }
  else { el.innerText = value; }
}
function safeValue(value, fallback) {
  if (value === null || typeof value == 'undefined' || value === '') { return fallback; }
  return value;
}
function initHome() {
  setText('js-state', 'JavaScript is working');
  var js = byId('js-state');
  if (js) { js.className = 'status-ok'; }
  setText('ua', safeValue(navigator.userAgent, 'Unknown'));
  setText('platform', safeValue(navigator.platform, 'Unknown'));
  if (window.screen) {
    setText('screen', screen.width + ' x ' + screen.height + ', ' + safeValue(screen.colorDepth, '?') + '-bit color');
  } else {
    setText('screen', 'Screen object unavailable');
  }
  setText('clock', new Date().toString());
}
function updateClock() {
  setText('live-clock', new Date().toString());
}
