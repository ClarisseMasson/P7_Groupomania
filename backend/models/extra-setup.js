
function applyExtraSetup(sequelize) {
	const { account, post, comment } = sequelize.models;

	//definie relation entre posts et accounts
	account.hasMany(post);
	post.belongsTo(account);

	//definie relation entre posts et commentaires
	post.hasMany(comment);
	comment.belongsTo(post);

	//definie relation entre commentaires et accounts
	account.hasMany(comment);
	comment.belongsTo(account);

}

module.exports = { applyExtraSetup };