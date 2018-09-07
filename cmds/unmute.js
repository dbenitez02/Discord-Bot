module.exports.run = async (bot, message, args) => {
    const logChannel = bot.channels.find("name", "admin-log");

    await message.channel.send("CAAAAAAAN DOOOOO!");

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Hi, I'm Mr. Meeseeks and you don't have `MANAGE_MESSAGES`");

    // Get the metioned user, return if there is none.
    const toMute = message.guild.member((message.mentions.users.first()) || message.guild.members.get(args[0]));

    // Sends a message if there is no user is mentioned
    if (!toMute) return message.author.send("UHHH, I CAN'T FIND THAT PERSON, its not you, its because I SUCK!!!!!");

    const role = message.guild.roles.find("name", "muted"); // The role all muters will have.

    if(!role || !toMute.roles.has(role.id)) return message.reply("UUHHH THIS PERSON IS ALREADY UNMUTED!");

    await toMute.removeRole(role).catch(error => logChannel.send(`Unmute command error: ${error}`)); // unmute if it passes all conditions.
    await message.author.send(`I have unmuted ${toMute}`);
    logChannel.send(`${toMute} has been unmuted.`);

    return 0;

}

module.exports.help = {

    name: "unmute"
}