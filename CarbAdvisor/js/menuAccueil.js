// BART Sébastien KROL Mikolaï Groupe 3
window.addEventListener('load', initAction);

function initAction(){
  document.getElementById('menuAccueil').addEventListener('click', actionAccueil);
}

function actionAccueil(){
  currentPage = document.getElementById('menuAccueil');
  clean();
  displayAccueil();
  highlightCurrentPage();
}

function clean(){
  let childs = document.getElementById("contenuPage").children;
  for (var i = 0; i < childs.length; i++) {
    childs[i].classList.add("notVisible");
  }
}

function displayAccueil(){
    let meilleuresStations = document.getElementById("conteneurButtonBests");
    meilleuresStations.classList.remove("notVisible");
    let carte = document.getElementById("carte");
    carte.classList.remove("notVisible");
    let form = document.getElementById("recherche");
    form.classList.remove("notVisible");
  }
