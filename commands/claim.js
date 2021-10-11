const { SlashCommandBuilder } = require("@discordjs/builders");
const { DiscordAPIError } = require("@discordjs/rest");
const { MessageEmbed } = require("discord.js");
const quotes = [
  '"I get up every morning and it’s going to be a great day. You never know when it’s going to be over, so I refuse to have a bad day.” – Paul Henderson"',
  'Good Morning! May your cup filled up with blessings today.',
  'Good morning, make positive thoughts and enjoy every moment of this day!',
	'Difficult road often lead to beautiful destinations. Good Morning!'
];

//const dailyCount: teller antall worms som har blitt claimet paa morgenen. Tilbakestill etter 09:00
//Flere kan claime en worm
//Faa boten til aa si hvilken nr paa worm: FOKO got the 1st worm!
//Bao got the 4th worm!

module.exports = {
  data: new SlashCommandBuilder()
    .setName("claim")
    .setDescription("Claims the worm"),
  async execute(interaction) {
    await interaction.reply({
      content: interaction.user.username + " got the worm!",
    });
    await interaction.followUp({content: quotes[Math.floor(Math.random() * quotes.length)], ephemeral: true});
  },
};
