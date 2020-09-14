//on a besoin d'express pour cr�er un router
const express = require('express');

//fonction router de express
const router = express.Router();

//on associe avec le user du fichier controller en indiquant son chemin
const accountCtrl = require('../controllers/account');
const auth = require('../middleware/auth');


//N'oubliez pas que le segment de route indiqu� ici est uniquement le segment final, car le reste de l'adresse de la route sera d�clar� dans notre application Express.
router.post('/signup', accountCtrl.signup);
router.post('/login', accountCtrl.login);

router.get('/profile/:id', auth, accountCtrl.getOneProfile);
router.delete('/profile/:id', auth, accountCtrl.deleteProfile);
router.put('/profile/:id', auth, accountCtrl.updateProfile);




//on exporte le router pour qu'on puisse l'importer dans app.js
module.exports = router;