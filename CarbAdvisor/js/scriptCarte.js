// BART Sébastien KROL Mikolaï Groupe 3
window.addEventListener("load", dessinerCarte);

function dessinerCarte(){
    map = L.map('carte').setView([50.517752, 3.06257], 9.2);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    map.on("popupopen",activerBouton);
    if (document.getElementById("infos_stations") != undefined) {
      placerMarqueurs(map);
    }
    layerGroup = L.layerGroup().addTo(map);
}

function activerBouton(ev) {
    var noeudPopup = ev.popup._contentNode;
    var bouton = noeudPopup.querySelector("button"); // le noeud DOM du bouton inclu dans le popup
    bouton.addEventListener("click",boutonActive); // en cas de click, on déclenche la fonction boutonActive
}

function boutonActive(ev) {
  // suppression de la classe marquee, si nécessaire
    document.getElementById("stations").classList.remove("notVisible");
    document.querySelector("table#infos_stations thead").classList.remove("notVisible");
    actionPosts();
    document.getElementById("error_stations").textContent = "";
    document.getElementById("showServices").dataset.id = this.value;
    document.getElementById("services_prix").classList.remove("notVisible");
    document.getElementById("showServices").classList.remove("notVisible");
    if (document.getElementById("services") != null) {
      document.getElementById("services").classList.add("notVisible");
      document.getElementById("prix").classList.add("notVisible");
      document.getElementById("hideServices").classList.add("notVisible");
    }
    if (document.getElementById("statusLog").dataset.status == "yes") {
      document.getElementById("form_create_post").dataset.id = this.value;
      document.getElementById("create_post").classList.remove("notVisible");
      document.getElementById("form_note_station").dataset.id = this.value;
      document.getElementById("note_station").classList.remove("notVisible");
    }
    var oldMarquee = document.querySelector("table#infos_stations tr.marquee");
    if (oldMarquee){
        oldMarquee.classList.add("notVisible");
        oldMarquee.classList.remove("marquee");
      }
    // this est ici le noeud DOM de <button>. La valeur associée au bouton est donc this.value
    // identifiant de la ligne correspondant au bouton cliqué :
    var identifiant = this.value;
    // et récupération de l'objet DOM de la ligne :
    var ligne =  document.getElementById(identifiant);
    ligne.classList.add("marquee");
    ligne.classList.remove("notVisible");
    // déplacement de la ligne pour la remonter en début de table :
    var parent = ligne.parentNode;
    parent.removeChild(ligne); //supprime la ligne
    parent.insertBefore(ligne, parent.firstChild); // et la ré-insère au debut
}

function placerMarqueurs(layerGroup) {
  layerGroup.clearLayers();
  var l = document.querySelectorAll("table>tr"); //liste de toutes les lignes
  var pointList= [];
  for (var i=0; i<l.length; i++){
      if (l[i].dataset.lat) {
        var ville = l[i].querySelector("td.ville").textContent;
        var id = l[i].dataset.id;
        var texte = ville + " <button id='boutonCarte' value=\""+id+"\">Choisir</button>";
        var point = [l[i].dataset.lat, l[i].dataset.long];
        var marker = L.marker(point).addTo(layerGroup);
        marker.bindPopup(texte);
        pointList.push(point);
      }
  }
  // ajustement de la zone d'affichage de la carte aux points marqués
   map.fitBounds(pointList);
}
