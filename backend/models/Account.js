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
	},
		//on définie l'index autrement que unique: true à cause du bug sur la librairie sequelize https://github.com/sequelize/sequelize/issues/9653
		{ indexes: [{ unique: true, fields: ['email'] }] }
	);
};
