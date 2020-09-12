const { DataTypes } = require('sequelize');

// On exporte une fonction qui d�finie le mod�le
module.exports = (sequelize) => {
	sequelize.define('like', {
		//on d�finie l'ID qui va s'autoincr�menter
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		}
	},
		//on d�finie l'index autrement que unique: true � cause du bug sur la librairie sequelize https://github.com/sequelize/sequelize/issues/9653
		{ indexes: [{ unique: true, fields: ['accountId', 'postId'] }] }
	);
};
