module.exports.run = async (bot, message, args) => {
    const logChannel = message.guild.channels.find("name", "admin-log");

    //Condition conditions conditions
    //Check if the user has the write to modity messages
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("UHHHH, I CAN'T LET YOU USE THIS, WHY MUST YOU SUMMON ME!! You need `MANAGE_MESSAGES`");
    
    if(isNaN(args[0])) { // A boolean to check if a number is entered.
      return message.author.send("YOU DIDN'T ENTER A NUMBER! AHHHHHH!");
  
    }


    await purge(bot, message, args); // Add a third parameter here.. that being the bot.

    logChannel.send(`${message.author} has used the purge command!`);

    return 0;
}

async function purge(bot, message, args) {
    const logChannel = message.guild.channels.find("name", "admin-log");

    message.delete(); // Delete the command message

    const num = await message.channel.fetchMessages({limit: args[0]}); // Grabs the first argument from the command if there is one.
    logChannel.send(`${num.size} messages found and deleting...`); // Output number of messages deleted in the console

    //Now to delete the messages
    if(num.size > 100) {
        message.author.send("THIS CAN'T MORE THAN 100 MESSAGES!!!");

    }
    else {
        message.channel.bulkDelete(num)
            .catch(error => {
                logChannel.send("`purge command` error occurred."); 
                console.log("A purge command error occurred\n" + error); 
                message.author.send("Oopsie woopsie someone created a fucky wucky. Get the dev."); 
            });
        return;
    }
}

module.exports.help = {
    name: "purge"
}