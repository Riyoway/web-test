var reactionTimer = null, reactionReady = false, reactionStart = 0, reactionBest = 0;
function beginReaction() {
  if (reactionTimer) { window.clearTimeout(reactionTimer); }
  reactionReady = false;
  var b = byId('reactionButton');
  b.className = 'button reaction-wait'; b.value = 'WAIT...';
  setText('reaction-status','Wait for green.');
  reactionTimer = window.setTimeout(reactionGo, 1500 + Math.floor(Math.random() * 3500));
}
function reactionGo() {
  reactionReady = true;
  reactionStart = new Date().getTime();
  var b = byId('reactionButton');
  b.className = 'button reaction-ready'; b.value = 'CLICK!';
  setText('reaction-status','Now!');
}
function clickReaction() {
  var elapsed;
  if (!reactionReady) {
    if (reactionTimer) { window.clearTimeout(reactionTimer); }
    setText('reaction-status','Too early. Press Start and try again.');
    byId('reactionButton').value = 'START';
    byId('reactionButton').className = 'button';
    return;
  }
  elapsed = new Date().getTime() - reactionStart;
  reactionReady = false;
  setText('reaction-status','Reaction: ' + elapsed + ' ms');
  if (reactionBest == 0 || elapsed < reactionBest) { reactionBest = elapsed; setText('reaction-best', String(reactionBest)); }
  byId('reactionButton').value = 'AGAIN';
  byId('reactionButton').className = 'button';
}
function reactionPress() {
  if (reactionReady || byId('reactionButton').value == 'WAIT...') { clickReaction(); }
  else { beginReaction(); }
}
