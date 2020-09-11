const { DataTypes } = require('sequelize');

// On exporte une fonction qui d�finie le mod�le
module.exports = (sequelize) => {
	sequelize.define('comment', {
		//on d�finie l'ID qui va s'autoincr�menter
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		description: {
			allowNull: true,
			type: DataTypes.STRING
		},
		fileUrl: {
			allowNull: true,
			type: DataTypes.STRING
		},
		fileType: {
			allowNull: true,
			type: DataTypes.STRING
		}
	});
};
