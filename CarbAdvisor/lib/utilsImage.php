<?php
# KROL Mikolaï BART Sébastien Groupe 3
function createImageFromStream($stream){
    return imagecreatefromstring(stream_get_contents($stream));
}

function plusPetitCote($x,$y){
  if ($x > $y) {
    return $y;
  }
  else {
    return $x;
  }
}

function resample($stream, $size){
  $image = createImageFromStream($stream);                   // créer l'image source
  $largeur = imagesx($image);
  $hauteur = imagesy($image);
  $c = plusPetitCote($largeur, $hauteur);
  $imageDest = imagecreatetruecolor($size, $size);  // créer l'image de destination
  imagecopyresampled($imageDest, $image, 0, 0, ($largeur-$c)/2, ($hauteur-$c)/2, $size, $size, $c, $c);
  $fluxTmp = fopen("php://temp", "r+");                       // créer un flux de stockage temporaire
  imagejpeg($imageDest, $fluxTmp);                           // écrire dans le flux
  rewind($fluxTmp);                                           // préparer le flux à la lecture
  //$data->storeAvatar(['data'=>$fluxTmp,'mimetype'=>'image/jpeg']], $pseudo); // utiliser le flux
  return $fluxTmp;
}

 ?>
