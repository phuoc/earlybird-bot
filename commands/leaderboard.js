const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('Shows leaderboard'),
	async execute(interaction) {
		await interaction.reply('leaderboard prompt');
	},
};