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

$args = new RequestParameters("post");
$args->defineString('id');
$args->defineInt('global');
$args->defineInt('accueil');
$args->defineInt('prix');
$args->defineInt('service');

if ($args->isValid()){
    try{
      if($data->getStation($args->id)){
        $res1 = $data->noteStationUpdateStation($args->id, $args->global, $args->accueil, $args->prix, $args->service);
        $res2 = $data->noteStationUpdateUser($_SESSION['ident']->pseudo, $args->global);
        if ($res1 ==true && $res2 == true) {
          produceResult($data->getStation($args->id));
        }
        else {
          produceError('La note n\'a pas pu être attribuée');
        }
      }
      else {
        produceError('La station n\'existe pas');
      }

    } catch (PDOException $e){
        produceError($e->getMessage());
  }
}
else{
    produceError( implode(' ',$args->getErrorMessages()) );
  }


?>
