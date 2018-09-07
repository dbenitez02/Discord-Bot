const Discord = require("discord.js");

module.exports.run = (bot, message, args) => {
    const logChannel = bot.channels.find("name", "admin-log");

    const embed = new Discord.RichEmbed()
    .setTitle("User commands!")
    .setColor("#0033cc")
    .setFooter("Beta bot | v0.0.4.20.69", bot.user.displayAvatarURL)
    .setTimestamp()
    .addField("!add", "For when you want to add your butt buddy.")
    .addField("!palindrome", "See if a string a letters spells the same backwards!")
    .addField("!serverinfo", "Get info about this basic ass server.")
    .addField("!userinfo", "Info about your stupid ass.")
    .addField("!define", "For when you want to find definitions for your weak memes.")

message.channel.send('', {embed}).catch(error => logChannel.send(`help command error: ${error}`));

}

module.exports.help = {
    name: "help"
}