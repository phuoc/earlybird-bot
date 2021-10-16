const { SlashCommandBuilder } = require('@discordjs/builders');

//todo profile/user/me/bird
// pixel art baby bird/chicken og flere evolves/stages

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	},
};