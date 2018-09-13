module.exports.run = async (bot, message, args) => {
    const logChannel = message.guild.channels.find("name", "admin-log");

    await message.channel.send("CAAAAAAAN DOOOOO!");

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.author.send("Hi, Im Mr. Meeseeks, you don't have `manage message`");
    
    const toUnblock = message.guild.member((message.mentions.users.first()) || (message.guild.members.get(args[0])));

    //Check if a username is entered.
    if(!toUnblock) return message.author.send("I CAN'T FIND THE PERSON YOU ARE LOOKING FOR!!!");

    //Check if user blocked themselves.
    if(toUnblock.id === message.author.id) return message.author.send("Can't unblock yourself boi.");

    //Unblock user
    await toUnblock.unblock().then(message.author.send(`I have unblocked ${toUnblock}`))
        .catch((error) => {
            logChannel.send("`unblock command` error occurred.");
            message.author.send("Someone made a fucky wucky. Get the dev.");
            console.log("unblock command error" + error);
        });
    logChannel.send(`User ${toUnblock} has been unblocked.`);

    return 0;

}

module.exports.help = {

    name: "unblock"
}