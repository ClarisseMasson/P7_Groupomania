//on a besoin d'express pour créer un router
const express = require('express');

//fonction router de express
const router = express.Router();

//on associe avec le user du fichier controller en indiquant son chemin
const accountCtrl = require('../controllers/account');

//N'oubliez pas que le segment de route indiqué ici est uniquement le segment final, car le reste de l'adresse de la route sera déclaré dans notre application Express.
router.post('/signup', accountCtrl.signup);
router.post('/login', accountCtrl.login);
router.get('/profile/:id', accountCtrl.getOneProfile);


//on exporte le router pour qu'on puisse l'importer dans app.js
module.exports = router;