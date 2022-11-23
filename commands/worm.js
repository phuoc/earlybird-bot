const { SlashCommandBuilder } = require("@discordjs/builders");
const profileModel = require("../models/profileSchema");
const globalModel = require("../models/globalSchema");
const { authProfile, getDailyClaim, setDailyClaim } = require("../utils.js");

const quotes = [
  'hi god morgen ╰(*°▽°*)╯',
  'hilo, god morgen og ha en fantastisk dag <:pogU:869943512752345169>',
  'MORNIN 👹 <:pogU:869943512752345169>',
  'Good Mornin <:pogU:869943512752345169> May your cup filled up with blessings today.',
  'God morgen <3 Stay hydrated <:pogU:869943512752345169>',
  'Difficult road often lead to beautiful destinations. Good Morning! (⊙o⊙)',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("worm")
    .setDescription("Claims the worm"),
  async execute(interaction) {

    const today = new Date();
    const startTime = 6; 
    const endTime = 8;
    let isClaimable = true;

    const tomorrow = new Date(today);

    if(today.getHours() >= 0) {
      if(today.getHours() <= 5) {
        tomorrow.setDate(tomorrow.getDate())
      }
    } else {
      tomorrow.setDate(tomorrow.getDate() + 1);
    }
    tomorrow.setHours(6,0,0,0);

    let diff = tomorrow.getTime() - today.getTime();
    
    let msec = diff;
    let hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    let mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;

    if(today.getHours() >= startTime && today.getHours() <= endTime) {
      console.log(`\nWorm shop is open. ${startTime} - ${endTime}`);
      isClaimable = true;
    } else {
      console.log(`\nWorm shop is closed. ${startTime} - ${endTime}`);
      isClaimable = false;
    } 

    // What does this do tho
    if(today.getDay() == 0 || today.getDay() == 6) {
      isClaimable = true;
    }

    await authProfile(interaction, profileModel);

    const claimed = await getDailyClaim(interaction, profileModel);
    const dailycount = await globalModel.findOne({ globalId: 404}, {dailyCount: 1});
		
    console.log(`Counter = ${dailycount.dailyCount}`);
    console.log(`Weekday =  ${today.getDay()}`);
    console.log(`isOpen = ${isClaimable}`);
    console.log(`hasClaimed = ${claimed.dailyClaim}`);

    if(isClaimable && claimed.dailyClaim === false) { 
      const response = await profileModel.findOneAndUpdate({userID: interaction.user.id},{$inc: {worms: 1}});
      await setDailyClaim(interaction, profileModel);
      await interaction.reply({
        content: `<@${interaction.user.id}> caught a <:wormie:1044392759974432768>`,
      });
        await interaction.followUp({content: quotes[Math.floor(Math.random() * quotes.length)], ephemeral: true});
    } else if (!isClaimable) {
      await interaction.reply({
        content: `The worms are sleepin 😴 Come back between 0${startTime}:00 - 0${endTime+1}:00.`,
      });
    } else if (claimed.dailyClaim === true) {
      await interaction.reply({
        content: `👮🏻‍♂️🤚🏻 You can only claim once per day`,
        ephemeral: true,
      });
    } 
  },
};
