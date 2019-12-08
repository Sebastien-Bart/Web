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
$args->defineInt('id');

if ($args->isValid()){
    try{
      if ($data->validIdPosts($args->id)) {
        $res = $data->deletePost($args->id);
        $data->updateUserAfterDeletedPost($_SESSION['ident']->pseudo);
        if ($res) {
          produceResult($args->id);
        }
        else {
          produceError("Erreur: le post n'a pas été supprimé");
        }
      }
      else {
        produceError('Le post n\'existe pas.');
      }
    } catch (PDOException $e){
        produceError($e->getMessage());
    }
  }
else
    produceError( implode(' ',$args->getErrorMessages()) );


?>
