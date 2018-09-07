const Discord = require("discord.js");

module.exports.run = (bot, message, args) => {

    const logChannel = bot.channels.find("name", "admin-log");
    const ifAdmin = message.member.hasPermission("MANAGE_MESSAGES");

    message.delete();
    
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

        if(ifAdmin) {
            try {
                announceChannel.send('Hey! @everyone\n', {embed});
                logChannel.send("An anouncement has been made.");
            }
            catch(e) {
                logChannel.send(e.stack);
                logChannel.send("Someone created a fucky wucky. The dev might know.");
            }
        } else {
            message.author.send("UHHHH, I CAN'T LET YOU USE THIS, WHY MUST YOU SUMMON ME!!");
        }


    return 0;
}

module.exports.help = {

    name: "announce"
}