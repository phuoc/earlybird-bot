const { SlashCommandBuilder } = require("@discordjs/builders");
const { DiscordAPIError } = require("@discordjs/rest");
const { MessageEmbed } = require("discord.js");
const profileModel = require("../models/profileSchema");

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

    // Check time
    const time = new Date();
    const openingHr = 6; // 5
    const closingHr = 9; // 8

    if(time.getHours() >= openingHr && time.getHours() <= closingHr) {
      console.log(`Worm shop is open. ${openingHr} - ${closingHr}`);
      console.log(time.getHours() + ":" + time.getMinutes());
    } else {
      console.log(`Worm shop is closed. ${openingHr} - ${closingHr}`);
      console.log(time.getHours() + ":" + time.getMinutes());
    }

    // End check time

    // Create profiles 
    let profileData;
    try {
      profileData = await profileModel.findOne({ userID: interaction.user.id });
      if(profileData) {
        console.log(`${interaction.user.tag} Profile already exist`);
      }

      if (!profileData) {
        let profile = await profileModel.create({
          userID: interaction.user.id,
          serverID: interaction.guildId,
          worms: 0,
        });
        profile.save();
        console.log(`${interaction.user.tag} New profile created`);
      }
    } catch (e) {
      console.log(e);
    }
    // End create profiles 

    await interaction.reply({
      content: interaction.user.username + " got the worm!",
    });
    await interaction.followUp({content: quotes[Math.floor(Math.random() * quotes.length)], ephemeral: true});

    
  },
};
