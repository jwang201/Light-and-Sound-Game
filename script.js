/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// global constants
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence

//Global Variables
var pattern = [];
var numberOfButtons = 8;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5; //must be between 0.0 and 1.0
var guessCounter = 0;
var incorrectGuess = 0;
var currentScore = 0;
var maxScore = 0;
var progress = 0;
var clueHoldTime = 1000; //how long to hold each clue's light/sound
var cluePauseTime = 333; //how long to pause in between clues
var correctAudio = document.getElementById("win");
var incorrectAudio = document.getElementById("lost");
//var guess = new Audio("powerup.mp3");
var winPlaying = false;
var lostPlaying = false;

// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);
changeCurrentScore();
changeMaxScore();

// Sound Synthesis Functions based on D major scale
var freqMap = {
  1: 293.66, //D4
  2: 329.63, //E4
  3: 369.99, //F#4
  4: 392, //G4
  5: 440, //A4
  6: 493.88, //B4
  7: 554.37, //C#5
  8: 587.33, //D5
};

function getRandomNum(min, max) {
  return Math.random() * (max - min) + min;
}

function startGame() {
  //initialize game variables
  progress = 0;
  gamePlaying = true;
  //clue hold and paue times
  clueHoldTime = 1000;
  cluePauseTime = 333;
  //reset number of incorrect guesses
  incorrectGuess = 0;
  changeAttempts();
  //changes current score to 0
  currentScore = 0;
  changeCurrentScore();

  //set up the 8 random pattern values
  //momentarilly changed to 2 for debugging purposes
  for (let i = 0; i < 8; i++) {
    //we use math.round to make sure the value is one of the number of buttons
    let x = Math.round(getRandomNum(1, numberOfButtons));
    pattern[i] = x;
  }

  //set up frequencies for every button - has certain bugs so this is commented out for now
  /*
  let firstFrequency = 261.6 //lets the first frequency be C4
  for(let i = 0; i < numberOfButtons; i++)
    {
      //we multuply the frequency by approimately 1.059463094 twice in order to go up a note ex. C4 to D4
      freqMap[i+1] = firstFrequency * Math.pow((1.059463094 * 1.059463094), i);
    }
  */

  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  playClueSequence();
}

function stopGame() {
  //sets gamePlaying back to false
  gamePlaying = false;
  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");

  //reset the number of incorrect guesses
  incorrectGuess = 0;
}

function playTone(btn, len) {
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  context.resume();
  tonePlaying = true;
  setTimeout(function () {
    stopTone();
  }, len);
}
function startTone(btn) {
  if (!tonePlaying) {
    context.resume();
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    context.resume();
    tonePlaying = true;
  }
}
function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}
function playWinTone() {
  if (!winPlaying) {
    correctAudio.play();
  }
  winPlaying = true;
}
function stopWinTone() {
  winPlaying = false;
}

function playLostTone() {
  if (!lostPlaying) {
    incorrectAudio.play();
  }
  lostPlaying = true;
}
function stopLostTone() {
  lostPlaying = false;
}

function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}
function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}

function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

function playClueSequence() {
  guessCounter = 0;

  //decreases the waiting time by 15%; I set it to a decrease of 15% because 5% and 10% were not always noticeable
  cluePauseTime /= 1.15;
  clueHoldTime /= 1.15;

  let delay = nextClueWaitTime; //set delay to initial wait time
  for (let i = 0; i <= progress; i++) {
    // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i]); // set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime;
  }
}

function loseGame() {
  stopGame();
  playLostTone();
  alert("Game Over... You lost.");
}

function winGame() {
  stopGame();
  playWinTone();
  alert("Congratulations! You won the game!");
}

function guess(btn) {
  console.log("user guessed: " + btn);

  if (!gamePlaying) {
    return;
  }

  if (pattern[guessCounter] == btn) {
    //Guess was correct!
    if (guessCounter == progress) {
      currentScore++;
      changeCurrentScore();
      if (progress == pattern.length - 1) {
        //GAME OVER: WIN!
        winGame();
        changeMaxScore();
        incorrectGuess = 0;
        changeAttempts();
        currentScore = 0;
        changeCurrentScore();
        stopWinTone();
      } else {
        //Pattern correct. Add next segment
        progress++;
        playClueSequence();
      }
    } else {
      //so far so good... check the next guess
      guessCounter++;
    }
  }
  //Guess was incorrect
  else {
    //increase the counter for incorrect guesses
    incorrectGuess++;
    //end the game if incorrect guesses = 3
    if (incorrectGuess == 3) {
      changeMaxScore();
      loseGame();
      stopLostTone();
      document.getElementById("attempts").innerHTML = 0;
    } else {
      alert("Wrong guess... Only " + (3 - incorrectGuess) + " attempts left");
      changeAttempts();
    }
  }
}

function changeAttempts() {
  document.getElementById("attempts").innerHTML = 3 - incorrectGuess;
}

/*
function restoreOriginal(btn){
  document.getElementById("button" + btn).style.backgroundImage = "none";
}

function imageWhenLose(btn){
  document.getElementById("button" + btn).style.backgroundImage = "game_over_mario.png";
  setTimeout(restoreOriginal(btn), 1000, btn);
}

function imageWhenWin(btn){
  document.getElementById("button" + btn).style.backgroundImage = "mario_jump.png";
  setTimeout(restoreOriginal(btn), 1000, btn);
}
*/

function changeCurrentScore() {
  document.getElementById("scoreCount").innerHTML = currentScore;
}

function changeMaxScore() {
  if (currentScore > maxScore) {
    maxScore = currentScore;
  }
  document.getElementById("maxScoreCount").innerHTML = maxScore;
}
