const { DataTypes } = require('sequelize');

// On exporte une fonction qui définie le modèle
module.exports = (sequelize) => {
	sequelize.define('account', {
		//on définie l'ID qui va s'autoincrémenter
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		email: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: true
		},
		password: {
			allowNull: false,
			type: DataTypes.STRING
		},
		firstname: {
			allowNull: false,
			type: DataTypes.STRING
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING
		},
		job: {
			allowNull: true,
			type: DataTypes.STRING
		},
		phone: {
			allowNull: true,
			type: DataTypes.STRING
		},
		loginAttempt: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		isAdmin: {
			allowNull: false,
			type: DataTypes.BOOLEAN
		}
	});
};
