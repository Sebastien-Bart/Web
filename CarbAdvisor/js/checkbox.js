// BART Sébastien KROL Mikolaï Groupe 3

// mise en place des évènements
var setupListeners = function(){
  var boxes = document.getElementsByClassName('notAll');
  var all = document.getElementById('all');
  all.addEventListener('click', buttonAll);
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('click', checkAllIfEverythingChecked);
  }
}

window.addEventListener('load',setupListeners);

// Coche la case "tous carburants" si tous les carburants sont cochés
var checkAllIfEverythingChecked = function(){
  var everything = true;
  var boxes = document.getElementsByClassName('notAll');
  var all = document.getElementById('all');
  for (var i = 0; i < boxes.length; i++) {
    if (boxes[i].checked == false){
      everything = false;
    }
  }
  if (everything) {
    all.checked = true;
  }
  else {
    all.checked = false;
  }
}

// Coche tous les carburants quand on coche la case "tous carburants", et décoche tous les carburants si on décoche la
// case "tous carburants"
var buttonAll = function(){
  var all = document.getElementById('all');
  var boxes = document.getElementsByClassName('notAll');
  if (all.checked) {
    for (var i = 0; i < boxes.length; i++) {
      boxes[i].checked = true;
    }
  }
  else if (!all.checked) {
    for (var i = 0; i < boxes.length; i++) {
      boxes[i].checked = false;
    }
  }
}
