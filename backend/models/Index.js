const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');

//on a stocké le mot de passe en local pour qu'il ne soit pas en clair
const sqlPassword = process.env.SQL_PASSWORD;

//notre connexion sql
const sequelize = new Sequelize('groupomania', 'groupomaniauser', sqlPassword, {
	dialect: 'mysql',
	host: 'localhost',
	logQueryParameters: true
});

//les modèles utilisés
const modelDefiners = [
	require('./Account.js'),
	require('./Post.js'),
	require('./Comment.js'),
	require('./Like.js')
];

//on initialise chaque modèle
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

//on execute extra-setup (définie les relations entre les modèles)
applyExtraSetup(sequelize);

//met à jour la structure de la base de données(avec alter)
sequelize.sync({ logging: console.log, alter: true });

//on regarde si on arrive à se connecter
try {
	sequelize.authenticate();
	console.log('La connexion a bien été établie.');
} catch (error) {
	console.error('Impossible de se connecter à la base données :', error);
}



// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;