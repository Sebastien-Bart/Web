<?php
# KROL Mikolaï BART Sébastien Groupe 3
spl_autoload_register(function ($className) {
    include ("lib/{$className}.class.php");
});
date_default_timezone_set ('Europe/Paris');

set_include_path('..');

header('Content-type: application/json; charset=UTF-8');

require('lib/db_parms.php');
$data = new DataLayer();
require_once('lib/watchdog_service.php');

require_once('lib/common_service.php');

if (isset($_FILES["modifAvatar"]) && $_FILES["modifAvatar"]["tmp_name"] != "") {
  $image = $_FILES["modifAvatar"];
  $imageSpec = ['data' => fopen($image["tmp_name"],'r'), 'mimetype' => $image["type"]];

  $args = array();

  foreach ($image as $key => $value) {
    if ($key !== 'tmp_name') {
      $args[$key] = $value;
    }
  }

  $pseudo = $_SESSION['ident']->pseudo;

  try{
      $res = $data->storeAvatar($imageSpec, $pseudo);
      if ($res) {
        echo json_encode(['status'=>'ok', 'result'=>true,'args'=>$args,'time'=>date('d/m/Y H:i:s')]);
        unset($image);
        unset($_FILES["modifAvatar"]);
      }
      else {
        produceError("Erreur: l'image pas pu être stockée");
      }
  } catch (PDOException $e){
    produceError($e->getMessage());
  }
}

else {
  produceError("Aucun fichier n'a été reçu.");
}


?>
