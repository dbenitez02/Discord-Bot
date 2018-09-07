
module.exports.run = async (bot, message, args) => {
    const logChannel = bot.channels.find("name", "admin-log");

    const addUser = message.guild.member((message.mentions.users.first()) || message.guild.members.get(args[0]));

    //Validates username
    if(!addUser) return message.author.send("UHHH I CAN'T FIND THAT PERSON, AHHHHHH!");

    //Cant add bots as friend
    if(addUser.bot) return message.author.send("I'M MR. MEESEEKS, YOU CAN'T ADD ME!");

    await addUser.addFriend().catch(error => logChannel.send(`Add command error: ${error}`)); // TODO: Fix this line.

    return 0;

}

module.exports.help = {

    name: "add"
}