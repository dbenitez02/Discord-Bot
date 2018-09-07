const Discord = require("discord.js");

module.exports.run = (bot, message, args) => {

    const embed = new Discord.RichEmbed()
    .setTitle("User commands!")
    .setColor("#0033cc")
    .setFooter("Beta bot | v0.0.4.20.69", bot.user.displayAvatarURL)
    .setTimestamp()
    .addField("!add", "For when you want to add your butt buddy.")
    .addField("!block", "For when some little shit is being annoying. {WIP}")
    .addField("!unblock","Give that little shit a second chance.{WIP}")
    .addField("!palindrome", "See if a string a letters spells the same backwards!")
    .addField("!serverinfo", "Get info about this basic ass server.")
    .addField("!userinfo", "Info about your stupid ass.")
    .addField("!define", "For when you want to find definitions for your weak memes.")

message.channel.send('', {embed}).catch(error => console.log(`help command error: ${error}`));

}

module.exports.help = {
    name: "help"
}