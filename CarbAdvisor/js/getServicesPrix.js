// BART Sébastien KROL Mikolaï Groupe 3
window.addEventListener('load', initResearch);

function initResearch(){
  document.getElementById("showServices").addEventListener('click', getServicesPrix);
}

function getServicesPrix(){
  let id = this.dataset.id;
  fetchFromJson("http://webtp.fil.univ-lille1.fr/~clerbout/carburant/infoStation.php?id="+id)
  .then(processAnswerCarbs)
  .then(validAnswer, errorAnswer);
}

function validAnswer(answer){
  document.getElementById("showServices").className = "notVisible";
  let cible = document.getElementById("services_prix");

  if (document.getElementById("prix") != undefined) {
    cible.removeChild(document.getElementById("prix"));
  }
  let table = document.createElement("table");
  table.setAttribute("id", "prix");
  let thead = document.createElement("thead");

  let th = document.createElement("th");
  th.classList.add("libelle");
  th.textContent = "Carburant";
  thead.appendChild(th);

  th = document.createElement("th");
  th.classList.add("prix");
  th.textContent = "Prix";
  thead.appendChild(th);

  th = document.createElement("th");
  th.classList.add("maj");
  th.textContent = "Dernière maj";
  thead.appendChild(th);
  table.appendChild(thead);

  for (prix of answer.prix) {
    let tr = document.createElement("tr");

    td = document.createElement("td");
    td.classList.add("libelle");
    td.textContent = prix.libellecarburant;
    tr.appendChild(td);

    td = document.createElement("td");
    td.classList.add("prix");
    td.textContent = prix.valeur + "€/L";
    tr.appendChild(td);

    td = document.createElement("td");
    td.classList.add("maj");
    td.textContent = prix.maj;
    tr.appendChild(td);

    table.appendChild(tr);
  }
  cible.appendChild(table);

  if (document.getElementById("services") != undefined) {
    cible.removeChild(document.getElementById("services"));
  }
  let tab = document.createElement("table");
  tab.id = "services"
  let theadServices = document.createElement("thead");
  let trHead = document.createElement("tr");
  let thHead = document.createElement("th");
  thHead.textContent = "Services proposés:";
  trHead.appendChild(thHead);
  theadServices.appendChild(trHead);
  tab.appendChild(theadServices);
  for (service of answer.services) {
    let trServices = document.createElement("tr");
    let tdServices = document.createElement("td");
    tdServices.textContent = service;
    trServices.appendChild(tdServices);
    tab.appendChild(trServices);
  }

  let button = document.createElement("button");
  button.textContent = "Cacher les prix et services";
  button.id = "hideServices";
  button.addEventListener("click", hideServices);

  cible.appendChild(tab);
  cible.appendChild(button);
}

function errorAnswer(error){
  showResult(false,error);
}

function hideServices(){
  this.className = "notVisible";
  let showButton = document.getElementById("showServices");
  showButton.removeAttribute("class");
  showButton.removeEventListener("click", getServicesPrix);
  showButton.addEventListener("click", showServicesAgain);
  document.getElementById("services").className = "notVisible";
  document.getElementById("prix").className = "notVisible";
}

function showServicesAgain(){
  this.className = "notVisible";
  document.getElementById("services").removeAttribute("class");
  document.getElementById("prix").removeAttribute("class");
  document.getElementById("hideServices").removeAttribute("class");
}
