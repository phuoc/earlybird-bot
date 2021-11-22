const { SlashCommandBuilder } = require("@discordjs/builders");
const profileModel = require("../models/profileSchema");
const globalModel = require("../models/globalSchema");
const { authProfile, getDailyClaim, setDailyClaim } = require("../utils.js");

const quotes = [
  'hi god morgen bro ╰(*°▽°*)╯',
  'hi god morgen og ha en fin dag bro ^.^'
];

// '"I get up every morning and it’s going to be a great day. You never know when it’s going to be over, so I refuse to have a bad day.” – Paul Henderson"',
//   'Good Morning! May your cup filled up with blessings today.',
//   'Good morning, make positive thoughts and enjoy every moment of this day!',
// 	'Difficult road often lead to beautiful destinations. Good Morning!',

module.exports = {
  data: new SlashCommandBuilder()
    .setName("worm")
    .setDescription("Claims the worm"),
  async execute(interaction) {

    const time = new Date();
    const openingHr = 6; 
    const closingHr = 8; //+1 pga 08:59
    let isOpen = true;

    var today = new Date();
    var tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(6,0,0,0);

    let diff = tomorrow.getTime() - today.getTime();

    let msec = diff;
    let hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    let mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;

    console.log(hh + ":" + mm);

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
        content: `Early birb <@${interaction.user.id}> caught worm number ${dCount2.dailyCount}!`,
      });
        await interaction.followUp({content: quotes[Math.floor(Math.random() * quotes.length)], ephemeral: true});
    } else if (!isOpen) {
      await interaction.reply({
        content: `The worms are sleepin 😴 Come back between 0${openingHr}:00 and 0${closingHr+1}:00. Next interval begins in **${hh}h ${mm}m**`,
      });
    } else if (claimed.dailyClaim === true) {
      await interaction.reply({
        content: `You can claim once per day. Next interval begins in ${hh}h ${mm}m`,
        ephemeral: true,
      });
    } 
  },
};
