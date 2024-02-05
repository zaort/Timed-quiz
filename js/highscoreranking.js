function printHighscores() {
 // either get scores from localstorage or set to empty array
 var scoreranks = JSON.parse(window.localStorage.getItem('scoreranks')) || [];

 // sort highscores by score property in descending order
 scoreranks.sort(function (a, b) {
  return b.score - a.score;
 });

 for (var i = 0; i < scoreranks.length; i += 1) {
  // create li tag for each high score
  var liTag = document.createElement('li');
  liTag.textContent = scoreranks[i].initials + ' - ' + scoreranks[i].score;

  // display on page
  var olEl = document.getElementById('scoreranks');
  olEl.appendChild(liTag);
 }
}

function clearHighscores() {
 window.localStorage.removeItem('scoreranks');
 window.location.reload();
}

document.getElementById('clear').onclick = clearHighscores;

// run function when page loads
printHighscores();