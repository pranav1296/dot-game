let start;
let gameArea;
let sliderSpeed;
let score = 0;
let isGamePaused = false;

// change the status of the game
const changeStatus = () => {
  var status = document.querySelector("#status");
  if (status.value === "Start") {
    startGame();
    status.value = "Pause";
    status.innerHTML = "Pause";
  } else if (status.value === "Resume") {
    resumeGame();
    status.value = "Pause";
    status.innerHTML = "Pause";
  } else {
    pauseGame();
    status.value = "Resume";
    status.innerHTML = "Resume";
  }
};
// start the game when start button is clicked
const startGame = () => {
  gameArea = document.querySelector("#game-area");
  let leftOffset = gameArea.offsetWidth;
  // after every 1000ms a new ball is generated with different size and position
  start = setInterval(() => {
    let width = Math.floor(Math.random() * 90) + 10;
    let leftPos = Math.floor(Math.random() * (leftOffset - width - 5));
    createBall(width, leftPos);
  }, 1000);
};
// resume game after clicking on Pause button
const resumeGame = () => {
  isGamePaused = false;
  // get all the balls present in the game and change their state to running
  const ballsList = document.querySelectorAll(".ball");
  for (const ball of ballsList) {
    ball.style.animationPlayState = "running";
  }
  // resume the game
  startGame();
};
// pause game after clicking the start button
const pauseGame = () => {
  // set the status of the game to paused
  isGamePaused = true;
  //get all the balls present in the game and change their state to paused
  const ballsList = document.querySelectorAll(".ball");
  for (const ball of ballsList) {
    ball.style.animationPlayState = "paused";
  }
  // stop producing new balls
  clearInterval(start);
};
// change the speed of the balls falling according to slider value
const updateSpeed = (event) => {
  sliderSpeed = event.target.value;
  // get all the balls present in the game
  const ballsList = document.querySelectorAll(".ball");
  for (const ball of ballsList) {
    ball.style.animationDuration = gameArea.offsetHeight / sliderSpeed + "s";
  }
};
// create a new with different size and position
const createBall = (width, left) => {
  // create a new div element
  var ball = document.createElement("div");
  ball.id = "ball";
  ball.style.width = width + "px";
  ball.style.height = width + "px";
  ball.style.left = left + "px";
  //
  ball.style.animationName = ball.className = "ball";
  ball.style.animationName = "slide-ball";
  // calculate the duration of the falling ball
  ball.style.animationDuration =
    gameArea.offsetHeight / parseInt(document.querySelector("#speed").value) +
    "s";
  ball.style.animationTimingFunction = "linear";
  // update the score and remove the ball from the game
  handleBubbleClick(ball, width);
  // handle the case where the ball reaches the bottom of the game area
  hanleEndAnimation(ball);
  // add the ball element to the DOM
  gameArea.appendChild(ball);
};
// handle the click event and update the score
const handleBubbleClick = (ball, width) => {
  ball.addEventListener("click", () => {
    if (!isGamePaused) {
      updateScore(width);
      ball.remove();
    }
  });
};
// handle the event when the ball reaches the bottom of the game area
const hanleEndAnimation = (ball) => {
  ball.addEventListener("animationend", () => {
    ball.remove();
  });
};
// Update the score after a ball is clicked
const updateScore = (size) => {
  let maxValue = 100;
  let scoreEle = document.getElementById("score");
  score += Math.floor(maxValue / size);
  scoreEle.value = score;
  scoreEle.innerHTML = score;
};
