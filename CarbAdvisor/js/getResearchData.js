// BART Sébastien KROL Mikolaï Groupe 3
window.addEventListener('load', initResearch);

function initResearch(){
  document.forms.form_recherche.addEventListener('submit', sendFormResearch);
}

function sendFormResearch(ev){
  ev.preventDefault();
  let form = document.forms.form_recherche;
  let carbs = carbsToString();
  let args = "commune="+form.ville.value+"&rayon="+form.rayon.value+"&carburants="+carbs;
  fetchFromJson("http://webtp.fil.univ-lille1.fr/~clerbout/carburant/recherche.php?"+args)
  .then(processAnswerCarbs)
  .then(validResearch, errorResearch);
}

function validResearch(answer){
  if (answer == 0){
    showResult(false, "Aucune station trouvée correspondant à ces critères.")
  }
  else {
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
    document.getElementById("create_post").classList.add("notVisible");
    document.getElementById("note_station").classList.add("notVisible");
    document.getElementById('posts').classList.add("notVisible");
    document.getElementById('services_prix').classList.add("notVisible");
    if (document.getElementById("titreBestStations")!=undefined) {
      document.getElementById("titreBestStations").remove();
    }
    if (document.getElementById("hideServices")!=undefined) {
      document.getElementById("hideServices").classList.add("notVisible");
    }
  }

}

function completeTable(){
  for (tr of document.getElementById("infos_stations").childNodes) {
    fetchFromJson('services/findStation.php?id='+tr.id)
    .then(processAnswer)
    .then(completeRow, stationNotFound)
    .then(completeMap);
  }
}

function completeRow(answer){
  let tr = document.getElementById(answer.id);
  tr.dataset.lat = answer.latitude;
  tr.dataset.long = answer.longitude;

  while (tr.firstChild) {
    tr.removeChild(tr.firstChild);
  }

  td = document.createElement("td");
  td.classList.add("ville");
  td.textContent = answer.ville;
  tr.appendChild(td);

  td = document.createElement("td");
  td.classList.add("adresse");
  td.textContent = answer.cp + " " + answer.adresse;
  tr.appendChild(td);

  td = document.createElement("td");
  td.classList.add("note_globale");
  td.textContent = (answer.noteglobale / answer.nbnotes)>=0 ? (answer.noteglobale / answer.nbnotes).toFixed(1) +"/5" : "Pas encore de notes";
  tr.appendChild(td);

  td = document.createElement("td");
  td.classList.add("note_accueil");
  td.textContent = (answer.noteaccueil / answer.nbnotes)>=0 ? (answer.noteaccueil / answer.nbnotes).toFixed(1) +"/5" : "";
  tr.appendChild(td);

  td = document.createElement("td");
  td.classList.add("note_services");
  td.textContent = (answer.noteservice / answer.nbnotes)>=0 ? (answer.noteservice / answer.nbnotes).toFixed(1) +"/5" : "";
  tr.appendChild(td);

  td = document.createElement("td");
  td.classList.add("note_prix");
  td.textContent = (answer.noteprix / answer.nbnotes)>=0 ? (answer.noteprix / answer.nbnotes).toFixed(1) +"/5" : "";
  tr.appendChild(td);
}

function completeMap(answer){
  placerMarqueurs(layerGroup);
}

function stationNotFound(error){
  //ne rien faire
}

function errorResearch(error){
  showResult(false, "Aucune station trouvée, vérifiez vos informations.")
}

function carbsToString(){
  let form = document.forms.form_recherche;
  let all = form.all.checked;
  let e10 = form.e10.checked;
  let sp95 = form.sp95.checked;
  let sp98 = form.sp98.checked;
  let e85 = form.e85.checked;
  let gazole = form.gazole.checked;
  let gplc = form.gplc.checked;
  let res = "";
  if (all) {
    res = "1,2,3,4,5,6";
  }
  else {
    if (gazole) {
      res += "1";
    }
    if (sp95) {
      if (res != "") {
        res += ",";
      }
      res += "2";
    }
    if (e85) {
      if (res != "") {
        res += ",";
      }
      res += "3";
    }
    if (gplc) {
      if (res != "") {
        res += ",";
      }
      res += "4";
    }
    if (e10) {
      if (res != "") {
        res += ",";
      }
      res += "5";
    }
    if (sp98) {
      if (res != "") {
        res += ",";
      }
      res += "6";
    }
  }
  return res;
}
