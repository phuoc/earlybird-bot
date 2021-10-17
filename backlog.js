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


//! guildMemberAdd.js
const profileModel = require("./models/profileSchema");

module.exports = async (client, discord, member) => {
  let profile = await profileModel.create({
    userID: member.id,
    serverID: member.guild.id,
    worms: 0,
  });
  profile.save();
  console.log("Profile created!");
};


//! https://stackoverflow.com/questions/69072389/getting-guildmember-object-with-user-id-discord-js-v13

const moment = require('moment');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
module.exports = {
description: 'whois',
run: async (client, message, args) => {
    const user = message.mentions.users.first()

        const embed = new MessageEmbed()
            .setTitle(`**PASSION ISLAND MODERATIONS**`)
            .setColor('#ffc0cb')
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addField('Username', user.username)
            .addField('User Id', user.id)
            .addField('Account Type', `${user.bot ? 'Bot' : 'Human'}`)
            .addField(`Roles`, `${message.member.roles.cache.size}`)
            .addField(`Joined At`, `${moment.utc(message.member.joinedAt).format('ddd, MMM Do, YYYY, h:mm a')}`)
            .addField(`created At`, `${moment.utc(message.member.createdAt).format('ddd, MMM Do, YYYY, h:mm a')}`)
            .setTimestamp()
            .setFooter(`Requested by ${message.author.username}`)
                 message.channel.send({ embeds: [embed] })


},
}

//! leaderboard original
let profiles = await profileModel.find({}, { _id: 0, username: 1, worms: 1 }).sort({ worms: -1 });
    let worms = [];
    let username = [];

    for(const profile of profiles) {
      worms = profiles.map(profile => profile.worms.toString());
      username = profiles.map(profile => profile.username.toString());
    }

    let testS = worms[0].toString();
    
    const topEmbed = new MessageEmbed()
      .setColor("#00FF00")
      .setAuthor(
        `Leaderboard for ${interaction.guild.name}`,
        interaction.guild.iconURL({ dynamic: true })
      )
      .setThumbnail(
        "https://cdna.artstation.com/p/assets/images/images/012/471/678/original/austin-lutz-backpack-turnaround.gif?1534960441"
      ).setTimestamp();
    
    for(let i = 0; i < worms.length; i++) {
      topEmbed.addFields(
        { name: "Name", value: username[i], inline: true },
        { name: "Worms", value: worms[i].toString(), inline: true }
      )
    }

    interaction.channel.send({ embeds: [topEmbed] });
    interaction.reply("nICE");