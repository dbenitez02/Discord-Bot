module.exports.run = async (bot, message, args) => {
    const logChannel = bot.channels.find("name", "admin-log");

    await message.channel.send("CAAAAAAAN DOOOOO!");

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.author.send("You do not have manage message");
    
    const toBlock = message.guild.member((message.mentions.users.first()) || message.guild.members.get(args[0]));

    //Check if a username is entered.
    if(!toBlock) return message.author.send("UHHHH, I CAN'T FIND THAT PERSON, I'M MR. MEESEEKS!!");

    //Check if user blocked themselves
    if(toBlock.id === message.author.id) return message.author.send("Hi, I'm Mr. Meeseeks, YOU CAN'T BLOCK YOURSELF.");

    //Block user
    await toBlock.block().catch(error => logChannel.send(`block commmand error: ${error}`));
    await message.author.send(`I have blocked ${toBlock}'s`);
    logChannel.send(`${toBlock} has been blocked.`);

    return 0;

}

module.exports.help = {

    name: "block"
}