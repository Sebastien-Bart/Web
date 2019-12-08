// BART Sébastien KROL Mikolaï Groupe 3
window.addEventListener('load', initLogin);

function initLogin(){
  document.forms.form_login.addEventListener('submit', sendFormLogin);
}

function sendFormLogin(ev){
  ev.preventDefault();
  let args = new FormData(this);
  fetchFromJson('services/login.php', { method: 'post', body: args, credentials: 'same-origin' })
  .then(processAnswer)
  .then(validLogin, errorLogin);
}

function validLogin(result){
  actionAccueil();
  showResult(true, result+", vous êtes connecté.");
  transformConnexionToDeconnexion();
  let status = document.getElementById("statusLog");
  status.dataset.status = "yes";
  status.setAttribute("data-pseudo", result);
}

function errorLogin(error){
  showResult(false,error.message);
}

function transformConnexionToDeconnexion(){
  let bouton = document.getElementById("menuConnexion");
  bouton.removeEventListener("click", actionConnexion);
  bouton.id = "menuDeconnexion";
  let img = bouton.firstElementChild;
  img.src = "img/deconnexion.png";
  img.title = "Se déconnecter";
  img.alt = "img deco";
  bouton.addEventListener('click', actionDeconnexion);
}
