const Discord = require("discord.js");

module.exports.run =  async (bot, message, args) => {

    const logChannel = bot.channels.find("name", "admin-log");

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.author.send("I'M MR.MEESEEKS LOOK AT ME, YOU DON'T HAVE `MANAGE_MESSAGES`");

    message.delete();
    
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.author.send("UHHHH, I CAN'T LET YOU USE THIS, WHY MUST YOU SUMMON ME!!");
    if(!args[0]) return message.author.send("I CAN'T ANNOUNCE ANYTHING, PUT SOMETHING!!");

    const announcement = args.join(" ");    // Create a variable to store the messge.
    

    // Check to see if the channel to post announcemnt exists.
    var channelToAnnounce = message.guild.channels.find("name", "announcements");

     // If designated channel does not exist, create one!
    if(!channelToAnnounce) {
        try {
            channelToAnnounce = message.guild.createChannel("announcements", "text");
        }
        catch(e) {
            logChannel.send(e.stack);
            logChannel.send("Someone created a fucky wucky. Ask the dev.");
        }
    }
    const announceChannel = bot.channels.find("name", "announcements"); // send the message to the channel once or if it has been created

    const embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(`${message.author.username} just announced:`)
        .setDescription(announcement)
        .setFooter("Mr. Meeseeks | v0.0.4.20.69", bot.user.displayAvatarURL)
        .setTimestamp();
    await announceChannel.send('Hey! @everyone\n', {embed}).catch(error => logChannel.send(`announcement command error: ${error}`)); 
    logChannel.send("An anouncement has been made.");

    message.author.send("ALLL DOOOONE.");

    return 0;
}

module.exports.help = {

    name: "announce"
}