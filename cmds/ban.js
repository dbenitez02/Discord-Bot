module.exports.run = async (bot, message, args) => {
    var userBanned = {};
    const logChannel = message.guild.channels.find("name", "admin-log");

    message.author.send("CAAAAAAAN DOOOOO!");

    // Gotta have them admin rights in order to ban.
    if(!message.author.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have human rights!");

    const userBan = message.guild.member((message.mentions.users.first()) || (message.guild.members.find("username", args[0])));
    const numDays = args[1];

    // Checks for a valid username
    if(!userBan) return message.channel.send("UHH, I CAN'T FIND THAT PERSON. It's not you, I just SUCK!!");

    // Can't ban admins.
    if(userBan.highestRole.position >= message.member.highestRole.position) return message.reply("Hi, I'm Mr. Meeseeks, and you have insufficient rights to ban " + userBan);

    // Ban that sumbitch
    await userBan.ban(numDays).then(userBanned.push(userBan))
        .catch(error => { 
            message.author.send("Oppsie whoopsie, someone made a fucky wucky. Ask the dev.");
            logChannel.send("`ban command` error:"  + error); 
            console.log("ban command error\n" + error);
        });
    logChannel.send(`${userBan} has been banned for ${numDays} days by ${message.author.username}.`);
    console.log(`${userBan} has been banned for ${numDays} days by ${message.author.username}.`);

    return 0;
}
module.exports.help = {
    name: "Ban"
}