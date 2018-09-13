const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    const logChannel = message.guild.channels.find("name", "admin-log");

    await message.channel.send("CAAAAAAAN DOOOOO!");
    const embed = new Discord.RichEmbed()
    .setTitle("Status of the server")
    .setColor("#0033cc")
    .setFooter("Mr. Meeseeks | v0.0.4.20.69", bot.user.displayAvatarURL)
    .addField("Owner:", message.guild.owner,true)
    .addField("Number of users:", Math.ceil(message.guild.memberCount - 2), true)
    .addField("Region:", message.guild.region, true)
    .setTimestamp();

    message.channel.send('', {embed})
        .catch((error) => { 
            logChannel.send("`serverinfo command` error has occurred. Probably an issue with the embed"); 
            message.author.send("Someone made a fucky wucky. Get the dev.");
            console.log("serverinfo command error:\n" + error);
        });
    await message.channel.send("ALLL DONE!!!!");
}

module.exports.help = {

    name: "serverinfo"
}