const Discord = require("discord.js");

module.exports.run = async (bot, message, args)  => {

    await message.channel.send("CAAAAAAAN DOOOOO!");

    const logChannel = bot.channels.find("name", "admin-log");
    const ifAdmin = message.author.hasPermission("ADMINISTRATOR");

    if(!ifAdmin) return message.author.send("Hi, I'm Mr. Meeseeks and you don't have `ADMINISTRATOR`");

    const embed = new Discord.RichEmbed()
        .setTitle("Admin commands! OOOOOOH WEEEEEEEEEEE")
        .setColor('RANDOM')
        .setFooter("Beta bot | v0.0.4.20.69", bot.user.displayAvatarURL)
        .setTimestamp()
        .addField("!announce", "Make an announcement!")
        .addField("!ban", "When a user decides to fuck up everyone's life.")
        .addField("!kick", "When a user is being an edgy 12-year-old fag.")
        .addField("!newrole", "Create a new role!")
        .addField("!role", "Assign some fuckboi a role.")
        .addField("!mute", "That annoying bitch being annoying? Mute them.")
        .addField("!unmute", "Giving them the silent treatment must have worked.");

    await message.author.send('', {embed}).catch(error => logChannel.send(`admin command error: ${error}`));
    await message.channel.send("ALLL DONE!!!!");

    return 0;
}

module.exports.help = {
    name: "admin"
}