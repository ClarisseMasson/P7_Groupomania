//on installe bcrypt pour crypter notre mot de passe avec "npm install--save bcrypt" en ligne de commmande
const bcrypt = require('bcrypt');
//on installe jsonwebtoken pour renvoyer notre token
const jwt = require('jsonwebtoken');
//on installe la fonction ip d'express pour vérifier l'ip de notre utilisateur
const expressip = require('express-ip');

//pour récuperer le schema
const { models } = require('../models');

//2 fonctions, une pour s'inscrire, une pour se connecter avec un compte déjà existant


//10 tours dans le hachoir
//fonction asynchrone
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            //je vérifie si l'email correspond bien à un format email pour éviter l'authentification malveillante
            const regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
            if (!regex.test(req.body.email)) {
                res.status(400).json({ message: 'email invalide' });
            }
            else {
                //je vérifie si le mot de passe a au moins 8 caractères une majuscule et un nombre
                if (!passwordValidation(req.body.password)) {
                    res.status(400).json({ message: 'mot de passe pas assez fort, vous devez avoir au moins 8 caractères, 1 majuscule et un nombre' });
                }
                else {
                    //on va saler le mot de passe pour éviter les attaques utilisant des rainbow tables,
                    //les attaques par dictionnaire et les attaques par force brute.
                    const newAccount = models.account.build({
                        email: req.body.email,
                        password: hash,
                        firstname: req.body.firstname,
                        name: req.body.name,
                        job: req.body.job,
                        phone: req.body.phone,
                        loginAttempt: 0,
                        isAdmin: false

                    });
                    console.log(newAccount);
                    newAccount.save()
                        .then(() => res.status(201).json({ message : 'Utilisateur créé !'}))
                        .catch(error => res.status(400).json({ error }));
                }
            }
        })
        .catch(error => res.status(500).json({error}));
};


//On récupère l'adresse mail de l'adresse rentré
//si elle est bonne alors on compare le mot de passe "haché" avec celui entré
//si il est bon on va renvoyé un objet json avec son account._id et token
exports.login = (req, res, next) => {
    models.account.findOne({ where: { email: req.body.email } })
        .then(account => {
            if (!account) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            else if (account.loginAttempt > 3) {
                return res.status(401).json({ error: 'Trop de tentatives de connexion, votre compte a été bloqué !' });
            }
            else {
                bcrypt.compare(req.body.password, account.password)
                    .then(valid => {
                        if (!valid) {
                            //on ajoute 1 à la tentative de connexion
                            account.loginAttempt += 1;
                            //on met à jour le nombre de connexion dans account
                            account.save()
                                .then(() => res.status(401).json({ message: 'Mot de passe incorrect !' }))
                                .catch(error => res.status(500).json({ error }));
                        }
                        else {
                            console.log("ici");
                            //on remet à 0 la tentative de connexion
                            account.loginAttempt = 0;
                            //on met à jour le nombre de connexion dans account
                            account.save()
                                .then(() => {
                                    res.status(200).json({
                                        accountId: account.id,
                                        isAdmin: account.isAdmin,
                                        token: jwt.sign(
                                            { accountId: account.id },
                                            'RANDOM_TOKEN_SECRET',
                                            { expiresIn: '2h' }
                                        )
                                    });
                                })
                                .catch(error => res.status(500).json({ error }));
                        }
                    })
                    .catch(error => res.status(500).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));
};

exports.updateProfile = (req, res, next) => {
    models.account.findOne({ where: { id: req.params.id } })
        .then(accountInDB => {
            accountInDB.firstname = req.body.firstname;
            accountInDB.name = req.body.name;
            accountInDB.job = req.body.job;
            accountInDB.email = req.body.email;
            accountInDB.phone = req.body.phone;

            accountInDB.save()
                .then(() => res.status(200).json(accountInDB))
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};


exports.deleteProfile = (req, res, next) => {

    models.account.findOne({ where: { id: req.header('X-AccountId') } })
        .then(requester => {
            if (requester.id == req.params.id || requester.isAdmin) {
                models.account.findOne({ where: { id: req.params.id } })
                    .then(account => {
                        account.destroy()
                            .then(() => res.status(200).json({ message: 'Compte supprimé !' }))
                            .catch(error => res.status(404).json({ error }));
                    })
                    .catch(error => res.status(500).json({ error }));
            } else {
                res.status(403).json({ message: 'Seul un administrateur ou le propriètaire du compte peut le supprimer !' });
            }
        })


};

function passwordValidation(password) {
    if (password.length >= 8 && password != password.toLowerCase() && /\d/.test(password)) {
        return true;
    }
    else {
        return false;
    }
};

exports.getOneProfile = (req, res, next) => {
    //nous utilisons la méthode findOne() dans trouver un compte dans notre modèle sequelize, en excluant les mots de passe
    models.account.findOne({ where: { id: req.params.id }, attributes: {exclude: ["password","loginAttempt"]} })
        .then(account => {
            res.status(200).json(account)
        })
        .catch(error => res.status(500).json({ error }));
};