// BART Sébastien KROL Mikolaï Groupe 3
window.addEventListener('load', initActionConnection);

function initActionConnection(){
  let boutonConnexion = document.getElementById('menuConnexion');
  if (boutonConnexion !== null) {
    boutonConnexion.addEventListener('click', actionConnexion);
  }
}

function actionConnexion(){
  clean();
  displayConnexionForm();
  currentPage = document.getElementById('menuConnexion');
  highlightCurrentPage();
}

function displayConnexionForm(){
  let connexionForm = document.getElementById("connexion");
  connexionForm.classList.remove("notVisible");
}
