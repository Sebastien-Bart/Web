// BART Sébastien KROL Mikolaï Groupe 3

function actionPosts(){
  currentPage = document.getElementById("menuAccueil");
  let cible = document.getElementById("posts");
  cible.textContent = "";
  let bouton = document.getElementById("boutonCarte");
  let url = "services/findPosts.php?id="+bouton.value;
  fetchFromJson(url)
  .then(processAnswer)
  .then(loadPosts, errorLoadPosts);
  displayPosts();
}

function loadPosts(liste){
  let cible = document.getElementById("posts");
  cible.textContent = "";
  let titre = document.createElement('h3');
  titre.textContent = "Commentaires sur cette station";
  cible.appendChild(titre);
  for (post of liste) {
    let imgAvatar = document.createElement("img");
    imgAvatar.alt = "image Avatar en 48*48 (small)";
    loadAvatar("small", imgAvatar, post["auteur"]);
    let div = document.createElement('div');
    div.dataset.id = post["id"];
    div.dataset.auteur = post["auteur"];
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
    let auteur = document.createElement("div");
    auteur.className = "auteurPost";
    auteur.textContent = post["auteur"];
    auteur.dataset.auteur = post["auteur"];
    auteur.addEventListener("click", displayOtherUser);
    let titre = document.createElement("div");
    titre.className = "titrePost";
    titre.textContent = post["titre"].replace(regex, "'");
    div.appendChild(imgAvatar);
    div.appendChild(auteur);
    div.appendChild(date);
    div.appendChild(titre);
    div.appendChild(contenu);
    div.appendChild(nblike);
    div.appendChild(nbnolike);
    if (document.getElementById("statusLog").dataset.status == "yes" && div.dataset.auteur != document.getElementById("statusLog").dataset.pseudo) {
      let like = document.createElement("button");
      like.setAttribute('value', 'like');
      like.dataset.id = post.id;
      like.textContent = "Like";
      like.addEventListener("click", notePost);
      div.appendChild(like);
      let dislike = document.createElement("button");
      dislike.setAttribute('value', 'dislike');
      dislike.dataset.id = post.id;
      dislike.textContent = "Dislike";
      dislike.addEventListener("click", notePost);
      div.appendChild(dislike);
    }
    cible.appendChild(div);
  }
}

function displayOtherUser(){
  if (document.getElementById("statusLog").dataset.status != "yes") {
    alert("Vous devez être connecté pour voir ce profil.");
  }
  else {
    let pseudo = this.dataset.auteur;
    fetchFromJson("services/findUtilisateur.php?pseudo="+pseudo)
    .then(processAnswer)
    .then(validOtherUser, errorOtherUser);
  }
}

function validOtherUser(answer){
  let pseudo = "            Profil de "+ answer["pseudo"];
  let mail = answer["mail"];
  if (mail == undefined) {
    mail = "Mail non défini";
  }
  let ville = answer["ville"];
  if (ville == undefined) {
    ville = "Ville non définie";
  }
  let description = answer["description"];
  if (description == undefined) {
    description = "Pas encore de description.";
  }
  let nbavis = answer["nbavis"]+" notes données";
  if (answer["total"] == 0) {
    var moyenne = "Aucune note donnée pour l'instant";
  }
  else {
    var moyenne = "Moyenne des notes données : "+(answer["total"]/answer["nbavis"]).toFixed(1);
  }
  let nbposts = answer["nbposts"]+" posts rédigés";
  let nblike = answer["nblike"]+" like attribués";
  let nbnolike = answer["nbnolike"]+" dislike attribués";
  let texte = pseudo+"\n"+mail+"\n"+ville+"\n"+description+"\n"+nbavis+"\n"+moyenne+"\n"+nbposts+"\n"+nblike+"\n"+nbnolike;
  alert(texte);
}

function errorOtherUser(error){
  alert(error.message);
}

function notePost(){
  let args = new FormData();
  args.append('avis', this.value);
  args.append('id', this.dataset.id);
  fetchFromJson("services/notePost.php", { method: 'post', body: args, credentials: 'same-origin' })
  .then(processAnswer)
  .then(validAvis, errorAvis);
  this.setAttribute("disabled", "disabled");
}

function validAvis(answer){
  actionPosts();
  showResult(true,"Post noté !");
}

function errorAvis(error){
  actionPosts();
  showResult(false, error.message);
}

function errorLoadPosts(error){
  let cible = document.getElementById("posts");
  cible.textContent = "Aucun posts sur cette station.";
}

function displayPosts(){
  let mesPosts = document.getElementById("posts");
  mesPosts.classList.remove("notVisible");
}
