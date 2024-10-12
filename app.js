let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let highScore = 0;
let highScoreOld = 0;
let highScoreNew = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    started = true;
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameFlash(randBtn);
  gameSeq.push(randColor);
  console.log(gameSeq);
}

function checkAns(idx) {
  if (gameSeq[idx] === userSeq[idx]) {
    if (gameSeq.length == userSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    highScoreNew = level;
    if (highScoreNew > highScoreOld) {
      highScore = highScoreNew;
    } else {
      highScore = highScoreOld;
    }
    h2.innerHTML = `Game Over! Your score: <b>${level}</b> & highscore: <b>${highScore}</b> <br>Press any key to start.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "black";
    }, 150);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);
  let userColor = btn.classList;
  userSeq.push(userColor[1]);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  userSeq = [];
  gameSeq = [];
  level = 0;
  highScoreOld = highScoreNew;
}
