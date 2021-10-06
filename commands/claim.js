const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('claim')
		.setDescription('Claims the worm'),
	async execute(interaction) {
		await interaction.reply('Ha! You got me!');
	},
};