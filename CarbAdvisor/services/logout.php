<?php
# KROL Mikolaï BART Sébastien Groupe 3
   header('Content-type: application/json; charset=UTF-8');

   session_name('carbadvisor_users');
   session_start();

   if (!isset($_SESSION['ident'])) {
     echo json_encode(['status'=>'error','message'=>'you are logged out']);
   }
   else {
     $pseudo = $_SESSION['ident']->pseudo;
     unset($_SESSION['ident']);
     session_destroy();
     echo json_encode(['status'=>'ok','result'=>$pseudo]);
   }


 ?>
