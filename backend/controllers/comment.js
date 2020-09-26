//file system pour avoir accès aux différents systèmes de fichier
const fs = require('fs');

//on importe les modèles
const { models } = require('../models');

exports.createComment = (req, res, next) => {
    const commentObject = getCommentObjectFromRequest(req);
    //si un id existe (ce qui normalement ne peut pas être le cas) on le supprime
    delete commentObject.id;
    const comment = models.comment.build(commentObject);
    comment.save()
        .then(() => res.status(201).json({ message: 'Commentaire enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteComment = (req, res, next) => {
    models.comment.findOne({ where: { id: req.params.id } })
        .then(comment => {
            if (comment.fileUrl) {
                //...on recupère le nom du fichier par rapport à l'url image créée, soit ce qui se trouve après /images/
                const filename = comment.fileUrl.split('/images/')[1];
                //...on supprime le fichier du dossier images
                fs.unlink(`images/${filename}`, () => {
                    //puis deleteOne pour supprimer aussi l'objet de la base de la donnée
                    comment.destroy()
                        .then(() => res.status(200).json({ message: 'commentaire supprimé !' }))
                        .catch(error => res.status(404).json({ error }));
                })
            } else {
                comment.destroy()
                    .then(() => res.status(200).json({ message: 'commentaire supprimé !' }))
                    .catch(error => res.status(404).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));
};


exports.getOneComment = (req, res, next) => {
    //nous utilisons la méthode findOne() dans trouver un compte dans notre modèle sequelize, en excluant les mots de passe
    models.comment.findOne({ where: { id: req.params.id } })
        .then(comment => {
            res.status(200).json(comment)
        })
        .catch(error => res.status(500).json({ error }));
};

//on récupère tout les commentaire d'un post en particulier soit celui de l'url
exports.getAllComments = (req, res, next) => {
    models.comment.findAll({
        where: { postId: req.params.postId },
        //on définie l'ordre
        order: [['updatedAt', 'ASC']],
        //on récupère l'id, le nom et prénom de l'auteur du commentaire pour l'afficher
        //ça correspondrait en sql : LEFT OUTER JOIN`accounts` AS`account` ON`comment`.`accountId` = `account`.`id`
        include: [
            {
                model: models.account,
                attributes: ["id", "firstname", "name"]
            }
        ]
    })
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => res.status(500).json({ error }));
};

function getCommentObjectFromRequest(req) {
    let commentObject;
    //si on trouve un fichier...
    if (req.file) {
        console.log(req.file.mimetype);
        //...alors on parse tout ce qu'il y a dans le commentaire, on établie l'url, et on va chercher l'accountId(ce qui nous permet de savoir qui l'a fait) et le postId
        //accountId et postId sont les clés étrangères nous permettant de relier ce commentaire à un post et à l'auteur du commentaire
        commentObject = {
            ...JSON.parse(req.body.comment),
            fileUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            fileType: req.file.mimetype,
            accountId: req.body.accountId,
            postId: req.params.postId
        }
        //...sinon on importe tout et pareil pour l'accountId et le postId
    } else {
        commentObject = {
            ...JSON.parse(req.body.comment),
            accountId: req.body.accountId,
            postId: req.params.postId
        }
    }
    return commentObject;
}