const { SlashCommandBuilder } = require("@discordjs/builders");
const profileModel = require("../models/profileSchema");
const globalModel = require("../models/globalSchema");
const { authProfile, getDailyClaim, setDailyClaim } = require("../utils.js");
const { DataManager } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dev')
		.setDescription('Add test data to db'),
	async execute(interaction) {
		// let gl = await globalModel.create({globalId: 404, dailyCount: 0});

		const addWorm = await profileModel.findOneAndUpdate({userID: interaction.user.id},{$inc: {worms: 1}});
		const addCounter = await globalModel.findOneAndUpdate({globalId: 404}, {$inc: {dailyCount: 1}});
		const dCount = await globalModel.findOne({ globalId: 404}, {dailyCount: 1});
		console.log(`Counter = ${dCount.dailyCount}`);

		await interaction.reply({
			content: `+1 user and worm count\n${dCount.dailyCount} worms have been claimed today`,
		});
	},
};