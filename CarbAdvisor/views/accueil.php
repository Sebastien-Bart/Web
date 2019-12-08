<!--KROL Mikolaï BART Sébastien Groupe 3 -->

<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Carbadvisor</title>
  <link rel="icon" href="img/gas_station.ico" />
  <link rel="stylesheet" href="style/index.css">
  <script src="js/fetchUtils.js"></script>
  <script src="js/scriptCarte.js"></script>
  <script src="js/checkbox.js"></script>
  <script src="js/menuAccueil.js"></script>
  <script src="js/menuConnexion.js"></script>
  <script src="js/menuDeconnexion.js"></script>
  <script src="js/menuInfos.js"></script>
  <script src="js/menuMesPosts.js"></script>
  <script src="js/menuMonProfil.js"></script>
  <script src="js/login.js"></script>
  <script src="js/register.js"></script>
  <script src="js/getResearchData.js"></script>
  <script src="js/Utils.js"></script>
  <script src="js/modifProfil.js"></script>
  <script src="js/writePost.js"></script>
  <script src="js/noteStation.js"></script>
  <script src="js/updateAvatar.js"></script>
  <script src="js/listePostStation.js"></script>
  <script src="js/loadBestStations.js"></script>
  <script src="js/getServicesPrix.js"></script>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
        integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
        crossorigin=""/>
  <script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"
          integrity="sha512-QVftwZFqvtRNi0ZyCtsznlKSWOStnDORoefr1enyq5mVL4tmKB3S/EnC3rRJcxCPavG10IcrVGSmPh6Qw5lwrg=="
          crossorigin=""></script>
</head>


