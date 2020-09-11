const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');
const { models } = require('../models');

const sqlPassword = process.env.SQL_PASSWORD;

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = new Sequelize('groupomania', 'root', sqlPassword, {
	dialect: 'mysql',
	host: 'localhost',
	logQueryParameters: true
});

const modelDefiners = [
	require('./Account.js'),
	require('./Post.js'),
	require('./Comment.js')
	// Add more models here...
	// require('./models/item'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

sequelize.sync({ logging: console.log, alter: true });

//onregarde si on arrive à se connecter
try {
	sequelize.authenticate();
	console.log('Connection has been established successfully.');
} catch (error) {
	console.error('Unable to connect to the database:', error);
}



// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;