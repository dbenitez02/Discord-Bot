module.exports.run = (bot, message, args) => {

    // gotta check for the channel and role.
    const logChannel = bot.channels.find("name", "admin-log");
    const checkRole = message.guild.roles.find("name", "plebs");
    message.author.send("Checking on a couple of things");
    logChannel.send("Checking for this channel.");
    
    // First order of business, check for event logger
    if(!logChannel) {
        try {
            message.guild.createChannel('admin-log', 'text', [{
                allow: ['ADMINISTRATOR']
            }])

            message.author.send("A log event channel has been created.");
        } catch (e) {
            console.log(e.stack);
            message.author.send("Oopsie whoopsie someone made a fucky wucky. The dev might know.");
        }
    } else {
        message.author.send("A log event channel is already created");
    }

    // Time to check for the existance of a role.
    if(!checkRole) {
        try {
          message.guild.createRole({
              name: "plebs",
              color: 'RANDOM',
              permissions: []
              });

              message.author.send("Plebs has been created")
          
        } catch(e) {
            logChannel.send(e.stack);
            message.author.send("Oopsie whoopsie someone made a fucky wucky. The dev might know."); 
        }
    } else {
        message.author.send("The role plebs has already been created");
    }

    message.author.send("ALLLLLL DONE!");

}
module.exports.help = {
    name: "setup"
}