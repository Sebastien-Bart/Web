// BART Sébastien KROL Mikolaï Groupe 3
window.addEventListener('load', initInfos);

function initInfos(){
  document.getElementById('menuInfos').addEventListener('click', actionInfo);
}

function actionInfo(){
  currentPage = document.getElementById('menuInfos');
  clean();
  displayInfo();
  highlightCurrentPage();
}

function clean(){
  let childs = document.getElementById("contenuPage").children;
  for (var i = 0; i < childs.length; i++) {
    childs[i].classList.add("notVisible");
  }
}

function displayInfo(){
    let info = document.getElementById("infos");
    info.classList.remove("notVisible");
  }
