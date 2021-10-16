const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { getProfiles } = require("../utils");
const profileModel = require("../models/profileSchema");
const {REST} = require('@discordjs/rest')
const {Routes} = require('discord-api-types/v9')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Shows leaderboard"),
  async execute(interaction) {
    let profiles = await profileModel.find({}, { _id: 0, userID: 1, worms: 1 }).sort({ worms: -1 });
    let worms = "";
    let userID = "";


    for(const profile of profiles) {

      worms = profiles.map(profile => profile.worms);
      userID = profiles.map(profile => profile.userID);
      
    }

    
    console.log(worms);
    console.log(userID);

    const topEmbed = new MessageEmbed()
      .setColor("#00FF00")
      .setTitle("Some title")
      .setAuthor(
        `Leaderboard for ${interaction.guild.name}`,
        interaction.guild.iconURL({ dynamic: true })
      )
      .setThumbnail(
        "https://cdna.artstation.com/p/assets/images/images/012/471/678/original/austin-lutz-backpack-turnaround.gif?1534960441"
      )
      .addFields(
        // { name: "\u200B", value: "\u200B" },
        // { name: "Name", value: userID, inline: true },
        // { name: "Worms", value: worms, inline: true }
      )
      // .addField("Siste tittel", "Siste tekst", true)
      .setTimestamp();
    // .setFooter("Some footer text here", "https://i.imgur.com/AfFp7pu.png");

    interaction.channel.send({ embeds: [topEmbed] });
    interaction.reply("nICE");
  },
};
