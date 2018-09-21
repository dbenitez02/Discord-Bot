module.exports.run = async (bot, message, args) => {
    var usersBlock = {};

    const logChannel = message.guild.channels.find("name", "admin-log");

    await message.channel.send("CAAAAAAAN DOOOOO!");

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.author.send("You do not have manage message");
    
    const toBlock = message.guild.member((message.mentions.users.first()) || message.guild.members.get(args[0]));

    //Check if a username is entered.
    if(!toBlock) return message.author.send("UHHHH, I CAN'T FIND THAT PERSON, I'M MR. MEESEEKS!!");

    //Check if user blocked themselves
    if(toBlock.id === message.author.id) return message.author.send("Hi, I'm Mr. Meeseeks, YOU CAN'T BLOCK YOURSELF.");

    //Block user
    await toBlock.block().then(usersBlock.push(toBlock.id))
        .catch(error => {
            message.author.send("Oppsie whoopsie, someone made a fucky wucky. Get the dev.");
            logChannel.send("`block commmand` error has occurred");
            console.log("Block command error:\n" + error); 
        });
    
    message.author.send(`I have blocked ${toBlock}`);
    logChannel.send(`${toBlock} has been blocked.`);

    return 0;

}

module.exports.help = {

    name: "block"
}