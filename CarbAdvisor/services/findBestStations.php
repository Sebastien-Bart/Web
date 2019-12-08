<?php
# KROL Mikolaï BART Sébastien Groupe 3
spl_autoload_register(function ($className) {
    include ("lib/{$className}.class.php");
});
date_default_timezone_set ('Europe/Paris');

set_include_path('..');

header('Content-type: application/json; charset=UTF-8');


require_once('lib/common_service.php');

try{
  $data = new DataLayer();
  $res = $data->get10Bests();
  if ($res) {
    produceResult($res);
  }
  else {
    produceError('Les stations n\'ont pas été trouvées');
  }
} catch (PDOException $e){
        produceError($e->getMessage());}
?>
