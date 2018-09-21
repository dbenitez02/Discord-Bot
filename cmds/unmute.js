module.exports.run = async (bot, message, args) => {
    const logChannel = message.guild.channels.find("name", "admin-log");

    await message.channel.send("CAAAAAAAN DOOOOO!");

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Hi, I'm Mr. Meeseeks and you don't have `MANAGE_MESSAGES`");

    // Get the metioned user, return if there is none.
    const toMute = message.guild.member((message.mentions.users.first()) || message.guild.members.get(args[0]));

    // Sends a message if there is no user is mentioned
    if (!toMute) return message.author.send("UHHH, I CAN'T FIND THAT PERSON, its not you, its because I SUCK!!!!!");

    const role = message.guild.roles.find("name", "muted"); // The role all muters will have.

    if(!role || !toMute.roles.has(role.id)) return message.author.send("UUHHH THIS PERSON IS ALREADY UNMUTED!");

    // unmute if it passes all conditions.
    await toMute.removeRole(role).then((message) => {
        message.author.send(`I have unmuted ${toMute}`);
        console.log(`${message.author} has muted ${toMute}`);
    })
    .catch((error) => {
        logChannel.send("`Unmute command` error has occurred.");
        message.author.send("Someone made a fucky wucky. Get the dev.");
        console.log("unmute error:\n" + error);
    });

    logChannel.send(`${toMute} has been unmuted.`);
    toMute.send("You have been unmuted.");

    return 0;

}

module.exports.help = {

    name: "unmute"
}