const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        console.log(req.header('X-AccountId'));
        // "split(' ')[1] pour récupérer le 2 élément du tableau
        const token = req.headers.authorization.split(' ')[1];
        // on vérifie le token et la clé secrète
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        console.log(decodedToken);
        // on récupère l'userId
        const accountId = decodedToken.accountId;
        //avec https le header est encodé et non en clair
        //attention le token est un nomber et le header nous renvoie une chaine de caractère
        if (!req.header('X-AccountId') || parseInt(req.header('X-AccountId')) !== accountId) {
            throw 'account ID non valable !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifié !' });
    }
};