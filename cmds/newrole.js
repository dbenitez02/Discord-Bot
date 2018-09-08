module.exports.run = async (bot, message, args) => {
    const logChannel = message.guild.channels.find("name", "admin-log");
    const ifAdmin = message.member.hasPermission("MANAGE_MESSAGES");
    
    await message.channel.send("CAAAAAAAN DOOOOO!");

    if(!ifAdmin) return message.author.send("Hi, I'm Mr. Meeseeks and you don't have `MANAGE_MESSSAGES` permission.");

    let newRole = message.guild.roles.find("name", args.join(" ").toLowerCase());

    if(!newRole) {
        try {
          newRole = await message.guild.createRole({
              name: args.join(" "),
              color: 'RANDOM',
              permissions: []
              });
          
        } catch(e) {
            logChannel.send("newrole command error:\n")
            logChannel.send(e.stack);
            message.channel.send("Someone made a fucky wucky. The dev might know.");
            
            }
    } else {

        message.author.send(`${newRole} has already been created.`);
        logChannel.send(`${newRole} has been created by ${message.author.username}.`);
        await message.author.send(`${newRole} HAS BEEN CREATED, OOOOOOOOOOHHH WEEEEEEE!`);
        await message.channel.send("ALLLLLL DONE!");
    }

    return 0;
}

module.exports.help = {

    name: "newrole"
}