const { DataTypes } = require('sequelize');

// On exporte une fonction qui d�finie le mod�le
module.exports = (sequelize) => {
	sequelize.define('account', {
		//on d�finie l'ID qui va s'autoincr�menter
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
