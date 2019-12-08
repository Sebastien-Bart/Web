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

try{
  $res = $data->getMyPosts($_SESSION['ident']->pseudo);
  if ($res) {
    produceResult($res);
  }
  else {
    produceError('Utilisateur non trouvé');
  }
} catch (PDOException $e){
    produceError($e->getMessage());
}

?>
