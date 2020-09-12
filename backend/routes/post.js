//on a besoin d'express pour créer un router
const express = require('express');

//fonction router de express
const router = express.Router();

const multer = require('../middleware/multer-config');


//on associe avec le user du fichier controller en indiquant son chemin
const postCtrl = require('../controllers/post');

//N'oubliez pas que le segment de route indiqué ici est uniquement le segment final, car le reste de l'adresse de la route sera déclaré dans notre application Express.
router.post('/', multer, postCtrl.createPost);
router.get('/:id', postCtrl.getOnePost);
router.get('/', postCtrl.getAllPosts);
router.put('/:id', multer, postCtrl.modifyPost);
router.delete('/:id', postCtrl.deletePost);

router.get('/:id/like', postCtrl.getAllLikes);
router.post('/:id/like', postCtrl.addLike);
router.put('/:id/like', postCtrl.removeLike);

//on exporte le router pour qu'on puisse l'importer dans app.js
module.exports = router;