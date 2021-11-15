async function authProfile (interaction, profileModel) {
  let profileData;
  try {
    profileData = await profileModel.findOne({ userID: interaction.user.id });
    if(!profileData) {
      let profile = await profileModel.create({
        username: interaction.user.username,
        userID: interaction.user.id,
        serverID: interaction.guildId,
        worms: 0,
      });
      profile.save();
      console.log(`${interaction.user.tag} New profile created - utils.js`);
    } else {
      console.log(`${interaction.user.tag} Profile already exist - utils.js`);
    }
  } catch (e) {
    console.log(e);
  }
}

async function getProfiles (profileModel) {
  let profiles = await profileModel.find({}, {_id: 0, userID: 1, worms: 1 } ).sort({worms: -1});
  return profiles;
}

async function getDailyClaim (interaction, profileModel) {
  let claimed = await profileModel.findOne({ userID: interaction.user.id}, {dailyClaim: 1} );
  return claimed;
}

async function setDailyClaim (interaction, profileModel) {
  await profileModel.findOneAndUpdate({userID: interaction.user.id},{$set: {dailyClaim: true}}); 
}

async function resetDaily (profileModel, globalModel) {
  await profileModel.updateMany({dailyClaim: true}, {"$set": {dailyClaim: false}});
  await globalModel.findOneAndUpdate({globalId: 404}, {"$set": {dailyCount: 0}});
  console.log("Daily reset succeded!");
}

module.exports = {authProfile, getProfiles, getDailyClaim, setDailyClaim, resetDaily};