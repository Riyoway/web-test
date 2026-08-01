var snakeW = 18, snakeH = 14;
var snake = [];
var foodX = 0, foodY = 0;
var dirX = 1, dirY = 0, nextX = 1, nextY = 0;
var snakeTimer = null, snakeScore = 0, snakeRunning = false;
function snakeCell(x, y) { return byId('s_' + x + '_' + y); }
function buildSnakeBoard() {
  var table = byId('snakeboard');
  var y, x, row, cell;
  if (!table || !table.insertRow) { setText('snake-status', 'This browser cannot build the game board.'); return; }
  for (y = 0; y < snakeH; y++) {
    row = table.insertRow(y);
    for (x = 0; x < snakeW; x++) {
      cell = row.insertCell(x);
      cell.id = 's_' + x + '_' + y;
      cell.innerHTML = '&nbsp;';
    }
  }
  document.onkeydown = snakeKey;
  resetSnake();
}
function resetSnake() {
  if (snakeTimer) { window.clearInterval(snakeTimer); }
  snake = [{x:5,y:7},{x:4,y:7},{x:3,y:7}];
  dirX = 1; dirY = 0; nextX = 1; nextY = 0;
  snakeScore = 0; snakeRunning = false;
  placeFood(); drawSnake();
  setText('snake-score', '0');
  setText('snake-status', 'Press Start or an arrow key.');
}
function placeFood() {
  var ok = false, i;
  while (!ok) {
    foodX = Math.floor(Math.random() * snakeW);
    foodY = Math.floor(Math.random() * snakeH);
    ok = true;
    for (i = 0; i < snake.length; i++) {
      if (snake[i].x == foodX && snake[i].y == foodY) { ok = false; }
    }
  }
}
function drawSnake() {
  var x, y, i, c;
  for (y = 0; y < snakeH; y++) for (x = 0; x < snakeW; x++) {
    c = snakeCell(x,y); if (c) { c.className = ''; }
  }
  c = snakeCell(foodX, foodY); if (c) { c.className = 'food'; }
  for (i = snake.length - 1; i >= 0; i--) {
    c = snakeCell(snake[i].x, snake[i].y);
    if (c) { c.className = i == 0 ? 'head' : 'snake'; }
  }
}
function startSnake() {
  if (!snakeRunning) {
    snakeRunning = true;
    setText('snake-status', 'Running');
    snakeTimer = window.setInterval(stepSnake, 150);
  }
  return false;
}
function changeSnake(x,y) {
  if (x == -dirX && y == -dirY) { return false; }
  nextX = x; nextY = y;
  startSnake(); return false;
}
function stepSnake() {
  var head, i, ate;
  dirX = nextX; dirY = nextY;
  head = {x:snake[0].x + dirX, y:snake[0].y + dirY};
  if (head.x < 0 || head.x >= snakeW || head.y < 0 || head.y >= snakeH) { endSnake(); return; }
  for (i = 0; i < snake.length; i++) {
    if (snake[i].x == head.x && snake[i].y == head.y) { endSnake(); return; }
  }
  snake.unshift(head);
  ate = head.x == foodX && head.y == foodY;
  if (ate) {
    snakeScore = snakeScore + 10;
    setText('snake-score', String(snakeScore));
    placeFood();
  } else { snake.pop(); }
  drawSnake();
}
function endSnake() {
  snakeRunning = false;
  if (snakeTimer) { window.clearInterval(snakeTimer); snakeTimer = null; }
  setText('snake-status', 'Game over. Score: ' + snakeScore);
}
function snakeKey(e) {
  e = e || window.event;
  var k = e.keyCode || e.which;
  if (k == 37 || k == 65) { changeSnake(-1,0); }
  else if (k == 38 || k == 87) { changeSnake(0,-1); }
  else if (k == 39 || k == 68) { changeSnake(1,0); }
  else if (k == 40 || k == 83) { changeSnake(0,1); }
}
