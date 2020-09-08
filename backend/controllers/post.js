//file system pour avoir accès aux différents systèmes de fichier
const fs = require('fs');

//on importe les modèles
const { models } = require('../models');

exports.createPost = (req, res, next) => {
    const postObject = getPostObjectFromRequest(req);
    delete postObject.id;
    const post = models.post.build(postObject);
    post.save()
        .then(() => res.status(201).json({ message: 'Post enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
    models.post.findOne({ where: { id: req.params.id } })
        .then(postInDB => {
            let postInReq = getPostObjectFromRequest(req);
            postInDB.title = postInReq.title;
            postInDB.description = postInReq.description;
            //pensez à supprimer l'image si elle est mise à jour
            postInDB.fileUrl = postInReq.fileUrl;
            postInDB.fileType = postInReq.fileType;
            postInDB.save()
                .then(() => res.status(200).json({ message: 'Post modifié !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.deletePost = (req, res, next) => {
    models.post.findOne({ where: { id: req.params.id } })
        .then(post => {
            if (post.fileUrl) {
                //...on recupère le nom du fichier par rapport à l'url image créée, soit ce qui se trouve après /images/
                const filename = post.fileUrl.split('/images/')[1];
                //...on supprime le fichier du dossier images
                fs.unlink(`images/${filename}`, () => {
                    //puis deleteOne pour supprimer aussi l'objet de la base de la donnée
                    post.destroy()
                        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                        .catch(error => res.status(404).json({ error }));
                })
            } else {
                post.destroy()
                    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                    .catch(error => res.status(404).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));
};


exports.getOnePost = (req, res, next) => {
    //nous utilisons la méthode findOne() dans trouver un compte dans notre modèle sequelize, en excluant les mots de passe
    models.post.findOne({ where: { id: req.params.id } })
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
    //nous utilisons la méthode findAll() dans trouver tous les posts
    models.post.findAll({
        order: [['updatedAt', 'DESC']],
        include: [
            {
                model: models.account,
                attributes: ["id", "firstname", "name"]              
            }
        ] })
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => res.status(500).json({ error }));
};

function getPostObjectFromRequest(req) {
    let postObject;
    //si on trouve un fichier...
    if (req.file) {
        console.log(req.file.mimetype);
        //...alors on parse tout ce qu'il y a dans le post, on établie l'url, et on va chercher l'accountId(ce qui nous permet de savoir qui l'a fait)
        postObject = {
            ...JSON.parse(req.body.post),
            fileUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            fileType: req.file.mimetype,
            accountId: req.body.accountId
        }
        //...sinon on importe tout et pareil pour l'accountId
    } else {
        postObject = {
            ...JSON.parse(req.body.post),
            accountId: req.body.accountId
        }
    }
    return postObject;
}