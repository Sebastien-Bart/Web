// BART Sébastien KROL Mikolaï Groupe 3
function updateProfil(ev){
  ev.preventDefault();
  let args = new FormData(this);
  fetchFromJson('services/updateProfil.php', { method: 'post', body: args, credentials: 'same-origin' })
  .then(processAnswer)
  .then(validUpdateProfil, errorUpdateProfil);
  actionMonProfil();
}

function validUpdateProfil(result){
  showResult(true, "Vos informations ont bien été modifiées.");
}

function errorUpdateProfil(error){
  showResult(false, error.message);
}
