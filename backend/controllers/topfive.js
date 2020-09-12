//on importe les modèles
const { models } = require('../models');

const { Sequelize } = require('sequelize');


exports.getTopFive = (req, res, next) => {
    models.post.findAll({
        group: ['id'],
        attributes: {
            include: [[Sequelize.fn("COUNT", Sequelize.col("likes.postId")), "numberOfLikes"]]
        },
        include: [{
            model: models.like, attributes: []
        }]
    })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }));

};