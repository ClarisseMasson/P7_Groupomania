
function applyExtraSetup(sequelize) {
	const { account, post, comment, like } = sequelize.models;

	//definie relation entre posts et accounts
	account.hasMany(post);
	post.belongsTo(account);

	//definie relation entre posts et commentaires
	post.hasMany(comment, {
		onDelete: 'cascade',
		hooks: true
	});
	comment.belongsTo(post, {
		onDelete: 'cascade',
	});

	//definie relation entre commentaires et accounts
	account.hasMany(comment);
	comment.belongsTo(account);

	//definie relation entre likes, posts et accounts
	like.belongsTo(post, {
		onDelete: 'cascade'
	});
	like.belongsTo(account);
	account.hasMany(like);
	post.hasMany(like, {
		onDelete: 'cascade',
		hooks: true
	});
	
}

module.exports = { applyExtraSetup };