const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    await message.channel.send("CAAAAAAAN DOOOOO!");
    const logChannel = message.guild.channels.find("name", "admin-log");

    const embed = new Discord.RichEmbed()
    .setTitle("Just a few user commands, more to come soon!")
    .setColor("#0033cc")
    .setFooter("Mr. Meeseeks | v0.0.4.20.69", bot.user.displayAvatarURL)
    .setTimestamp()
    .addField("!palindrome", "See if a string of letters spells the same backwards!")
    .addField("!serverinfo", "Get info about this basic ass server.")
    .addField("!userinfo", "Info about your stupid ass.")
    .addField("!define", "For when you want to find definitions for your weak memes.")
    .addField("!admin", "For admin use only!!");

    if(embed) {
        try {
            message.channel.send('', {embed})
        }
        catch(e) {
            logChannel.send("`meeseeks command` has error occurred");
            message.author.send("Someone made a fucky wucky. Get the dev.")
            console.log("Embed error:\n" + e);
        }
    }

await message.channel.send("ALLL DONE!!!!");

return 0;
}

module.exports.help = {
    name: "meeseeks"
}