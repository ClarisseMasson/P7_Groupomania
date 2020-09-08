
function applyExtraSetup(sequelize) {
	const { account, post } = sequelize.models;

	account.hasMany(post);
	post.belongsTo(account);
	//orchestra.hasMany(instrumen);
	//instrument.belongsTo(orchestra);
}

module.exports = { applyExtraSetup };