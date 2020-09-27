# P7_Groupomania

Ce projet spécialement développé pour Groupomania dans le cadre de la formation OpenClassrooms.
C'est un réseau social d'entreprise qui a pour but de favoriser les échanges entre les différents services.
Il permet notamment de:
* Créer, mettre à jour ou supprimer son profil utilisateur
* Partager des textes et contenus multimédia
  * Vidéos, images & Gif
* Modifier ou supprimer ses publications
* Accèder à toutes les publications de ses collègues
* Réagir à ces publications
  * Commenter un post avec possibilité d'insérer une image ou un gif
  * Aimer un post
* Un système d'administrateur permet de modérer les publications des utilisateurs
  * Suppression d'un post, d'un commentaire ou d'un compte utilisateur


## Installation des pré-requis

Le projet s'appuie sur:
* MySQL (version 8)
* NodeJS (version v12.17.0 ou supérieure)

### Base de données MySQL

Pour installer la base de données MySQL veuillez vous reporter au site de MySQL: https://dev.mysql.com/downloads/mysql/
Ce projet a été développé et testé avec la version 8.

### NodeJS

Pour installer NodeJS, veuillez vous reporter au site de NodeJS: https://nodejs.org/en/
Ce projet a été développé et testé avec la version v12.17.0.

## Frontend
Pour initialiser le projet
```
npm install
```

Pour démarrer le serveur frontend
```
npm run serve
```

La commande ci-dessous devrait vous indiquer à quelle adresse le site est accessible.
Par défaut: http://localhost:8080/

## backend

Pour initialiser le projet
```
npm install
```

Pour lancer le serveur 
```
ng serve
```

Pour lancer le serveur en mode développement (rechargement automatique)
```
nodemon serve
```

*Avant de démarrer le backend pour la première fois, veuillez tout d'abord créer l'utilisateur de la base de données comme indiqué ci-dessous*

## Base de données MySQL

### Creation du user pour la base de données groupomania (requis pour la première installation)

Attention, le backend va se connecter à MySQL avec un utilisateur nommé "groupomaniauser".
Veuillez conserver ce nom dans les commandes ci-dessous.

``` SQL
CREATE USER 'groupomaniauser'@'%' IDENTIFIED BY '<mot de passe de votre choix>';
GRANT ALL PRIVILEGES ON groupomania.* TO 'groupomaniauser'@'%';
```

Le mot de passe de l'utilisateur pour la base de données doit être défini en variable d'environnement avec le nom *SQL_PASSWORD*

### Quelques commandes utiles 

Pour dialoguer avec votre serveur MySQL depuis l'invite de commande

```
mysql -h localhost -u root -p
puis saisissez votre mot de passe
```

Pour toutes les commandes, pensez bien à basculer sur notre base de données:  
``` SQL
use groupomania;
```

#### Pour passer un utilisateur administrateur

On localise d'abord l'utilisateur pour retrouver son id:

``` SQL
SELECT * FROM accounts;
SELECT * FROM accounts WHERE email = '<email de l'utilisateur>';  // si vous connaissez l'email de l'utilisateur par exemple
```

Une fois l'id de l'utilisateur trouvé, il faut maintenant changer la valeur isAdmin à 1 (== true)
``` SQL
UPDATE accounts SET isAdmin=1 WHERE id=<id de l'utilisateur>;  // sans les guillemets car les ids sont des chiffres
```
