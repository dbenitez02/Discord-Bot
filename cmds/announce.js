const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    const logChannel = message.guild.channels.find("name", "admin-log");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.author.send("Hi, I'm Mr. Meeseeks and you dont have `MANAGE_MESSAGES`.");
    message.delete();
    
    if(!args[0]) return message.author.send("I CAN'T ANNOUNCE ANYTHING, PUT SOMETHING!!");

    const announcement = args.join(" ");    // Create a variable to store the message.
    

    // Check to see if the channel to post announcemnt exists.
    var channelToAnnounce = message.guild.channels.find("name", "announcements");

     // If designated channel does not exist, create one!
    if(!channelToAnnounce) {
        try {
            channelToAnnounce = await message.guild.createChannel("announcements", "text");
        }
        catch(e) {
            logChannel.send(e.stack);
            logChannel.send("Someone created a fucky wucky. Ask the dev.");
        }
    }
    const announceChannel = message.guild.channels.find("name", "announcements"); // send the message to the channel once or if it has been created

    const embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(`${message.author.username} just announced:`)
        .setDescription(announcement)
        .setFooter("Mr. Meeseeks | v0.0.4.20.69", bot.user.displayAvatarURL)
        .setTimestamp();

        try {
            await announceChannel.send('Hey! @everyone\n', {embed});
            logChannel.send(message.author + " has made an anouncement.");
            console.log("announce command used.")
        }
        catch(e) {
            console.log("Annouonce command error:\n" + e.stack);
            message.author.send("Someone created a fucky wucky. The dev might know.");
            logChannel.send("`Announce command` error\n" + e.stack);
        }

    return 0;
}

module.exports.help = {

    name: "announce"
}