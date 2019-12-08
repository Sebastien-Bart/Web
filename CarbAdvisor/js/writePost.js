
// BART Sébastien KROL Mikolaï Groupe 3
window.addEventListener('load', initPost);

function initPost(){
  document.forms.form_create_post.addEventListener('submit', createPost);
}

function createPost(ev){
  ev.preventDefault();
  let form = document.forms.form_create_post;
  let args = new FormData(this);
  args.append('station', form.dataset.id);
  fetchFromJson("services/createPost.php", { method: 'post', body: args, credentials: 'same-origin' })
  .then(processAnswer)
  .then(validPost, errorPost);
}

function validPost(answer){
  let form = document.forms.form_create_post;
  form.contenu.value = "";
  form.titre.value = "";
  showResult(true, "Avis posté.");
  actionPosts();
}

function errorPost(error){
  showResult(false, error.message);
}
