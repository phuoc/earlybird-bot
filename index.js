const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const mongoose = require('mongoose');
const profileModel = require("./models/profileSchema");
const globalModel = require("./models/globalSchema");
const cron = require('cron');
const { resetDaily } = require("./utils.js");

if(process.env.NODE_ENV != "production") {
	require('dotenv').config();
}

const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS] });
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Worm bot is online!');
	client.user.setPresence({ activities: [{ name: '/worm' }] })

	let schedCacheReset = new cron.CronJob('00 00 06 * * *', () => {
		resetDaily(profileModel, globalModel);
	});
	schedCacheReset.start();
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('messageCreate', async message => {
  if (message.author.bot || !message.guild) return;
  if (!client.application?.owner) await client.application?.fetch();


  if (message.content === '!deploy') {
    await message.guild.commands
      .set(client.commands.map((command) => command.data.toJSON()))
      .then(() => {
        message.reply('Deployed!');
      })
      .catch(err => {
        message.reply('Could not deploy commands! Make sure the bot has the application.commands permission!');
        console.error(err);
      });
  }
});


mongoose.connect(process.env.MONGODB_SRV, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
	console.log('Database connected!');
}).catch((err) => {
	console.log(err);
});

client.login(process.env.TOKEN);