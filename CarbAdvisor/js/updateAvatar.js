// BART Sébastien KROL Mikolaï Groupe 3

function updateAvatar(ev){
  ev.preventDefault();
  let formData = new FormData(this);
  let url = 'services/uploadAvatar.php';
  fetchFromJson(url, {method : 'post', body : formData, 'credentials': 'same-origin'})
  .then(processAnswer)
  .then(validUpdateAvatar, errorUpdateAvatar)
  actionMonProfil();
}

function validUpdateAvatar(result){
  showResult(true, "Votre image de profil a été modifié avec succès.");
}

function errorUpdateAvatar(error){
  showResult(false, error.message);
}
