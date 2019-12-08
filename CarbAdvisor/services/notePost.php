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
$args->defineString('avis');
$args->defineInt('id');

if ($args->isValid())
    try{
      if ($args->avis == "like" && $data->validIdPosts($args->id)) {
        $data->likePostUpdateUser($_SESSION['ident']->pseudo);
        $data->likePostUpdatePost($args->id);
      }
      elseif ($args->avis == "dislike" && $data->validIdPosts($args->id)) {
        $data->dislikePostUpdateUser($_SESSION['ident']->pseudo);
        $data->dislikePostUpdatePost($args->id);
      }
      else {
        produceError('Le post n\'a pas pu être noté');
      }
      $res = $data->getPost($args->id);
      if ($res) {
        produceResult($res);
      }
      else {
        produceError('Le post n\'a pas été trouvé');
      }
    } catch (PDOException $e){
        produceError($e->getMessage());
    }
else
    produceError( implode(' ',$args->getErrorMessages()) );


?>
