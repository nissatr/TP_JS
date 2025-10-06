let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};
let isAutoPlaying = false;
let intervalId; 

//fonction autoplay exo 4
function toggleAutoPlay() {
  const button = document.querySelector('.js-auto');

  if (!isAutoPlaying) {
    button.innerText = 'Stop Auto Play';
    isAutoPlaying = true;

    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);

  } else {
    button.innerText = 'Auto Play';
    isAutoPlaying = false;
    clearInterval(intervalId);
  }
}

updateScoreElement();
// ajout du bouton autoplay
document.querySelector('.js-auto')
  .addEventListener('click', () => {
    toggleAutoPlay();
  });

document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("rock");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("paper");
});

document.querySelector(".js-scissors-button").addEventListener("click", () => {
  playGame("scissors");
});

/*
  Add an event listener
  if the user presses the key r => play rock
  if the user presses the key p => play paper
  if the user presses the key s => play scissors
  */

  document.addEventListener("keydown", function (e) {
    handleEvent(e);
  });
  
  function handleEvent(event) {
    const key = event.key.toLowerCase(); 
  
    if (key === "r") {
      console.log("vous avez joué");
      playGame("rock");
    } else if (key === "p") {
      console.log("vous avez joué");
      playGame("paper");
    } else if (key === "s") {
      console.log("vous avez joué");
      playGame("scissors");
    } else {
      alert("Tapez r ou p ou s");
    }
  }
  

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";

  if (playerMove === computerMove) {
    result = "Tie.";
    score.ties++;
  } else if (
    (playerMove === "rock" && computerMove === "scissors") ||
    (playerMove === "paper" && computerMove === "rock") ||
    (playerMove === "scissors" && computerMove === "paper")
  ) {
    result = "You win";
    score.wins++;
  } else {
    result = "You lose.";
    score.losses++;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result ").innerHTML = result;
  document.querySelector(".js-moves").innerHTML = `
    <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon">
  `;

  // calculate result
  // update the score and store it using localStorage.setItem
  // show the new score and the updated images using "document.querySelector"
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }

  return computerMove;
}

