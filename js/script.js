// access to elements
var StartButton = document.getElementById("startbutton");
// var question = document.getElementById("question")
var initialsEl = document.getElementById("initials");
var optionsEl = document.getElementById("options");
var timerEl = document.getElementById("seconds");
var quizSection = document.getElementById("quizcontainer");
var wrongRightMsg = document.getElementById("feedback");
var IntroSection = document.getElementById("introcontainer");
var submitButton = document.getElementById("submit")

// trackers for status on the current exam
var questionTracker = 0;
var seconds = questiondb.length * 10;
var secondsId;

function quizInit() {
 // we start by hiding the intro section
 IntroSection.setAttribute('class', 'hide');
 // unhide the quiz container
 quizSection.removeAttribute('class');

 secondsId = setInterval(countdown, 1000);

 timerEl.textContent = seconds;

 obtainQuestion();
};

function terminateTest() {
 clearInterval(secondsId)

 var testResultScreen = document.getElementById('results');
 testResultScreen.removeAttribute('class');

 var resultSummary = document.getElementById('score');
 resultSummary.textContent = seconds;

 quizSection.setAttribute('class', 'hide')
}

// Timer that counts down seconds
function countdown() {
 seconds--;
 timerEl.textContent = seconds;
 // terminate test if user rans out of time
 if (seconds <= 0) {
  terminateTest();
 }
}

function obtainQuestion() {
 var questionId = questiondb[questionTracker];

 var questionEl = document.getElementById('question');
 questionEl.textContent = questionId.q;

 optionsEl.innerHTML = '';

 for (var index = 0; index < questionId.o.length; index++) {
  var option = questionId.o[index];
  var answerOptionEl = document.createElement('button');
  answerOptionEl.setAttribute('class', 'option');
  answerOptionEl.setAttribute('value', option);

  answerOptionEl.textContent = index + 1 + '. ' + option;

  optionsEl.appendChild(answerOptionEl);
 }
}

function quizInteraction(click) {
 var buttons = click.target;

 if (!buttons.matches('.option')) {
  return;
 }

 if (buttons.value !== questiondb[questionTracker].a) {
  seconds -= 10;

  if (seconds < 0) {
   seconds = 0;
  }

  timerEl.textContent = seconds;

  wrongRightMsg.textContent = 'Incorrect :(';
 } else {
  wrongRightMsg.textContent = 'Correct :)'
 }

 wrongRightMsg.setAttribute('class', 'feedback');
 setTimeout(() => {
  wrongRightMsg.setAttribute('class', 'feedback hide')
 }, 1000);

 questionTracker++;

 if (seconds <= 0 || questionTracker === questiondb.length) {
  terminateTest();
 } else {
  obtainQuestion();
 }
}

function registerScore() {
 var initials = initialsEl.value.trim();

 if (initials !== '') {

  var scoreranks = JSON.parse(window.localStorage.getItem('scoreranks')) || [];

  var newScore = {
   score: seconds,
   initials: initials,
  };

  scoreranks.push(newScore);
  window.localStorage.setItem('scoreranks', JSON.stringify(scoreranks));

  window.location.href = 'highscorelist.html';
 }
}

function enterCheck(event) {
 if (event.key === 'Enter') {
  registerScore();
 }
}

submitButton.onclick = registerScore;
StartButton.onclick = quizInit;
optionsEl.onclick = quizInteraction;
initialsEl.onkeyup = enterCheck;



