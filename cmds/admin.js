const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    await message.channel.send("CAAAAAAAN DOOOOO!");

    const logChannel = message.guild.channels.find("name", "admin-log");
    const ifAdmin = message.member.hasPermission("ADMINISTRATOR");

    // if(!ifAdmin) return message.author.send("Hi, I'm Mr. Meeseeks and you don't have `ADMINISTRATOR`");

    const embed = new Discord.RichEmbed()
        .setTitle("Admin commands! OOOOOOH WEEEEEEEEEEE")
        .setDescription("Make sure to use @ when dealing with a user")
        .setColor('RANDOM')
        .setFooter("Mr. Meeseeks | v0.0.4.20.69", bot.user.displayAvatarURL)
        .setTimestamp()
        .addField("!setup", "*SERVER OWNER* Copy and paste to get started on your new meeseeks")
        .addField("!purge [num of messages]", "For when the chat gets cluttered, max 100 message.")
        .addField("!announce [message]", "Make an announcement!")
        .addField("!ban [username]", "When a user decides to fuck up everyone's life.")
        .addField("!kick [username]", "When a user is being an edgy 12-year-old fag.")
        .addField("!newrole [role]", "Create a new role!")
        .addField("!role [username] [role]", "Assign that fuckboi a role.")
        .addField("!mute [username]", "That annoying bitch being annoying? Mute them.")
        .addField("!unmute [username]", "Giving them the silent treatment must have worked.");

    if(ifAdmin) {
        try {
            message.author.send('', {embed})
        }
        catch(e) {
            logChannel.send("embed error. `admin command`" + e.stack);
            console.log(e.stack);
            message.author.send("Oopsie whoopsie someone made a fucky wucky. The dev might know.");
        }
    }
    else {
        await message.author.send("Hi, I'm Mr. Meeseeks and you don't have `ADMINISTRATOR` permission.");
    }

    return 0;
}

module.exports.help = {
    name: "admin"
}