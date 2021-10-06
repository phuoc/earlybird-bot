const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'claim') {
		await interaction.reply('Ha! You got me!');
	} else if (commandName === 'wormtop') {
		await interaction.reply('Server info.');
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	}
});

client.login(token);