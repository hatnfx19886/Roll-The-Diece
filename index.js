// Selecting elements
const player0El = document.getElementById("player-0");
const player1El = document.getElementById("player-1");
const scoreEl0 = document.getElementById("score-0");
const scoreEl1 = document.getElementById("score-1");
const current0El = document.getElementById("current-0");
const current1El = document.getElementById("current-1");
const diceEl = document.querySelector(".dice");
const btnNewGame = document.querySelector(".new-game");
const btnRoll = document.querySelector(".roll");
const btnHold = document.querySelector(".hold");

let scores, currentScore, activePlayer, playing;
// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player-winner");
  player1El.classList.remove("player-winner");
  player0El.classList.add("player-active");
  player1El.classList.remove("player-active");
};
init();
// Change player
const changePlayer = function () {
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player-active");
  player1El.classList.toggle("player-active");
};
// Roll the dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2.Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    // 3. Check for rolled 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent =
        currentScore;
    } else changePlayer();
  }
});

// Hold
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];

    // Finish game
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .getElementById(`player-${activePlayer}`)
        .classList.add("player-winner");
      document
        .getElementById(`player-${activePlayer}`)
        .classList.remove("player-active");
      diceEl.classList.add("hidden");
      // Continue game
    } else changePlayer();
  }
});
// Reset game
btnNewGame.addEventListener("click", init);
