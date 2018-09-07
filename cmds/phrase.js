const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    const logChannel = bot.channels.find("name", "admin-log");

    await message.channel.send("CAAAAAAAN DOOOOO!");

    const embed = new Discord.RichEmbed()
        .setColor("#0099ff")
        .setTitle(`Some secret phrases`)
        .setDescription("More to be added soon!")
        .setImage(bot.user.displayAvatarURL)
        .setFooter("Mr. Meeseeks | Beta Bot v0.0.4.20.69", bot.user.displayAvatarURL)
        .setTimestamp()
        .addField('Phrase 1:', 'summon mr. meeseeks')
        .addField('Phrase 2:', 'existence')
        .addField('Phrase 3:', 'good')

    await message.channel.send('', {embed}).catch(error => logChannel.send(`phrase command error: ${error}`));

    await message.channel.send("ALLL DONE!!!!");
    
    return 0;
}

module.exports.help = {

    name : "phrase"
}