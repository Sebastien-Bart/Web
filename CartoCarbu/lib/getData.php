<!-- BART Sébastien KROL Mikolaï -->

<?php
//Récupèration des données en fonction des caractèristiques choisies dans le formulaire.
  $params = 'commune='.str_replace(' ','-',$commune).'&rayon='.$rayon.'&carburants='.$carburants;
  $tab = json_decode(file_get_contents('http://webtp.fil.univ-lille1.fr/~clerbout/carburant/stations.php?'.$params),true);
  if ($tab['status'] == 'error') {
    $tab = NULL;
    throw new ParmsException("Aucune station trouvée.. Veuillez vérifier que la ville renseignée existe");
  }

//Construit la table html qui contient toutes les informations des stations obtenues.
  function buildTable($tab){
    $count = 0;
    $chaine ='<table id="infosStations">';
    $data = $tab['data'];
    foreach ($data as $key => $station) {
      $count++;
      $chaine .= '<tr class="station'.$count.'">';
      $chaine .= "<td class='info' ";
      foreach ($station as $key => $info) {
        if ($key == 'prix') {
          $chaine .= '></td>';
          foreach ($info as $prix => $infoPrix) {
            $chaine .= "<td class='carburant' ";
            foreach($infoPrix as $attr => $valAttr){
              $chaine .= 'data-'.$attr.'="'.$valAttr.'" ';
            }
            $chaine .= '></td>';
          }
        }
        elseif ($key == 'services'){
          $chaine .= "<td class='services' ";
          foreach ($info as $serv1 => $serv2) {
            $chaine .= 'data-'.$serv1.'="'.$serv2.'" ';
          }
          $chaine .= '></td>';
        }
        else {
          $chaine .= 'data-'.$key.'="'.$info.'" ';
        }
      }
      $chaine .= "</tr>";
    }
    $chaine .= "</table>";
    return [$chaine, $count];
  }
 ?>
