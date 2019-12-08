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
$args->defineString('station');
$args->defineString('titre');
$args->defineString('contenu');

if ($args->isValid())
    try{
      if ($data->getStation($args->station)) {
        $res = $data->createPost($args->station, $args->titre, $_SESSION['ident']->pseudo, $args->contenu, date('d/m/Y H:i:s'));
        $data->updateUserAfterCreatedPost($_SESSION['ident']->pseudo);
        if ($res) {
          produceResult($data->getMaxIdPost());
        }
      }
      else {
        produceError("Erreur: le post n'a pas été crée");
      }
    } catch (PDOException $e){
        produceError($e->getMessage());
    }
else
    produceError( implode(' ',$args->getErrorMessages()) );


?>
