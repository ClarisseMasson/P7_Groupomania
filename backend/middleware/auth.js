const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // "split(' ')[1] pour r�cup�rer le 2 �l�ment du tableau
        const token = req.headers.authorization.split(' ')[1];
        // on v�rifie le token et la cl� secr�te
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        // on r�cup�re l'userId
        const accountId = decodedToken.userId;
        if (req.body.accountId && req.body.userId !== accountId) {
            throw 'account ID non valable !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requ�te non authentifi� !' });
    }
};