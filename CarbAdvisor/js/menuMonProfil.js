// BART Sébastien KROL Mikolaï Groupe 3
window.addEventListener('load', initAction);

function initAction(){
  document.getElementById('menuMonProfil').addEventListener('click', actionMonProfil);
}

function actionMonProfil(){
  clean();
  currentPage = document.getElementById("menuMonProfil");
  let data = document.getElementById("statusLog");
  if (data.dataset.status == "yes") {
    let url = "services/findUtilisateur.php?pseudo="+data.dataset.pseudo;
    fetchFromJson(url)
    .then(processAnswer)
    .then(loadMyProfile, errorLoadMyProfile);
    displayMonProfil();
    highlightCurrentPage();
  }
  else {
    actionConnexion();
  }
}

function loadAvatar(size, imgHTML, pseudo) {
    let changeAvatar = function(blob, imgHTML) {
      if (blob.type.startsWith('image/')){
        imgHTML.src = URL.createObjectURL(blob);
      }
    };
  fetchBlob('services/getAvatar.php?pseudo='+pseudo+"&size="+size)
    .then(function(blob) { changeAvatar(blob, imgHTML) });
}

function loadMyProfile(result){
  var regex = /&#39;/gi;
  var cible = document.getElementById("monProfil");
  cible.innerHTML = "";
  var modifiable = document.createElement("div");
  modifiable.id = "profilModifiable";
  modifiable.className = "monProfil";
  var formModifiable = document.createElement("form");
  formModifiable.id = "profilUpdateForm";
  formModifiable.method = "post";
  var specialAvatar = document.createElement("div");
  specialAvatar.id = "modifiableAvatar";
  specialAvatar.className = "monProfil";
  var formAvatar = document.createElement("form");
  formAvatar.id = 'form_avatar';
  formAvatar.method = "post";
  formAvatar.enctype = "multipart/form-data";
  formAvatar.action = "uploadAvatar.php";
  var nonModifiable = document.createElement("div");
  nonModifiable.id = "profilNonModifiable";
  nonModifiable.className = "monProfil";
  // profil -> nonModifiable
  let divPseudo = document.createElement("div");
  divPseudo.className = "pseudo";
  divPseudo.textContent = "Pseudo : ";
  divPseudo.appendChild(addSpanProfile(result["pseudo"]));
  nonModifiable.appendChild(divPseudo);
  // nbPosts -> nonModifiable
  let divnbPosts = document.createElement("div");
  divnbPosts.className = "nbPosts";
  divnbPosts.textContent = "Nombre de posts écrits : ";
  divnbPosts.appendChild(addSpanProfile(result["nbposts"]));
  nonModifiable.appendChild(divnbPosts);
  // nbAvis -> nonModifiable
  let divnbAvis = document.createElement("div");
  divnbAvis.className = "nbAvis";
  divnbAvis.textContent = "Nombre de notes données : ";
  divnbAvis.appendChild(addSpanProfile(result["nbavis"]));
  nonModifiable.appendChild(divnbAvis);
  // total des notes -> nonModifiable
  let divTotal = document.createElement("div");
  divTotal.className = "totalNote";
  divTotal.textContent = "Moyenne des notes données : ";
  divTotal.appendChild(addSpanProfile(result["nbavis"]!=0?(result["total"]/result["nbavis"]).toFixed(1):"aucune notes données pour l'instant"));
  nonModifiable.appendChild(divTotal);
  // nbNoLike -> nonModifiable
  let divnbNoLike = document.createElement("div");
  divnbNoLike.className = "nbNoLike";
  divnbNoLike.textContent = "Nombre de dislike attribué : ";
  divnbNoLike.appendChild(addSpanProfile(result["nbnolike"]));
  nonModifiable.appendChild(divnbNoLike);
  // nbLike -> nonModifiable
  let divnbLike = document.createElement("div");
  divnbLike.className = "nbLike";
  divnbLike.textContent = "Nombre de like attribué : ";
  divnbLike.appendChild(addSpanProfile(result["nblike"]));
  nonModifiable.appendChild(divnbLike);
  // Avatar -> Modifialble -> input file
  let divAvatar = document.createElement("div");
  divAvatar.className = "avatar";
  divAvatar.textContent = "Avatar : "; // ICI UTILISER GETAVATAR !!!!!!!
  let imgAvatar = document.createElement("img");
  imgAvatar.alt = "image Avatar en 256*256 (large)";
  loadAvatar("large", imgAvatar, result["pseudo"]); // verifier si c ok
  divAvatar.appendChild(imgAvatar);
  let inputAvatar = document.createElement("input");
  inputAvatar.type = "file";
  inputAvatar.name = "modifAvatar";
  inputAvatar.id = "modifAvatar";
  divAvatar.appendChild(inputAvatar);
  let boutonAvatar = document.createElement("button"); // cf. uploadAvatar.php
  boutonAvatar.type = "submit";
  boutonAvatar.textContent = "Changer Avatar";
  boutonAvatar.name = "boutonAvatar";
  divAvatar.appendChild(boutonAvatar);
  formAvatar.appendChild(divAvatar);
  formAvatar.addEventListener("submit",updateAvatar);
  specialAvatar.appendChild(formAvatar);
  // mail -> Modifialble -> input mail
  let divMail = document.createElement("div");
  divMail.className = "mail";
  divMail.textContent = "Mail : ";
  divMail.appendChild(addSpanProfile(result["mail"]));
  let inputMail = document.createElement("input");
  inputMail.type = "mail";
  inputMail.name = "mail";
  inputMail.id = "modifMail";
  inputMail.placeholder = "Modifier votre Mail.";
  divMail.appendChild(inputMail);
  formModifiable.appendChild(divMail);
  // ville -> Modifialble -> input text
  let divVille = document.createElement("div");
  divVille.className = "ville";
  divVille.textContent = "Ville : ";
  divVille.appendChild(addSpanProfile(result["ville"].replace(regex, "'")));
  let inputVille = document.createElement("input");
  inputVille.type = "texte";
  inputVille.name = "ville";
  inputVille.id = "modifVille";
  inputVille.placeholder = "Modifier votre ville.";
  divVille.appendChild(inputVille);
  formModifiable.appendChild(divVille);
  // description -> Modifialble -> input text 1024 char
  let divDescription = document.createElement("div");
  divDescription.className = "description";
  divDescription.textContent = "Description : ";
  divDescription.appendChild(addSpanProfile(result["description"].replace(regex, "'")));
  let inputDescription = document.createElement("input");
  inputDescription.type = "texte";
  inputDescription.name = "description";
  inputDescription.id = "modifDescription";
  inputDescription.maxlength = "1024";
  inputDescription.placeholder = "Modifier votre description.";
  divDescription.appendChild(inputDescription);
  formModifiable.appendChild(divDescription);
  // password -> Modifialble -> input text type password
  let divPassword = document.createElement("div");
  divPassword.className = "password";
  divPassword.textContent = "Mot de passe : "
  let inputPassword = document.createElement("input");
  inputPassword.type = "password";
  inputPassword.name = "password";
  inputPassword.id = "modifPassword";
  inputPassword.placeholder = "Modifier votre mot de passe.";
  divPassword.appendChild(inputPassword);
  formModifiable.appendChild(divPassword);
  // bouton pour changer les infos (sauf avatar) cf. service updateProfil.php
  let boutonUpdate = document.createElement("button");
  boutonUpdate.type = "submit";
  boutonUpdate.textContent = "Changer vos informations (sauf Avatar)";
  boutonUpdate.name = "boutonUpdate";
  formModifiable.addEventListener("submit", updateProfil);
  formModifiable.appendChild(boutonUpdate);
  modifiable.appendChild(formModifiable);
  cible.appendChild(nonModifiable);
  cible.appendChild(modifiable);
  cible.appendChild(specialAvatar);
  }

function addSpanProfile(text){
  var span = document.createElement("div");
  span.textContent = text;
  return span;
}

function errorLoadMyProfile(error){
  let cible = document.getElementById("monProfil");
  cible.innerHTML = error.message;
}

function displayMonProfil(){
  let mesPosts = document.getElementById("monProfil");
  monProfil.classList.remove("notVisible");
}
