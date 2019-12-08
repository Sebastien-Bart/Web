// BART Sébastien KROL Mikolaï Groupe 3

window.addEventListener('load', setUpListeners);

function setUpListeners() {
  var elemMenu = document.querySelectorAll("#menu li[id]");
  for (elem of elemMenu) {
    elem.addEventListener("click",highlightCurrentPage);
  }
  currentPage = document.getElementById("menuAccueil");
  currentPage.style.backgroundColor = "rgb(0, 230, 115)";
  document.getElementById('showResult').addEventListener('click', removeResult);
  document.getElementById("titre").addEventListener("click", actionAccueil);
  document.getElementById("selecVille").addEventListener("click",displayFormRecherche);
  document.getElementById("mask").addEventListener("click", hideFormRecherche);
  document.getElementById("submit_search").addEventListener("click", hideFormRecherche);
}

var currentPage;

function highlightCurrentPage(){
  for (elem of document.querySelectorAll("#menu li[id]")) {
    elem.style.backgroundColor = "white";
  }
  currentPage.style.backgroundColor = "rgb(0, 230, 115)";
}

function processAnswer(answer){
 if (answer.status == 'ok') {
   return answer.result;
 }
 else {
   throw new Error(answer.message)
 }
}

function processAnswerCarbs(answer){
 if (answer.status == 'ok') {
   return answer.data;
 }
 else if (answer.taille == 0) {
   return 0;
 }
 else {
   throw new Error(answer.message)
 }
}

function showResult(success, message){
  var cible = document.getElementById("showResult");
  cible.firstElementChild.textContent = message;
  if (success) {
    cible.style.backgroundColor = "rgb(1, 161, 37)";
  }
  else {
    cible.style.backgroundColor = "#7e1515";
  }
  cible.style.right = "-80px";
}

function removeResult(){
  this.style.right = "-1000px";
}

function displayFormRecherche(){
  let mask = document.getElementById("mask");
  let divRecherche = document.getElementById("recherche");
  let formRecherche = document.getElementById("form_recherche");
  formRecherche.style.transitionDuration = "1s";
  mask.style.display = "inherit";
  divRecherche.style.overflow = "visible";
  formRecherche.style.height = "400px";
  formRecherche.style.zIndex = "10";
}

function hideFormRecherche(){
  let mask = document.getElementById("mask");
  mask.style.display = "none";
  let divRecherche = document.getElementById("recherche");
  divRecherche.style.overflow = "hidden";
  let formRecherche = document.getElementById("form_recherche");
  formRecherche.style.transitionDuration = "0s";
  formRecherche.style.height = "60px";
  formRecherche.style.zIndex = "6";
}
