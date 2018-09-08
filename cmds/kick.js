module.exports.run = async (bot, message, args) => {
    const logChannel = message.guild.channels.find("name", "admin-log");

    await message.channel.send("CAAAAAAAN DOOOOO!");

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Hi, I'm Mr. Meeseeks and you don't have `ADMINISTRATOR`");
    
    const user = message.guild.member((message.mentions.users.first())); // Grab user by mentions.

    if(!user) return message.author.send("UHHHH, I can't find that person, it's not you, it's because I SUCK!!!");

    const member = message.guild.member(user); // Need to grab the member to kick.

    if(member) {    
        try {
            member.kick(`Probably was being a little shit.`); // That boi got kicked.
            message.author.send(`${user} has been given the motherfucking boot.`);
            logChannel.send(`${user} got kicked.`);
        }
        catch(e) {
            logChannel.send(e.stack); // Send errors to check what happened.
            logChannel.send("Someone made a fucky wucky. The dev might know.");

    }
}

    return 0;

}

module.exports.help = {
    name : "kick"
}