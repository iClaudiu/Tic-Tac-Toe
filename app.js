const game = document.getElementById("game");
const btnReset = document.getElementById("btnReset");

let player = "X",
  moves = 0;
let table = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
generateTable();
btnReset.addEventListener("click", resetGame);

game.addEventListener("click", (e) => {
  const tg = e.target;
  let r = parseInt(tg.getAttribute("r"));
  let c = parseInt(tg.getAttribute("c"));
  if (table[r][c]) return;
  table[r][c] = player;
  tg.innerHTML = player;
  moves++;
  if (gameOver(r, c, player)) {
    alert("Congratulations ${player}! You won!");
    btnReset.disabled = false;
  } else if (moves == 9) {
    alert("TIE!");
    btnReset.disabled = false;
  } else {
    changePlayer();
  }
});

function gameOver(r, c, player) {
  let cnt = 0;
  for (let i = 0; i < 3; i++) {
    //verify row
    if (table[r][i] == player) cnt++;
  }
  if (cnt == 3) return true;
  cnt = 0;
  for (let i = 0; i < 3; i++) {
    //verify column
    if (table[i][c] == player) cnt++;
  }
  if (cnt == 3) return true;
  cnt = 0;
  if (r == c) {
    //verify main diagonal
    for (let i = 0; i < 3; i++) {
      if (table[i][i] == player) cnt++;
    }
  } else if (r + c == 2) {
    //verify secondary diagonal
    for (let i = 0; i < 3; i++) {
      if (table[i][3 - i - 1] == player) cnt++;
    }
  }
  if (cnt == 3) return true;
  return false;
}

function changePlayer() {
  if (player == "X") player = "0";
  else player = "X";
  document.getElementById("player").textContent = player;
}

function resetGame() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      table[i][j] = null;
    }
  }
  Array.from(document.querySelectorAll("div[r]")).forEach((e) => {
    e.textContent = null;
  });
  document.getElementById("player").textContent = player;
  moves = 0;
}

function generateTable() {
  let r, c;
  for (let i = 0; i < 9; i++) {
    let e = document.createElement("div");
    r = Math.round((i + 2) / 3) - 1;
    c = Math.round(i % 3);
    e.setAttribute("r", r);
    e.setAttribute("c", c);
    game.appendChild(e);
  }
}
