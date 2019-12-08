// BART Sébastien KROL Mikolaï Groupe 3
window.addEventListener('load', loadBest);
window.addEventListener('load', setupListeners);

function setupListeners(){
  document.getElementById("bestStations").addEventListener('click', actionAccueil);
  document.getElementById("bestStations").addEventListener('click', loadBest);
}

function loadBest(){
  fetchFromJson("services/findBestStations.php")
  .then(processAnswer)
  .then(validResearchBest, errorResearch);
}

function validResearchBest(answer){
  let cible = document.getElementById("stations");
  if (document.getElementById("infos_stations") != undefined) {
    cible.removeChild(document.getElementById("infos_stations"));
  }
  let table = document.createElement("table");
  table.setAttribute("id", "infos_stations");
  let thead = document.createElement("thead");
  thead.classList.add("notVisible");

  let th = document.createElement("th");
  th.classList.add("ville");
  th.textContent = "Ville";
  thead.appendChild(th);

  th = document.createElement("th");
  th.classList.add("adresse");
  th.textContent = "Adresse";
  thead.appendChild(th);

  th = document.createElement("th");
  th.classList.add("note_globale");
  th.textContent = "Note Globale";
  thead.appendChild(th);

  th = document.createElement("th");
  th.classList.add("note_accueil");
  th.textContent = "Accueil";
  thead.appendChild(th);

  th = document.createElement("th");
  th.classList.add("note_services");
  th.textContent = "Services";
  thead.appendChild(th);

  th = document.createElement("th");
  th.classList.add("note_prix");
  th.textContent = "Prix";
  thead.appendChild(th);

  table.appendChild(thead);

  for (station of answer) {
    let tr = document.createElement("tr");
    tr.classList.add("notVisible");
    tr.setAttribute('id', station.id);
    tr.dataset.id = station.id;
    table.appendChild(tr);
  }
  cible.appendChild(table);

  completeTable();
}
