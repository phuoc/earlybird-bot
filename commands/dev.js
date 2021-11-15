const { SlashCommandBuilder } = require("@discordjs/builders");
const profileModel = require("../models/profileSchema");
const globalModel = require("../models/globalSchema");
const { authProfile, getDailyClaim, setDailyClaim } = require("../utils.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dev')
		.setDescription('Add testdata to db'),
	async execute(interaction) {
		const addWorm = await profileModel.findOneAndUpdate({userID: interaction.user.id},{$inc: {worms: 1}});
		const addCounter = await globalModel.findOneAndUpdate({globalId: 404}, {$inc: {dailyCount: 1}});
		const dCount = await globalModel.findOne({ globalId: 404}, {dailyCount: 1});
		console.log(`Daily counter = ${dCount.dailyCount}`);

		await interaction.reply({
			content: `+1 user and worm count`,
		});
	},
};