<?php
  const METHOD = INPUT_GET;
  const VILLE_REGEXP = "/^[[:alpha:]]([-' ]?[[:alpha:]])*$/";
  class ParmsException extends Exception{};

  $commune = filter_input(METHOD, 'ville', FILTER_VALIDATE_REGEXP, ['options'=>['regexp'=>VILLE_REGEXP]]);
  if ($commune == FALSE) {
    throw new ParmsException("Veuillez sélectionner une ville valide.");
  }
  $rayon = filter_input(METHOD, 'rayon', FILTER_VALIDATE_INT, ['options'=>['min_range'=>1]]);
  if ($rayon === NULL) {
    $rayon = 1;
  }
  else if ($rayon === FALSE) {
    throw new ParmsException("Veuillez Sélectionner un rayon");
  }

  $carburants = "";
  $all = $_GET['all'];
  $e10 = $_GET['e10'];
  $sp95 = $_GET['sp95'];
  $sp98 = $_GET['sp98'];
  $e85 = $_GET['e85'];
  $gazole = $_GET['gazole'];
  $gplc = $_GET['gplc'];
  if ($all === 'on') {
    $carburants = "1,2,3,4,5,6";
  }
  else {
    if ($gazole === 'on') {
      $carburants .= "1";
    }
    if ($sp95 === 'on') {
      if ($carburants != "") {
        $carburants .= ",";
      }
      $carburants .= "2";
    }
    if ($e85 === 'on') {
      if ($carburants != "") {
        $carburants .= ",";
      }
      $carburants .= "3";
    }
    if ($gplc === 'on') {
      if ($carburants != "") {
        $carburants .= ",";
      }
      $carburants .= "4";
    }
    if ($e10 === 'on') {
      if ($carburants != "") {
        $carburants .= ",";
      }
      $carburants .= "5";
    }
    if ($sp98 === 'on') {
      if ($carburants != "") {
        $carburants .= ",";
      }
      $carburants .= "6";
    }
  }

  if ($carburants == "") {
    throw new ParmsException("Veuillez sélectionner au moins un carburant.");
  }
 ?>
