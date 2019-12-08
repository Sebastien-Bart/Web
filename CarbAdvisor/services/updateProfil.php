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

$pseudo = $_SESSION['ident']->pseudo;

$args = new RequestParameters("post");
$args->defineString('mail');
$args->defineString('ville');
$args->defineString('description');
$args->defineString('password');

if ($args->isValid()){
  try{
    if ($args->ville === "" && $args->mail === "" && $args->description === "" && $args->password === "") {
      produceError("Vous n'avez rien changé: aucun des champs n'étaient rempli.");
    }
    else {
      if ($args->ville !== "") {
        $data->modifyVille($pseudo, $args->ville);
      }
      if ($args->mail !== "") {
        $data->modifyMail($pseudo, $args->mail);
      }
      if ($args->description !== "") {
        $data->modifyDescription($pseudo, $args->description);
      }
      if ($args->password !== "") {
        $data->modifyPassword($pseudo, $args->password);
      }
      $res = $data->getUser($pseudo);
      if ($res) {
        produceResult($res);
      }
      else {
        produceError("Utilisateur non trouvé");
      }
    }
  } catch (PDOException $e){
      produceError($e->getMessage());
  }
}

else{
    produceError( implode(' ',$args->getErrorMessages()) );
  }


?>
