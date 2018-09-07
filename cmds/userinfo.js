const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    await message.channel.send("CAAAAAAAN DOOOOO!");

    const embed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor("#9B59B6")
    .setFooter("Mr. Meeseeks | v0.0.4.20.69", bot.user.displayAvatarURL)
    .setImage(message.author.displayAvatarURL)
    .setTimestamp()
    .addField("Region: ", message.guild.region, true)
    .addField("Full Username: ", `${message.author.username}#${message.author.discriminator}`, true)
    .addField("Role: ", message.guild.roles.name)
    .addField("Created at", message.author.createdAt);


    await message.channel.send('', {embed}).catch(error => console.log(`Error: ${error}`));
    await message.channel.send("ALLL DONE!!!!");

}

module.exports.help = {

    name: "userinfo"
}