<body>

  <div id="mask">

  </div>

  <header>
    <div id="titre">
      <img src="img/gas-pump-solid.svg" alt="img pompe">
      <h2>Carb'<span>advisor</span></h2>
    </div>
    <div id='menu'>
      <ul>
        <li id="menuInfos"><img title="Infos et sources" src="img/link-solid.svg" alt="liens"></li>
        <li class="separation"></li>
        <li id='menuAccueil'> <img title="Accueil" src="img/home-solid.svg" alt="maison (acceuil)"> </li>
        <li class="separation"></li>
        <li id='menuMesPosts'><img title="Mes Posts" src="img/comment-alt-regular.svg" alt="commentaire (mes posts)"></li>
        <li class="separation"></li>
        <li id='menuMonProfil'><img title="Mon Profil" src="img/user-regular.svg" alt="user (mon profil)"></li>
        <li class="separation"></li>
        <?php
        if (isset($_SESSION['ident'])) {
          echo "<li id='menuDeconnexion'><img title='Se déconnecter' src='img/deconnexion.png' alt='se deconnecter'></li>";
        }
        else {
          echo "<li id='menuConnexion'><img title='Se connecter' src='img/connexion.png' alt='se connecter'></li>";
        }
         ?>
      </ul>
    </div>
  </header>

  <div id="showResult">
    <p></p>
  <img src="img/arrow-circle-right-solid.svg" title="Fermez ce panneau" alt="fleche">
 </div>



  <div id="contenuPage">

    <div id="infos" class="notVisible">
      <h3> Infos et sources:</h3>
      <h4>Infos:</h4>
      <p>Ce site est la réalisation de KROL Mikolaï et BART Sébastien dans le cadre du second projet de la matière "Technologies
        du Web 2". (Licence Informatique 2 2018-2019 Groupe 3)</p>
        <p>Ce site utilise le serveur webtp de l'université, il est accessible par les liens suivants:
        <ul>
          <li> <a href="http://webtp.fil.univ-lille1.fr/~bart/projet2-tw2/index.php">http://webtp.fil.univ-lille1.fr/~bart/projet2-tw2/index.php</a> </li>
          <li> <a href="http://webtp.fil.univ-lille1.fr/~krol/projet2-tw2/index.php">http://webtp.fil.univ-lille1.fr/~krol/projet2-tw2/index.php</a> </li>
        </ul>
      </p>
      <h4>Sources:</h4>
      Images du menu:
      <ul>
        <li> <a href="https://fontawesome.com/icons/link?style=solid"> https://fontawesome.com/icons/link?style=solid </a> </li>
        <li> <a href="https://fontawesome.com/icons/arrow-circle-right?style=solid">https://fontawesome.com/icons/arrow-circle-right?style=solid</a> </li>
        <li> <a href="https://fontawesome.com/icons/gas-pump?style=solid">https://fontawesome.com/icons/gas-pump?style=solid</a> </li>
        <li> <a href="https://fontawesome.com/icons/user?style=regular">https://fontawesome.com/icons/user?style=regular</a> </li>
        <li> <a href="https://fontawesome.com/icons/home?style=solid">https://fontawesome.com/icons/home?style=solid</a> </li>
        <li> <a href="https://fontawesome.com/icons/comment-alt?style=regular">https://fontawesome.com/icons/comment-alt?style=regular</a> </li>
        <li> <a href="http://icons.iconarchive.com/icons/icons8/windows-8/256/Network-Connected-icon.png">http://icons.iconarchive.com/icons/icons8/windows-8/256/Network-Connected-icon.png</a> </li>
        <li> <a href="https://image.flaticon.com/icons/png/512/56/56805.png">https://image.flaticon.com/icons/png/512/56/56805.png</a> </li>
        <li> <a href="http://cdn-europe1.new2.ladmedia.fr/var/europe1/storage/images/europe1/economie/la-hausse-des-prix-des-carburants-se-poursuit-en-france-2887289/29600177-1-fre-FR/La-hausse-des-prix-des-carburants-se-poursuit-en-France.jpg">http://cdn-europe1.new2.ladmedia.fr/var/europe1/storage/images/europe1/economie/la-hausse-des-prix-des-carburants-se-poursuit-en-france-2887289/29600177-1-fre-FR/La-hausse-des-prix-des-carburants-se-poursuit-en-France.jpg</a> </li>
      </ul>
      <p>La carte utilisée et tout ce qui lui est attachée appartient à Leaflet.</p>

    </div>

  <div id="recherche">

    <div id="form_recherche">
      <form action="" method="get" name = "form_recherche">
        <div class="rayonEtVille">
          <div id="selecVille">
            <div class="titreInput">Ville :</div> <input type='text' name='ville' required placeholder="Rechercher une station"/><br/>
          </div>
          <div id="selecRayon">
            <div class="titreInput">Rayon (km):</div> <input type='number' name='rayon' value="1" min="1" required/><br/>
          </div>
        </div>
        <div id="selecCarburants"> <h3>Carburant(s):</h3>
          <div class="carburant">
            <label for="all"> Tous carburants </label>
            <input type="checkbox" name="all" id="all" checked/>
          </div>
          <div class="carburant">
            <label for="e10"> E10 </label>
            <input class="notAll" type="checkbox" name="e10" id="e10" checked/>
          </div>
          <div class="carburant">
            <label for="sp95"> SP95 </label>
            <input class="notAll" type="checkbox" name="sp95" id="sp95" checked />
          </div>
          <div class="carburant">
            <label for="sp98"> SP98 </label>
            <input class="notAll" type="checkbox" name="sp98" id="sp98" checked/>
          </div>
          <div class="carburant">
            <label for="e85"> E85 </label>
            <input class="notAll" type="checkbox" name="e85" id="e85" checked/>
          </div>
          <div class="carburant">
            <label for="gazole"> gazole </label>
            <input class="notAll" type="checkbox" name="gazole" id="gazole" checked/>
          </div>
          <div class="carburant">
            <label for="gplc"> GPLc </label>
            <input class="notAll" type="checkbox" name="gplc" id="gplc" checked/>
          </div>
        </div>
        <button id = "submit_search" type="submit" name="valid">Chercher</button>
      </form>
    </div>

  </div>

    <div id="conteneurButtonBests">
      <button type="button" id="bestStations">Actualiser les meilleures stations</button>
    </div>

    <div id="carte"></div>



    <div id="stations">
      <span id="error_stations"></span>
    </div>

    <div id="services_prix" class="notVisible">
      <button id="showServices">Voir les prix et services</button>
    </div>

    <div id="posts" class="notVisible"></div>

    <div id="create_post" class="notVisible">
      <form method="POST" action="" id="form_create_post" name="form_create_post">
        <h3>Donner son avis sur cette station</h3>
        <fieldset>
          <input type="text" name="titre" required autofocus placeholder="Titre">
          <input type="text" name="contenu" required autofocus placeholder="Donner son avis">
        </fieldset>
        <button type="submit" name="valid">Poster</button>
      </form>
      <span id="error_avis"></span>
    </div>

    <div id="note_station" class="notVisible">
      <form method="POST" action="" id="form_note_station" name="form_note_station">
        <h3>Noter cette station</h3>
        <fieldset>
          <label for="global">Note globale</label>
          <select name="global" required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <label for="accueil">Note accueil</label>
          <select name="accueil" required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <label for="prix">Note prix</label>
          <select name="prix" required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <label for="service">Note services</label>
          <select name="service" required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </fieldset>
        <button type="submit" name="valid">Noter</button>
      </form>
      <span id="error_note"></span>
    </div>

    <div class="notVisible" id="connexion">
      <form method="POST" action="" id="form_login">
        <h3>Se connecter</h3>
       <fieldset>
        <label for="pseudo">Login :</label>
        <input type="text" name="pseudo" id="pseudo" required="required" autofocus/>
        <label for="password">Mot de passe :</label>
        <input type="password" name="password" id="password" required="required" />
        <button type="submit" name="valid">OK</button>
       </fieldset>
      </form>
      <p>Pas de compte ?<button id="displayRegister">Créer un compte</button></p>
    </div>

    <div  class="notVisible" id="register">
      <form method="POST" action="" id="form_register">
        <h3>Se créer un compte</h3>
       <fieldset>
        <label for="pseudo">Login :</label>
        <input type="text" name="pseudo" id="pseudo" required="required" autofocus/>
        <label for="password">Mot de passe :</label>
        <input type="password" name="password" id="password" required="required" />
        <button type="submit" name="valid">OK</button>
       </fieldset>
      </form>
    </div>

    <div id="mesPosts" class="notVisible"></div>

    <div id="monProfil" class="notVisible"></div>

  </div>

  <?php
    if (isset($_SESSION['ident'])) {
      echo "<div id='statusLog' class='notVisible' data-status ='yes' data-pseudo='".$_SESSION['ident']->pseudo."'></div>";
    }
    else {
      echo '<div id="statusLog" class="notVisible" data-status="no"></div>';
    }
   ?>

</body>
</html>
