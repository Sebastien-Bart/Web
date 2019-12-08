<?php
# KROL Mikolaï BART Sébastien Groupe 3
set_include_path('..'.PATH_SEPARATOR);

require_once('lib/common_service.php');

$args = new RequestParameters();
$args->defineNonEmptyString('pseudo');
$args->defineString('size');

if (! $args->isValid()){
  produceError('argument(s) invalide(s) --> '.implode(', ',$args->getErrorMessages()));
  return;
}

try{
  $data = new DataLayer();
  if ($args->size == "large") {
    $descFile = $data->getAvatar($args->pseudo);
  }
  else {
    $descFile = $data->getAvatar48($args->pseudo); // car par défaut size == small, on force a small si size c nimp
  }
  if ($descFile){ // l'utilisateur existe
    // si l'avatar est NULL, renvoyer l'avatar par défaut :
    if (is_null($descFile['data'])) {
      if ($args->size == "large") {
        $flux = fopen('../img/avatar_def.png','r');
      }
      else {
        $flux = fopen('../img/avatar_def48.png','r');
      }
    }
    else {
      $flux = $descFile['data'];
    }
    $mimeType = is_null($descFile['data']) ? 'image/png' : $descFile['mimetype'];

    header("Content-type: $mimeType");
    fpassthru($flux);
    exit();
  }
  else
    produceError('Utilisateur inexistant');
}
catch (PDOException $e){
  produceError($e->getMessage());
}

?>
