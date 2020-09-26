//on a besoin d'express pour créer un router
const express = require('express');

//fonction router de express
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


//on associe avec le user du fichier controller en indiquant son chemin
const postCtrl = require('../controllers/post');

//N'oubliez pas que le segment de route indiqué ici est uniquement le segment final, car le reste de l'adresse de la route sera déclaré dans notre application Express.
router.post('/', auth, multer, postCtrl.createPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.get('/', auth, postCtrl.getAllPosts);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);

router.post('/:id/like', auth, postCtrl.addLike);
router.get('/:id/like', auth, postCtrl.getAllLikes);
router.put('/:id/like', auth, postCtrl.removeLike);

//on exporte le router pour qu'on puisse l'importer dans app.js
module.exports = router;