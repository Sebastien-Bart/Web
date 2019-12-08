<?php
# KROL Mikolaï BART Sébastien Groupe 3
class Identite {
  public $pseudo;
  public $mail;
  public function __construct($pseudo,$mail)
  {
    $this->pseudo = $pseudo;
    $this->mail = $mail;
  }
}
?>
