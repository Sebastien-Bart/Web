// BART Sébastien KROL Mikolaï

window.addEventListener("load", activeShadow);

function activeShadow(){
  table = document.getElementById("infosStations");
  form = document.getElementById("formulaire");
  if (table !== null) {
    if (table.hasChildNodes()) {
      form.setAttribute("class", "formValid");
    }
    else {
      form.setAttribute("class", "formError");
    }
  }
}
