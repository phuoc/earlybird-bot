const { SlashCommandBuilder } = require("@discordjs/builders");
const profileModel = require("../models/profileSchema");
const globalModel = require("../models/globalSchema");
const { authProfile, getDailyClaim, setDailyClaim } = require("../utils.js");

const quotes = [
  '"I get up every morning and it’s going to be a great day. You never know when it’s going to be over, so I refuse to have a bad day.” – Paul Henderson"',
  'Good Morning! May your cup filled up with blessings today.',
  'Good morning, make positive thoughts and enjoy every moment of this day!',
	'Difficult road often lead to beautiful destinations. Good Morning!'
];

//todo const limit - en worm om dagen
//Flere kan claime en worm
//const wormNumber
//Faa boten til aa si hvilken nr paa worm: FOKO got the 1st worm!
//Bao got the 4th worm!

module.exports = {
  data: new SlashCommandBuilder()
    .setName("worm")
    .setDescription("Claims the worm"),
  async execute(interaction) {

    const time = new Date();
    const openingHr = 6; 
    const closingHr = 8; //+1 pga 08:59
    let isOpen = true;

    if(time.getHours() >= openingHr && time.getHours() <= closingHr) {
      console.log(`\nWorm shop is open. ${openingHr} - ${closingHr}`);
      isOpen = true;
    } else {
      console.log(`\nWorm shop is closed. ${openingHr} - ${closingHr}`);
      isOpen = false;
    } 
    if(time.getDay() == 0 || time.getDay() == 6) {
      isOpen = true;
    }

    await authProfile(interaction, profileModel);

    const claimed = await getDailyClaim(interaction, profileModel);
    const dCount2 = await globalModel.findOne({ globalId: 404}, {dailyCount: 1});
		
    console.log(`Counter = ${dCount2.dailyCount}`);
    console.log(`Weekday =  ${time.getDay()}`);
    console.log(`isOpen = ${isOpen}`);
    console.log(`hasClaimed = ${claimed.dailyClaim}`);

    if(isOpen && claimed.dailyClaim === false) { 
      const response = await profileModel.findOneAndUpdate({userID: interaction.user.id},{$inc: {worms: 1}});
      await setDailyClaim(interaction, profileModel);
      await interaction.reply({
        content: `Early birb <@${interaction.user.id}> got a worm!`,
      });
        await interaction.followUp({content: quotes[Math.floor(Math.random() * quotes.length)], ephemeral: true});
    } else if (!isOpen) {
      await interaction.reply({
        content: `The worms are sleepin 😴 Come back between 0${openingHr}:00 and 0${closingHr+1}:00`,
      });
    } else if (claimed.dailyClaim === true) {
      await interaction.reply({
        content: `You have already caught a worm`,
        ephemeral: true,
      });
    } 
  },
};
