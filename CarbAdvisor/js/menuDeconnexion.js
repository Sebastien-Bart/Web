// BART Sébastien KROL Mikolaï Groupe 3
window.addEventListener('load', initAction);

function initAction(){
  let boutonDeconnexion = document.getElementById('menuDeconnexion');
  if (boutonDeconnexion !== null) {
    boutonDeconnexion.addEventListener('click', actionDeconnexion);
  }
}

function actionDeconnexion(){
  clean();
  let url = 'services/logout.php';
  fetchFromJson(url)
  .then(processAnswer)
  .then(validLogout, displayErrorLogout);
  let status = document.getElementById("statusLog");
  status.dataset.status = "no";
  transformDeconnexionToConnexion();
  document.getElementById("monProfil").textContent = "";
  document.getElementById("mesPosts").textContent = "";
}

function validLogout(result){
  actionAccueil();
  showResult(true, "Vous êtes bien déconnecté(e).");
}

function displayErrorLogout(error){
  showResult(false, error.message);
}

function transformDeconnexionToConnexion(){
  let bouton = document.getElementById("menuDeconnexion");
  bouton.removeEventListener("click", actionDeconnexion);
  bouton.id = "menuConnexion";
  let img = bouton.firstElementChild;
  img.src = "img/connexion.png";
  img.title = "Se connecter";
  img.alt = "img co";
  bouton.addEventListener('click', actionConnexion);
}
