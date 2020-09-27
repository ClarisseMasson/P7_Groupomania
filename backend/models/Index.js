const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');

//on a stock� le mot de passe en local pour qu'il ne soit pas en clair
const sqlPassword = process.env.SQL_PASSWORD;

//notre connexion sql
const sequelize = new Sequelize('groupomania', 'groupomaniauser', sqlPassword, {
	dialect: 'mysql',
	host: 'localhost',
	logQueryParameters: true
});

//les mod�les utilis�s
const modelDefiners = [
	require('./Account.js'),
	require('./Post.js'),
	require('./Comment.js'),
	require('./Like.js')
];

//on initialise chaque mod�le
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

//on execute extra-setup (d�finie les relations entre les mod�les)
applyExtraSetup(sequelize);

//met � jour la structure de la base de donn�es(avec alter)
sequelize.sync({ logging: console.log, alter: true });

//on regarde si on arrive � se connecter
try {
	sequelize.authenticate();
	console.log('La connexion a bien �t� �tablie.');
} catch (error) {
	console.error('Impossible de se connecter � la base donn�es :', error);
}



// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;