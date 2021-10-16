const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Shows leaderboard"),
  async execute(interaction) {
    const exampleEmbed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Some title")
      .setURL("https://discord.js.org/")
      .setAuthor(
        "Some name",
        "https://cdna.artstation.com/p/assets/images/images/012/471/678/original/austin-lutz-backpack-turnaround.gif?1534960441",
        "https://discord.js.org"
      )
      .setDescription("Some description here")
      .setThumbnail(
        "https://cdna.artstation.com/p/assets/images/images/012/471/678/original/austin-lutz-backpack-turnaround.gif?1534960441"
      )
      .addFields(
        { name: "Regular field title", value: "Some value here" },
        { name: "\u200B", value: "\u200B" },
        { name: "Inline field title", value: "Some value here", inline: true },
        { name: "Inline field title", value: "Some value here", inline: true }
      )
      .addField("Inline field title", "Some value here", true)
      .setImage("https://i.imgur.com/AfFp7pu.png")
      .setTimestamp()
      .setFooter("Some footer text here", "https://i.imgur.com/AfFp7pu.png");

    interaction.channel.send({ embeds: [exampleEmbed] });
		interaction.reply('Top early birds EU');
  },
};
