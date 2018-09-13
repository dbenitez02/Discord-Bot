
module.exports.run = async (bot, message, args) => {
    const logChannel = bot.channels.find("name", "admin-log");

    const addUser = message.guild.member((message.mentions.users.first()) || message.guild.members.get(args[0]));

    //Validates username
    if(!addUser) return message.author.send("UHHH I CAN'T FIND THAT PERSON, AHHHHHH!");

    //Cant add bots as friend
    if(addUser.bot) return message.author.send("I'M MR. MEESEEKS, YOU CAN'T ADD ME!");

    await addUser.addFriend().then(message.author.send(`I send a friend request to ${addUser}`))
    .catch(error => { 
        logChannel.send("`Add command` error:" + error);
        console.log("add command error\n" + error);
        message.author.send("Friend request failed."); });

    return 0;

}

module.exports.help = {

    name: "add"
}