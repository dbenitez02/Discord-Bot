const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    const logChannel = message.guild.channels.find("name", "admin-log");

    await message.channel.send("CAAAAAAAN DOOOOO!");

    const embed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor("#9B59B6")
    .setFooter("Mr. Meeseeks | v0.0.4.20.69", bot.user.displayAvatarURL)
    .setImage(message.author.displayAvatarURL)
    .setTimestamp()
    .addField("Region: ", message.guild.region, true)
    .addField("Full Username: ", `${message.author.username}#${message.author.discriminator}`, true)
    .addField("Created at", message.author.createdAt);


    message.channel.send('', {embed}).catch((error) => {
        logChannel.send("Embed error, probably failed to send embed");
        message.author.send("Someone made a fucky wucky. Get the dev.");
        console.log("userinfo command error\n" + error);
    });
    await message.channel.send("ALLL DONE!!!!");

}

module.exports.help = {

    name: "userinfo"
}