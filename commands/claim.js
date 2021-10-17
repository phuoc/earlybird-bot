const { SlashCommandBuilder } = require("@discordjs/builders");
const { DiscordAPIError } = require("@discordjs/rest");
const { MessageEmbed } = require("discord.js");
const profileModel = require("../models/profileSchema");
const { authProfile } = require("../utils.js");

const quotes = [
  '"I get up every morning and it’s going to be a great day. You never know when it’s going to be over, so I refuse to have a bad day.” – Paul Henderson"',
  'Good Morning! May your cup filled up with blessings today.',
  'Good morning, make positive thoughts and enjoy every moment of this day!',
	'Difficult road often lead to beautiful destinations. Good Morning!'
];

//todo const dailyCount: teller antall worms som har blitt claimet paa morgenen. Tilbakestill etter 09:00
//Flere kan claime en worm
//Faa boten til aa si hvilken nr paa worm: FOKO got the 1st worm!
//Bao got the 4th worm!

//antall levels > evolve til diff bird breeds -> bruke knapper

module.exports = {
  data: new SlashCommandBuilder()
    .setName("claim")
    .setDescription("Claims the worm"),
  async execute(interaction) {

    // Check time
    const time = new Date();
    const openingHr = 6; 
    const closingHr = 7;
    let isOpen = false;

    if(time.getHours() >= openingHr && time.getHours() <= closingHr) {
      console.log(`Worm shop is open. ${openingHr} - ${closingHr}`);
      isOpen = true;
    } else {
      console.log(`Worm shop is closed. ${openingHr} - ${closingHr}`);
      isOpen = false;
    }
    // console.log(time.getHours() + ":" + time.getMinutes());
    // End check time

    // Check or create profiles 
    await authProfile(interaction, profileModel);

    //todo console.log(interaction.userID(profileModel.))

    const reward = 1;

    if(!isOpen) { 
      const response = await profileModel.findOneAndUpdate({userID: interaction.user.id},{$inc: {worms: reward}});
      await interaction.reply({
        content: `Early birb <@${interaction.user.id}> got a worm!`,
      });
        //todo uncomment when in prod
        // await interaction.followUp({content: quotes[Math.floor(Math.random() * quotes.length)], ephemeral: false});
    } else {
      await interaction.reply({
        content: `Worms are spawning between 06:00 and 08:00`,
      });
    }
  },
};
