const { SlashCommandBuilder } = require('@discordjs/builders');
const { DiscordAPIError } = require('@discordjs/rest');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('claim')
		.setDescription('Claims the worm'),
	async execute(interaction) {
		await interaction.reply('Ha! You got me!');

	},
};