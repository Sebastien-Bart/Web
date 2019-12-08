<?php
# KROL Mikolaï BART Sébastien Groupe 3
  session_name('carbadvisor_users');
  session_start();

  if (! isset($_SESSION['ident'])){ // visiteur non encore authentifié
    $login = filter_input(INPUT_POST,'login');
    $password = filter_input(INPUT_POST,'password');
    $person = $data->authentifier($login, $password);

    if ($person == NULL){ // authentification échouée => inclusion page de login et sortie
      $_SESSION['echec'] = true;
      echo json_encode(['status'=>'error', 'message'=>'Échec de l\'authentification']);
      exit(); // abort du script
    } else {
      $_SESSION['ident'] = $person;
      unset($_SESSION['echec']);
    }
  }


 ?>
