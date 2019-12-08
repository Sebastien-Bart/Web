<?php
# KROL Mikolaï BART Sébastien Groupe 3
spl_autoload_register(function ($className) {
    include ("lib/{$className}.class.php");
});
date_default_timezone_set ('Europe/Paris');

set_include_path('..');

header('Content-type: application/json; charset=UTF-8');

require_once('lib/common_service.php');

$args = new RequestParameters();
$args->defineInt('id');

if ($args->isValid())
    try{
      $data = new DataLayer();
      $res = $data->getPosts($args->id);
      if ($res) {
        produceResult($res);
      }
      else {
        produceError('La station n\'a pas été trouvée');
      }
    } catch (PDOException $e){
        produceError($e->getMessage());
    }
else
    produceError( implode(' ',$args->getErrorMessages()) );


?>
