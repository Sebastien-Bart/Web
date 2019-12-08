<!-- BART Sébastien KROL Mikolaï -->
<?php

  if (filter_input(INPUT_GET,'valid')===NULL){ // Si aucunes infos n'a été envoyé
		require('views/pageAccueil.php');
		exit();
	 }

   else {
     try {
   		 require('lib/verifyParms.php'); // si on a envoyé des infos
       require('lib/getData.php'); // si elles sont valides
       $data = buildTable($tab);
     }
    catch (ParmsException $e){ // Si des infos sont fausses
   		 $errorMessage = $e->getMessage();
      }
      require('views/pageAccueil.php');
    }
?>
