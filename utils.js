

async function authProfile (interaction, profileModel) {
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
}

module.exports = authProfile;