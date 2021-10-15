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
        console.log(`${interaction.user.tag} Profile already exist`);
      }

      if (!profileData) {
        let profile = await profileModel.create({
          userID: interaction.user.id,
          serverID: interaction.guildId,
          worms: 0,
        });
        // profileData = profile;
        // profileData.worms+=1;
        profile.save();
        console.log(`${interaction.user.tag} New profile created`);
      }
    } catch (e) {
      console.log(e);
    }

    if(profileData.worms === 0) {
      interaction.reply({content:`lul u got no worm - yet`, ephemeral: true}, );
    } else if(profileData.worms === 1) {
      interaction.reply({content:`You have only ${profileData.worms} worm`, ephemeral: true}, );
    } else {
      interaction.reply({content:`You have ${profileData.worms} worms`, ephemeral: true}, );
    }
  },
};