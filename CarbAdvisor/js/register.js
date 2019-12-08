// BART Sébastien KROL Mikolaï Groupe 3
window.addEventListener('load', initRegister);

function initRegister(){
  document.forms.form_register.addEventListener('submit', sendFormRegister);
  document.getElementById("displayRegister").addEventListener('click', displayRegisterForm);
}

function sendFormRegister(ev){
  ev.preventDefault();
  let args = new FormData(this);
  fetchFromJson('services/createUtilisateur.php', { method: 'post', body: args, credentials: 'same-origin' })
  .then(processAnswer)
  .then(validRegister, errorRegister);
}

function validRegister(result){
  clean();
  actionConnexion();
  showResult(true,"Votre compte a été crée,"+result+", vous pouvez vous connecter");
}

function errorRegister(error){
  showResult(false, error.message);
}

function displayRegisterForm(){
  clean();
  let form = document.getElementById("register");
  form.classList.remove("notVisible");
}
