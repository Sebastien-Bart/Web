// BART Sébastien KROL Mikolaï

window.addEventListener("load",dessinerCarte);

// fonction de mise en place de la carte.
// Suppose qu'il existe dans le document
// un élèment possédant id="cartecampus"
function dessinerCarte(){
    // création de la carte
    // cette carte sera dessinée dans l'élèment HTML "carteCampus"
    var map = L.map('carteCampus').setView([50.517752, 3.06257], 9.2);

    // ajout du fond de carte OpenStreetMap
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Mise en place d'une gestionnaire d'évènement : activerBouton se déclenchera à chaque ouverture de popup
    map.on("popupopen",activerBouton);

    placerMarqueurs(map);
}

// gestionnaire d'évènement (déclenché lors de l'ouverture d'un popup)
// cette fonction va rendre actif le bouton inclus dans le popup en lui associant un gestionnaire d'évènement
function activerBouton(ev) {
    var noeudPopup = ev.popup._contentNode; // le noeud DOM qui contient le texte du popup
    var bouton = noeudPopup.querySelector("button"); // le noeud DOM du bouton inclu dans le popup
    bouton.addEventListener("click",boutonActive); // en cas de click, on déclenche la fonction boutonActive
}

// gestionnaire d'évènement (déclenché lors d'un click sur le bouton dans un popup)
function boutonActive(ev) {
    // this est ici le noeud DOM de <button>.
    // on va constuire le message affiché dans l'alert qui s'ouvre en appuyant sur le button
    var tds = document.querySelectorAll("tr."+this.className+" > td");
    var message = "Informations sur cette station:\n \n";
    var messCarb = "Propose les carburants suivants:\n";
    var messServices = "";
    var messInfo = "";
    for (var td of tds) {
      if (td.className == "info") {
        messInfo += "Adresse: "+td.dataset.adresse+"\n";
        messInfo += "Ville: "+td.dataset.ville+"\n";
        messInfo += "Code postal: "+td.dataset.cp+"\n";
        if (td.dataset.nom) {
          messInfo += "Nom: "+td.dataset.nom+"\n";
        }
        if (td.dataset.marque) {
          messInfo += "Marque: "+td.dataset.marque+"\n";
        }
        if (td.dataset.pop == "A") {
          messInfo += "Position: Autoroute\n";
        }
        else {
          messInfo += "Position: Route\n";
        }
        if (td.dataset.automate24 == "1") {
          messInfo += "Disponibilité: A des bornes 24h/24\n";
        }
        else {
          messInfo += "Disponibilité: Recherchez les horaires\n";
        }
      }
      else if (td.className == "services") {
        if (typeof td.dataset[0] !== 'undefined') {
          messServices += "Propose les services suivants:\n";
        }
        for (var attr in td.dataset) {
          messServices += "- "+td.dataset[attr]+"\n";
        }
        if (typeof td.dataset[0] !== 'undefined') {
          messServices += "\n";
        }
      }
      else if (td.className == "carburant") {
        messCarb += td.dataset.libellecarburant+": ";
        messCarb += td.dataset.valeur+"€/l";
        messCarb += " (MAJ le: "+td.dataset.maj+")\n";
      }
    }
    messCarb += "\n";
    messInfo += "\n";

    message += messInfo + messCarb + messServices;
    alert(message);
}

function placerMarqueurs(map) {
   var l = document.querySelectorAll("td.info"); //liste de tous les td qui contiennent les infos sur les stations
   var pointList= [];
   for (var i=0; i<l.length; i++){ // pour chaque td, insertion d'un marqueur sur la carte
        var lat = l[i].dataset.latitude;
        var lon = l[i].dataset.longitude;
        var nom = l[i].dataset.nom;
        var ville = l[i].dataset.ville;
        // texte du popup.
        if (nom !== "") {
          var texte = nom + " </br><button class='"+l[i].parentNode.className+"'>Sélectionner</button>";
        }
        else {
          var texte = ville.toUpperCase() + " </br><button class='"+l[i].parentNode.className+"'>Sélectionner</button>";
        }

        // insertion du marqueur selon les coordonnées trouvées dans les attributs data-latitude et data-longitude :
        var point = [lat, lon];
        L.marker(point).addTo(map).bindPopup(texte);
        pointList.push(point);
   }
   // ajustement de la zone d'affichage de la carte aux points marqués
    map.fitBounds(pointList);
}
