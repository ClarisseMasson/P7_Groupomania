const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // "split(' ')[1] pour récupérer le 2 élément du tableau
        const token = req.headers.authorization.split(' ')[1];
        // on vérifie le token et la clé secrète
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        // on récupère l'userId
        const accountId = decodedToken.userId;
        if (req.body.accountId && req.body.userId !== accountId) {
            throw 'account ID non valable !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifié !' });
    }
};