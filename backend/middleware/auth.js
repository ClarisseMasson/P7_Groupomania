const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // "split(' ')[1] pour r�cup�rer le 2�me �l�ment du tableau
        const token = req.headers.authorization.split(' ')[1];
        // on v�rifie le token et la cl� secr�te
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        // on r�cup�re l'accountId
        const accountId = decodedToken.accountId;
        //note : avec https le header sera encod� et non en clair
        //attention le token est un nombre et le header nous renvoie une chaine de caract�re donc parseInt
        if (!req.header('X-AccountId') || parseInt(req.header('X-AccountId')) !== accountId) {
            throw 'account ID non valable !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requ�te non authentifi� !' });
    }
};