const { DataTypes } = require('sequelize');

// On exporte une fonction qui définie le modèle
module.exports = (sequelize) => {
	sequelize.define('like', {
		//on définie l'ID qui va s'autoincrémenter
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		}
	},
		//on définie l'index autrement que unique: true à cause du bug sur la librairie sequelize https://github.com/sequelize/sequelize/issues/9653
		{ indexes: [{ unique: true, fields: ['accountId', 'postId'] }] }
	);
};
