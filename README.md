# P7_Groupomania

Ce projet sp�cialement d�velopp� pour Groupomania dans le cadre de la formation OpenClassrooms.
C'est un r�seau social d'entreprise qui a pour but de favoriser les �changes entre les diff�rents services.
Il permet notamment de:
* Cr�er, mettre � jour ou supprimer son profil utilisateur
* Partager des textes et contenus multim�dia
  * Vid�os, images & Gif
* Modifier ou supprimer ses publications
* Acc�der � toutes les publications de ses coll�gues
* R�agir � ces publications
  * Commenter un post avec possibilit� d'ins�rer une image ou un gif
  * Aimer un post
* Un syst�me d'administrateur permet de mod�rer les publications des utilisateurs
  * Suppression d'un post, d'un commentaire ou d'un compte utilisateur


## Installation des pr�-requis

Le projet s'appuie sur:
* MySQL (version 8)
* NodeJS (version v12.17.0 ou sup�rieure)

### Base de donn�es MySQL

Pour installer la base de donn�es MySQL veuillez vous reporter au site de MySQL: https://dev.mysql.com/downloads/mysql/
Ce projet a �t� d�velopp� et test� avec la version 8.

### NodeJS

Pour installer NodeJS, veuillez vous reporter au site de NodeJS: https://nodejs.org/en/
Ce projet a �t� d�velopp� et test� avec la version v12.17.0.

## Frontend
Pour initialiser le projet
```
npm install
```

Pour d�marrer le serveur frontend
```
npm run serve
```

La commande ci-dessous devrait vous indiquer � quelle adresse le site est accessible.
Par d�faut: http://localhost:8080/

## backend

Pour initialiser le projet
```
npm install
```

Pour lancer le serveur 
```
ng serve
```

Pour lancer le serveur en mode d�veloppement (rechargement automatique)
```
nodemon serve
```

*Avant de d�marrer le backend pour la premi�re fois, veuillez tout d'abord cr�er l'utilisateur de la base de donn�es comme indiqu� ci-dessous*

## Base de donn�es MySQL

### Creation du user pour la base de donn�es groupomania (requis pour la premi�re installation)

Attention, le backend va se connecter � MySQL avec un utilisateur nomm� "groupomaniauser".
Veuillez conserver ce nom dans les commandes ci-dessous.

``` SQL
CREATE USER 'groupomaniauser'@'%' IDENTIFIED BY '<mot de passe de votre choix>';
GRANT ALL PRIVILEGES ON groupomania.* TO 'groupomaniauser'@'%';
```

Le mot de passe de l'utilisateur pour la base de donn�es doit �tre d�fini en variable d'environnement avec le nom *SQL_PASSWORD*

### Quelques commandes utiles 

Pour dialoguer avec votre serveur MySQL depuis l'invite de commande

```
mysql -h localhost -u root -p
puis saisissez votre mot de passe
```

Pour toutes les commandes, pensez bien � basculer sur notre base de donn�es:  
``` SQL
use groupomania;
```

#### Pour passer un utilisateur administrateur

On localise d'abord l'utilisateur pour retrouver son id:

``` SQL
SELECT * FROM accounts;
SELECT * FROM accounts WHERE email = '<email de l'utilisateur>';  // si vous connaissez l'email de l'utilisateur par exemple
```

Une fois l'id de l'utilisateur trouv�, il faut maintenant changer la valeur isAdmin � 1 (== true)
``` SQL
UPDATE accounts SET isAdmin=1 WHERE id=<id de l'utilisateur>;  // sans les guillemets car les ids sont des chiffres
```
