// BART Sébastien KROL Mikolaï Groupe 3
window.addEventListener('load', initAction);

function initAction(){
  document.getElementById('menuMesPosts').addEventListener('click', actionMesPosts);
}

function actionMesPosts(){
  clean();
  currentPage = document.getElementById("menuMesPosts");
  let data = document.getElementById("statusLog");
  if (data.dataset.status == "yes") {
    let url = "services/findMesPosts.php";
    fetchFromJson(url)
    .then(processAnswer)
    .then(loadMyPosts, errorLoadMyPosts);
    displayMyPosts();
  }
  else {
    actionConnexion();
  }
}

function loadMyPosts(liste){
  let cible = document.getElementById("mesPosts");
  cible.textContent = "";
  for (post of liste) {
    let div = document.createElement('div');
    div.dataset.id = post["id"];
    div.className = "post";
    let contenu = document.createElement("div");
    contenu.className = "contenuPost";
    var regex = /&#39;/gi;
    contenu.textContent = post["contenu"].replace(regex, "'");
    let nblike = document.createElement('div');
    nblike.className = "nblikePost";
    nblike.textContent = post["nblike"];
    let nbnolike = document.createElement('div');
    nbnolike.className = "nbnolikePost";
    nbnolike.textContent = post["nbnolike"];
    let date = document.createElement('div');
    date.className = "datePost";
    date.textContent = post["datecreation"];
    let imgAvatar = document.createElement("img");
    imgAvatar.alt = "image Avatar en 48*48 (small)";
    loadAvatar("small", imgAvatar, post["auteur"]);
    let auteur = document.createElement("div");
    auteur.className = "auteurPost";
    auteur.textContent = post["auteur"];
    let titre = document.createElement("div");
    titre.className = "titrePost";
    titre.textContent = post["titre"].replace(regex, "'");
    let button = document.createElement("button");
    button.dataset.id = post["id"];
    button.setAttribute("value", "deletePost");
    button.textContent = "Supprimer";
    button.addEventListener("click", deletePost);
    div.appendChild(imgAvatar);
    div.appendChild(auteur);
    div.appendChild(date);
    div.appendChild(titre);
    div.appendChild(contenu);
    div.appendChild(nblike);
    div.appendChild(nbnolike);
    div.appendChild(button);
    cible.appendChild(div);
  }
}

function deletePost(){
  let id = this.dataset.id;
  let args = new FormData();
  args.append('id', id);
  fetchFromJson("services/deletePost.php", { method: 'post', body: args, credentials: 'same-origin' })
  .then(processAnswer)
  .then(validDeletePost, errorDeletePost);
}

function validDeletePost(answer){
  let div = document.querySelector("#mesPosts div[data-id='"+answer+"']");
  let cible = document.getElementById("mesPosts");
  cible.removeChild(div);
  showResult(true, "Ce post a été supprimé.");
}

function errorDeletePost(error){
  showResult(false, error.message);
}

function errorLoadMyPosts(error){
  let cible = document.getElementById("mesPosts");
  cible.textContent = "Vous n'avez encore rien posté.";
}

function displayMyPosts(){
  let mesPosts = document.getElementById("mesPosts");
  mesPosts.classList.remove("notVisible");
}
