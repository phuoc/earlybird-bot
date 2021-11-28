const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, LimitedCollection } = require("discord.js");
const profileModel = require("../models/profileSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Shows leaderboard"),
  async execute(interaction) {
    let profiles = await profileModel.find({}, { _id: 0, username: 1, worms: 1 }).sort({ worms: -1 });
    let userNames = '';
    let worms = '';
    let lbString = "\n";

    for (let i = 0; i < profiles.length; i++) {
      const data = profiles[i];

      lbString += `${i+1}. ${data.username} - **${data.worms}**\n`
    }

    console.log(lbString.toString());

    const embed = new MessageEmbed()
      .setAuthor(`Earliest birds of ${interaction.guild.name}`, interaction.guild.iconURL({ dynamic: true }))
      .setColor("#00FF00")
      .setThumbnail("https://cdna.artstation.com/p/assets/images/images/012/471/678/original/austin-lutz-backpack-turnaround.gif?1534960441")
      .addFields(
        {name: "Wormboard", value: lbString}
      );  
    
    interaction.reply({ embeds: [embed] });
  },
};
