const { SlashCommandBuilder } = require('@discordjs/builders');
const profileModel = require("../models/profileSchema");
const globalModel = require("../models/globalSchema");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resetdaily')
		.setDescription('Resets daily worm counter and hasClaimed (all users)'),
	async execute(interaction) {
    await profileModel.updateMany({dailyClaim: true}, {"$set": {dailyClaim: false}});
    await globalModel.findOneAndUpdate({globalId: 404}, {"$set": {dailyCount: 0}});

		await interaction.reply({
			content: `Resetting hasClaimed and worm counter`,
		});
	},
};
