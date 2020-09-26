//on a besoin d'express pour créer un router
const express = require('express');

//fonction router de express
const router = express.Router();

//on associe avec le user du fichier controller en indiquant son chemin
const accountCtrl = require('../controllers/account');
const auth = require('../middleware/auth');


//N'oubliez pas que le segment de route indiqué ici est uniquement le segment final, car le reste de l'adresse de la route sera déclaré dans notre application Express.
//toutes les routes sauf ces deux ci-dessous(qui serve à l'authentification) auront besoin d'une authentification
router.post('/signup', accountCtrl.signup);
router.post('/login', accountCtrl.login);

router.get('/profile/:id', auth, accountCtrl.getOneProfile);
router.put('/profile/:id', auth, accountCtrl.updateProfile);
router.delete('/profile/:id', auth, accountCtrl.deleteProfile);

//on exporte le router pour qu'on puisse l'importer dans app.js
module.exports = router;