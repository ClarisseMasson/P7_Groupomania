//file system pour avoir acc�s aux diff�rents syst�mes de fichier
const fs = require('fs');

//on importe les mod�les
const { models } = require('../models');

exports.createPost = (req, res, next) => {
    const postObject = getPostObjectFromRequest(req);
    //si un id existe (ce qui normalement ne peut pas �tre le cas) on le supprime
    delete postObject.id;
    const post = models.post.build(postObject);
    post.save()
        .then(() => res.status(201).json({ message: 'Post enregistr� !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
    //nous utilisons la m�thode findOne() pour trouver un compte dans notre mod�le sequelize, en ne renvoyant que les infos utiles
    models.post.findOne({
        where: { id: req.params.id },
        //�a correspondrait en sql : LEFT OUTER JOIN`accounts` AS`account` ON`post`.`accountId` = `account`.`id`
        include: [
            {
                model: models.account,
                attributes: ["id", "firstname", "name"]
            }]
    })
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
    //nous utilisons la m�thode findAll() dans trouver tous les posts
    //en lui d�finissant l'order pour afficher par ordre du plus r�cent au plus anciens
    models.post.findAll({
        order: [['updatedAt', 'DESC']],
        //�a correspondrait en sql : LEFT OUTER JOIN`accounts` AS`account` ON`post`.`accountId` = `account`.`id`
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

//on r�cup�re le post par rapport � l'url
//on red�finie chaque �lements envoy�s par le formulaire comme nouveaux �lements de la base de donn�es
//on re-sauvegarde ces informations
exports.modifyPost = (req, res, next) => {
    models.post.findOne({ where: { id: req.params.id } })
        .then(postInDB => {
            let postInReq = getPostObjectFromRequest(req);
            postInDB.title = postInReq.title;
            postInDB.description = postInReq.description;
            postInDB.fileUrl = postInReq.fileUrl;
            postInDB.fileType = postInReq.fileType;
            console.log(postInDB);
            postInDB.save()
                .then(() => res.status(200).json({ message: 'Post modifi� !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};


exports.deletePost = (req, res, next) => {
    
    models.post.findOne({ where: { id: req.params.id } })
        .then(post => {
            if (post.fileUrl) {
                //...on recup�re le nom du fichier par rapport � l'url image cr��e, soit ce qui se trouve apr�s /images/
                const filename = post.fileUrl.split('/images/')[1];
                //...on supprime le fichier du dossier images
                fs.unlink(`images/${filename}`, () => {
                    //puis destroy pour supprimer aussi l'objet de la base de la donn�e + ses donn�es associ�es (likes et comments)
                    post.destroy({ cascade: true })
                        .then(() => res.status(200).json({ message: 'Objet supprim� !' }))
                        .catch(error => res.status(404).json({ error }));
                })
            } else {
                post.destroy({ cascade: true })
                    .then(() => res.status(200).json({ message: 'Objet supprim� !' }))
                    .catch(error => res.status(404).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));
};

//on ajoute un like au post
exports.addLike = (req, res, next) => {
    const like = models.like.build({ accountId: req.body.accountId, postId: req.params.id })
    like.save()
        .then(() => res.status(201).json({ message: 'like enregistr� !' }))
        .catch(error => res.status(400).json({ error }));
};


exports.getAllLikes = (req, res, next) => {
    //nous utilisons la m�thode findAll() dans trouver tous les likes
    models.like.findAll({ where: { postId: req.params.id } })
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => res.status(500).json({ error }));
};

exports.removeLike = (req, res, next) => {
    models.like.findOne({ where: { accountId: req.body.accountId, postId: req.params.id } })
        .then(like => {
            like.destroy()
                .then(() => res.status(200).json({ message: 'like annul� !' }))
                .catch(error => res.status(404).json({ error }));
        })

        .catch(error => res.status(500).json({ error }));
};

function getPostObjectFromRequest(req) {
    let postObject;
    //si on trouve un fichier...
    if (req.file) {
        console.log(req.file.mimetype);
        //...alors on parse tout ce qu'il y a dans le post, on �tablie l'url, et on va chercher l'accountId(ce qui nous permet de savoir qui l'a fait)
        //on a besoin de renvoyer le fileType pour le Frontend
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