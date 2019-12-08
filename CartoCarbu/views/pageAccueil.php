<!-- BART Sébastien KROL Mikolaï -->

<!doctype html>
  <html lang="fr">
    <head>
        <meta charset="utf-8">
        <title>Carto'Carbu</title>
        <script src="scripts/scriptCarte.js"></script>
        <script src="scripts/shadowForm.js"></script>
        <link rel="stylesheet" href="styles/pageAccueil.css">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
              integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
              crossorigin=""/>
        <script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"
                integrity="sha512-QVftwZFqvtRNi0ZyCtsznlKSWOStnDORoefr1enyq5mVL4tmKB3S/EnC3rRJcxCPavG10IcrVGSmPh6Qw5lwrg=="
                crossorigin=""></script>
        <script src="scripts/checkbox.js"></script>
    </head>
    <body>
      <header>
        <h1>Carto'Carbu</h1>
      </header>
      <div id="formulaire">
        <h3>Localisation</h3>
        <form action="" method="get">
          <div class="rayonEtVille">
            <div id="selecVille">
                <div class="titreInput">Ville:</div> <input type='text' name='ville' required/><br/>
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
          <button type="submit" name="valid">Chercher</button>
        </form>
        <?php
          if (isset($errorMessage)){
          	echo "<p id='error'><img src='images/exclamation-circle-solid.svg'>$errorMessage</p>";
         }
         elseif (isset($data)) {
           echo $data[0];
           if ($data[1]==0) {
             echo "<p>Aucune station trouvée dans ce périmètre.</p>";
           }
           elseif ($data[1]==1) {
             echo "<p>".$data[1]." station trouvée.</p>";
           }
           else {
             echo "<p>".$data[1]." stations trouvées.</p>";
           }
         }
        ?>
      </div>
      <div id="carteCampus"></div>
      <footer>
        Projet TW2, BART Sébastien et KROL Mikolaï (Groupe 3). <span id="credits"> Images: © <a href="https://fontawesome.com/license"/> Fontawesome </span>
      </footer>
    </body>
</html>
