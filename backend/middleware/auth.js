const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        console.log(req.header('X-AccountId'));
        // "split(' ')[1] pour r�cup�rer le 2 �l�ment du tableau
        const token = req.headers.authorization.split(' ')[1];
        // on v�rifie le token et la cl� secr�te
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        console.log(decodedToken);
        // on r�cup�re l'userId
        const accountId = decodedToken.accountId;
        //avec https le header est encod� et non en clair
        //attention le token est un nomber et le header nous renvoie une chaine de caract�re
        if (!req.header('X-AccountId') || parseInt(req.header('X-AccountId')) !== accountId) {
            throw 'account ID non valable !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requ�te non authentifi� !' });
    }
};