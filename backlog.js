/*
  Embed kode
  Limes inn i f.eks. event eller command execute 
*/

const { MessageEmbed } = require("discord.js");
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
      .setThumbnail("https://cdna.artstation.com/p/assets/images/images/012/471/678/original/austin-lutz-backpack-turnaround.gif?1534960441")
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
 

    //message.js
const profileModel = require("../models/profileSchema");

module.exports = async (Discord, client, message) => {
  
  let profileData;
  try {
    profileData = await profileModel.findOne({ userID: message.author.id});
    console.log("Profile already exists for user:" + message.author);
    if(!profileData) {
        let profile = await profileModel.create({
          userID: message.author.id,
          serverID: message.guild.id,
          worms: 80085,
        });
        profile.save();
        console.log("Profile created! (message.js)");
    }
  } catch (e) {
    console.log(e);
  }
};
