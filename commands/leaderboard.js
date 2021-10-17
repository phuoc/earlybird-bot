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
    let profiles = await profileModel.find({}, { _id: 0, username: 1, worms: 1 }).sort({ worms: -1 });
    let userNames = '';
    let worms = '';

    for (let i = 0; i < profiles.length; i++) {
      const data = profiles[i];

      userNames += `\`${i + 1}\` ${data.username}\n`;
      worms += `\`${data.worms}\`\n`;
    }

    const embed = new MessageEmbed()
      .setAuthor(`Earliest birds of ${interaction.guild.name}`, interaction.guild.iconURL({ dynamic: true }))
      .setColor("#00FF00")
      .setThumbnail("https://cdna.artstation.com/p/assets/images/images/012/471/678/original/austin-lutz-backpack-turnaround.gif?1534960441")
      .addFields(
        { name: 'User', value: userNames, inline: true },
        { name: 'Worms', value: worms, inline: true }
      );

    interaction.channel.send({ embeds: [embed] });
    interaction.reply("nICE");
  },
};
