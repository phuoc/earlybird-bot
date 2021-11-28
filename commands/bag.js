const { SlashCommandBuilder } = require("@discordjs/builders");
const profileModel = require("../models/profileSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bag")
    .setDescription("Check worm balance"),
  async execute(interaction) {

    let profileData;
    try {
      profileData = await profileModel.findOne({ userID: interaction.user.id });
      if(profileData) {
        console.log(`${interaction.user.tag} Profile already exist - bag.js`);
      }

      if (!profileData) {
        let profile = await profileModel.create({
          username: interaction.user.username,
          userID: interaction.user.id,
          serverID: interaction.guildId,
          worms: 0,
        });
        profile.save();
        console.log(`${interaction.user.tag} New profile created - bag.js`);
      }
    } catch (e) {
      console.log(e);
    }

    console.log(profileData + '- bag.js');

    if(profileData.worms === 0) {
      interaction.reply({content:`lul u got no worm - yet`, ephemeral: true}, );
    } else if(profileData.worms === 1) {
      interaction.reply({content:`You got only ${profileData.worms} worm`, ephemeral: true}, );
    } else {
      interaction.reply({content:`You got ${profileData.worms} worms`, ephemeral: true}, );
    }
  },
};