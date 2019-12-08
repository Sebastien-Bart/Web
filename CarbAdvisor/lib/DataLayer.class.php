<?php
# KROL Mikolaï BART Sébastien Groupe 3
require_once("lib/db_parms.php");
require_once('lib/utilsImage.php');

Class DataLayer{
    private $connexion;
    public function __construct(){

            $this->connexion = new PDO(
                       DB_DSN, DB_USER, DB_PASSWORD,
                       [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
                       ]
                     );

    }

    function authentifier($pseudo, $password){
          // commande SQL : (la syntaxe heredoc permet d'écrire des chaînes multilignes, pour une meilleure lisibilité, cf documentation PHP)
         $sql = <<<EOD
         select pseudo, mail, password
         from carb_users
         where pseudo = :pseudo;
EOD;
         $stmt = $this->connexion->prepare($sql); // préparation de la requête
         $stmt->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
         $stmt->execute();                        // exécution de la requête
         $res = $stmt->fetch();
         if ($res && password_verify($password, $res['password'])) {
            return new Identite($res["pseudo"], $res["mail"]);
          }
         else {
            return NULL;
          }
       }

     function createUser($pseudo, $password){
       $sql = <<<EOD
       insert into carb_users(pseudo, password) values (:pseudo, :password) ;
EOD;
       try {
         $stmt = $this->connexion->prepare($sql); // préparation de la requête
         $stmt->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
         $stmt->bindValue(':password', password_hash($password,CRYPT_BLOWFISH));
         $stmt->execute();                        // exécution de la requête
         return true;
       } catch (PDOException $e) {
         return false;
       }
     }

     function getUser($pseudo){
           // commande SQL : (la syntaxe heredoc permet d'écrire des chaînes multilignes, pour une meilleure lisibilité, cf documentation PHP)
          $sql = <<<EOD
          select pseudo, password, ville, description, nbavis, total, nbposts, nblike, nbnolike, mail
          from carb_users
          where pseudo = :pseudo;
EOD;
          $stmt = $this->connexion->prepare($sql); // préparation de la requête
          $stmt->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
          $stmt->execute();                        // exécution de la requête
          $res = $stmt->fetch();                // récupération de la table résultat
          return $res;
      }

      function get10Bests(){
            // commande SQL : (la syntaxe heredoc permet d'écrire des chaînes multilignes, pour une meilleure lisibilité, cf documentation PHP)
           $sql = <<<EOD
           select *
           from stationsp2
           order by noteglobale desc
           fetch first 10 rows only;
EOD;
           $stmt = $this->connexion->prepare($sql); // préparation de la requête
           $stmt->execute();                        // exécution de la requête
           $res = $stmt->fetchAll();                // récupération de la table résultat
           return $res;
       }

       function getStation($id){
             // commande SQL : (la syntaxe heredoc permet d'écrire des chaînes multilignes, pour une meilleure lisibilité, cf documentation PHP)
            $sql = <<<EOD
            select *
            from stationsp2
            where id = :id;
EOD;
            $stmt = $this->connexion->prepare($sql); // préparation de la requête
            $stmt->bindValue(':id', $id, PDO::PARAM_STR);
            $stmt->execute();                        // exécution de la requête
            $res = $stmt->fetch();                // récupération de la table résultat
            return $res;
        }

        function getPosts($id){
              // commande SQL : (la syntaxe heredoc permet d'écrire des chaînes multilignes, pour une meilleure lisibilité, cf documentation PHP)
             $sql = <<<EOD
             select *
             from carb_posts
             where station = :id
             order by datecreation desc;
EOD;
             $stmt = $this->connexion->prepare($sql); // préparation de la requête
             $stmt->bindValue(':id', $id, PDO::PARAM_STR);
             $stmt->execute();                        // exécution de la requête
             $res = $stmt->fetchAll();                // récupération de la table résultat
             return $res;
         }

         function getPost($id){
               // commande SQL : (la syntaxe heredoc permet d'écrire des chaînes multilignes, pour une meilleure lisibilité, cf documentation PHP)
              $sql = <<<EOD
              select *
              from carb_posts
              where id = :id;
EOD;
              $stmt = $this->connexion->prepare($sql); // préparation de la requête
              $stmt->bindValue(':id', $id, PDO::PARAM_STR);
              $stmt->execute();                        // exécution de la requête
              $res = $stmt->fetch();                // récupération de la table résultat
              return $res;
          }

        function getMyPosts($pseudo){
              // commande SQL : (la syntaxe heredoc permet d'écrire des chaînes multilignes, pour une meilleure lisibilité, cf documentation PHP)
             $sql = <<<EOD
             select *
             from carb_posts
             where auteur = :pseudo
             order by datecreation desc;
EOD;
             $stmt = $this->connexion->prepare($sql); // préparation de la requête
             $stmt->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
             $stmt->execute();                        // exécution de la requête
             $res = $stmt->fetchAll();                // récupération de la table résultat
             return $res;
         }

         function getMaxIdPost(){
           $sql = "select max(id) from carb_posts as id;";
           try {
             $stmt = $this->connexion->prepare($sql); // préparation de la requête
             $stmt->execute();                        // exécution de la requête
             $res = $stmt->fetch();
             return $res;
           } catch (PDOException $e) {
             return $e;
           }
         }


         function modifyMail($pseudo, $mail){
           $sql = <<<EOD
           update carb_users
           set mail=:mail
           where pseudo=:pseudo;
EOD;
           try {
              $stmt = $this->connexion->prepare($sql);
              $stmt->bindValue(':mail', $mail, PDO::PARAM_STR);
              $stmt->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
              $stmt->execute();
              return true;
            } catch (PDOException $e) {
              return false;
            }
         }

         function modifyVille($pseudo, $ville){
           $sql = <<<EOD
           update carb_users
           set ville=:ville
           where pseudo=:pseudo;
EOD;
           try {
              $stmt = $this->connexion->prepare($sql);
              $stmt->bindValue(':ville', $ville, PDO::PARAM_STR);
              $stmt->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
              $stmt->execute();
              return true;
            } catch (PDOException $e) {
              return false;
            }
         }

         function modifyDescription($pseudo, $description){
           $sql = <<<EOD
           update carb_users
           set description=:description
           where pseudo=:pseudo;
EOD;
           try {
              $stmt = $this->connexion->prepare($sql);
              $stmt->bindValue(':description', $description, PDO::PARAM_STR);
              $stmt->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
              $stmt->execute();
              return true;
            } catch (PDOException $e) {
              return false;
            }
         }

         function modifyPassword($pseudo, $password){
           $password = password_hash($password,CRYPT_BLOWFISH);
           $sql = <<<EOD
           update carb_users
           set password=:password
           where pseudo=:pseudo;
EOD;
           try {
              $stmt = $this->connexion->prepare($sql);
              $stmt->bindValue(':password', $password, PDO::PARAM_STR);
              $stmt->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);
              $stmt->execute();
              return true;
            } catch (PDOException $e) {
              return false;
            }
         }

         function noteStationUpdateStation($id, $global, $accueil, $prix, $services){
           $sql = <<<EOD
           update stationsp2
            set nbnotes = nbnotes + 1, noteglobale = noteglobale + :global, noteaccueil = noteaccueil + :accueil, noteprix = noteprix + :prix, noteservice = noteservice + :service
            where id =:id;
EOD;
           try {
             $stmt = $this->connexion->prepare($sql); // préparation de la requête
             $stmt->bindValue(':id', $id, PDO::PARAM_STR);
             $stmt->bindValue(':global', $global);
             $stmt->bindValue(':accueil', $accueil);
             $stmt->bindValue(':prix', $prix);
             $stmt->bindValue(':service', $services);
             $stmt->execute();                        // exécution de la requête
             return true;
           } catch (PDOException $e) {
             return $e;
           }
         }

         function noteStationUpdateUser($pseudo, $global){
           $sql = <<<EOD
          update carb_users
            set nbavis = nbavis+1, total = total+:global
            where pseudo = :pseudo;
EOD;
           try {
             $stmt = $this->connexion->prepare($sql); // préparation de la requête
             $stmt->bindValue(':pseudo', $pseudo);
             $stmt->bindValue(':global', $global);
             $stmt->execute();                        // exécution de la requête
             return true;
           } catch (PDOException $e) {
             return $e;
           }
         }

         function deletePost($id){
               // commande SQL : (la syntaxe heredoc permet d'écrire des chaînes multilignes, pour une meilleure lisibilité, cf documentation PHP)
              $sql = <<<EOD
              delete from carb_posts
              where id = :id ;
EOD;
              $stmt = $this->connexion->prepare($sql); // préparation de la requête
              $stmt->bindValue(':id', $id);
              $stmt->execute();                        // exécution de la requête
              return $id;
          }

          function updateUserAfterDeletedPost($pseudo){
                // commande SQL : (la syntaxe heredoc permet d'écrire des chaînes multilignes, pour une meilleure lisibilité, cf documentation PHP)
               $sql = <<<EOD
               update carb_users
               set nbposts = nbposts - 1
               where pseudo = :pseudo;
EOD;
               $stmt = $this->connexion->prepare($sql); // préparation de la requête
               $stmt->bindValue(':pseudo', $pseudo);
               $stmt->execute();                        // exécution de la requête
               return true;
           }

           function createPost($station, $titre, $auteur, $contenu, $date){
             $sql = "insert into carb_posts(station, titre, auteur, contenu, datecreation) values(:station, :titre, :auteur, :contenu, :date);";

             $stmt = $this->connexion->prepare($sql);
             $stmt->bindValue(':station', $station, PDO::PARAM_STR);
             $stmt->bindValue(':titre', $titre);
             $stmt->bindValue(':auteur', $auteur);
             $stmt->bindValue(':contenu', $contenu);
             $stmt->bindValue(':date', $date);
             $stmt->execute();
             return true;
           }

           function updateUserAfterCreatedPost($pseudo){
             $sql = <<<EOD
             update carb_users
             set nbposts = nbposts + 1
             where pseudo = :pseudo;
EOD;
             $stmt = $this->connexion->prepare($sql); // préparation de la requête
             $stmt->bindValue(':pseudo', $pseudo);
             $stmt->execute();                        // exécution de la requête
             return true;
           }

           function validIdPosts($id){
             $sql = "select * from carb_posts where id = :id";
             $stmt = $this->connexion->prepare($sql); // préparation de la requête
             $stmt->bindValue(':id', $id);
             $stmt->execute();
             $res = $stmt->fetchAll();
             return $res;
           }

           function likePostUpdateUser($pseudo){
             $sql = "update carb_users set nblike = nblike +1 where pseudo = :pseudo;";
             $stmt = $this->connexion->prepare($sql); // préparation de la requête
             $stmt->bindValue(':pseudo', $pseudo);
             $stmt->execute();
             return true;
           }

           function likePostUpdatePost($id){
             $sql = "update carb_posts set nblike = nblike +1 where id = :id;";
             $stmt = $this->connexion->prepare($sql); // préparation de la requête
             $stmt->bindValue(':id', $id);
             $stmt->execute();
             return true;
           }

           function dislikePostUpdateUser($pseudo){
             $sql = "update carb_users set nbnolike = nbnolike +1 where pseudo = :pseudo;";
             $stmt = $this->connexion->prepare($sql); // préparation de la requête
             $stmt->bindValue(':pseudo', $pseudo);
             $stmt->execute();
             return true;
           }

           function dislikePostUpdatePost($id){
             $sql = "update carb_posts set nbnolike = nbnolike +1 where id = :id;";
             $stmt = $this->connexion->prepare($sql); // préparation de la requête
             $stmt->bindValue(':id', $id);
             $stmt->execute();
             return true;
           }

           function storeAvatar($imageSpec, $pseudo) {
             $flux = $imageSpec['data'];
             $large = resample($flux, 256);
             rewind($flux);
             $small = resample($flux, 48);

             $sql = <<<EOD
             update carb_users set avatar = :large,
             avatar48 = :small,
             mimetype = :type
             where pseudo = :pseudo;;
EOD;
             $stmt = $this->connexion->prepare($sql);
             $stmt->bindValue(':large', $large, PDO::PARAM_LOB ); // le 3ème paramètre est ici indispensable
             $stmt->bindValue(':small', $small, PDO::PARAM_LOB ); // le 3ème paramètre est ici indispensable
             $stmt->bindValue(':type', $imageSpec['mimetype']);
             $stmt->bindValue(':pseudo', $pseudo);
             $stmt->execute();
             return true;
           }

           function getAvatar($login){
              $sql = <<<EOD
              select mimetype, avatar
              from carb_users
              where pseudo = :pseudo;
EOD;
              $stmt = $this->connexion->prepare($sql);
              $stmt->bindValue(':pseudo', $login);
              $stmt->bindColumn('mimetype', $mimeType);
              $stmt->bindColumn('avatar', $flow, PDO::PARAM_LOB);
              $stmt->execute();
              $res = $stmt->fetch();
              if ($res)
                 return ['mimetype'=>$mimeType,'data'=>$flow];
              else
                 return false;
            }

            function getAvatar48($login){
               $sql = <<<EOD
               select mimetype, avatar48
               from carb_users
               where pseudo = :pseudo;
EOD;
               $stmt = $this->connexion->prepare($sql);
               $stmt->bindValue(':pseudo', $login);
               $stmt->bindColumn('mimetype', $mimeType);
               $stmt->bindColumn('avatar48', $flow, PDO::PARAM_LOB);
               $stmt->execute();
               $res = $stmt->fetch();
               if ($res)
                  return ['mimetype'=>$mimeType,'data'=>$flow];
               else
                  return false;
             }

}
?>
