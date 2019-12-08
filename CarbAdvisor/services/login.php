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

session_name('carbadvisor_users');
session_start();

  if (isset($_SESSION['ident'])) { //visiteur deja authentifié
    produceError('Vous êtes déjà connecté');
  }
  else { // visiteur non encore authentifié
    if ($args->isValid()) {
      $data = new DataLayer();
      $person = $data->authentifier($args->pseudo, $args->password);
      if ($person === NULL){ // authentification échouée
        $_SESSION['echec'] = true;
        produceError('Mauvais mot de passe/pseudo');
      } else {
        $_SESSION['ident'] = $person;
        unset($_SESSION['echec']);
        produceResult($args->pseudo);
      }
    }



  }
