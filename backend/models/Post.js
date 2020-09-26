const { DataTypes } = require('sequelize');

// On exporte une fonction qui définie le modèle
module.exports = (sequelize) => {
	sequelize.define('post', {
		//on définie l'ID qui va s'autoincrémenter
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		title: {
			//on limite les titres à 70 caractères
			allowNull: false,
			type: DataTypes.STRING(70)
		},
		description: {
			allowNull: true,
			//on met le type en texte pour supporter les messages de plus de 255 caractères
			type: DataTypes.TEXT
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
