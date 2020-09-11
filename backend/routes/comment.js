//on a besoin d'express pour cr�er un router
const express = require('express');

//fonction router de express
const router = express.Router({mergeParams: true});

const multer = require('../middleware/multer-config');

//on associe avec le user du fichier controller en indiquant son chemin
const commentCtrl = require('../controllers/comment');

//N'oubliez pas que le segment de route indiqu� ici est uniquement le segment final, car le reste de l'adresse de la route sera d�clar� dans notre application Express.
router.post('/', multer, commentCtrl.createComment);
router.get('/:id', commentCtrl.getOneComment);
router.get('/', commentCtrl.getAllComments);
router.delete('/:id', commentCtrl.deleteComment);




//on exporte le router pour qu'on puisse l'importer dans app.js
module.exports = router;