<?php
# KROL Mikolaï BART Sébastien Groupe 3
spl_autoload_register(function ($className) {
    include ("lib/{$className}.class.php");
});
date_default_timezone_set ('Europe/Paris');

set_include_path('..');

header('Content-type: application/json; charset=UTF-8');

require_once('lib/common_service.php');

$args = new RequestParameters("post");
$args->defineNonEmptyString('pseudo');
$args->defineNonEmptyString('password');

if (isset($_SESSION["ident"])) {
  produceError("Vous ne pouvez pas créer un compte en étant connecté.");
}
else {
  if ($args->isValid()) {
    $data = new DataLayer();
    $res = $data->createUser($args->pseudo, $args->password);
    if ($res) {
      produceResult($args->pseudo);
    }
    else {
      produceError('Le pseudo existe déjà');
    }
  }
}



?>
