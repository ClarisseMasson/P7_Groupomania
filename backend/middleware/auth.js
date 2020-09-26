const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // "split(' ')[1] pour récupérer le 2ème élément du tableau
        const token = req.headers.authorization.split(' ')[1];
        // on vérifie le token et la clé secrète
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        // on récupère l'accountId
        const accountId = decodedToken.accountId;
        //note : avec https le header sera encodé et non en clair
        //attention le token est un nombre et le header nous renvoie une chaine de caractère donc parseInt
        if (!req.header('X-AccountId') || parseInt(req.header('X-AccountId')) !== accountId) {
            throw 'account ID non valable !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifié !' });
    }
};