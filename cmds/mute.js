module.exports.run = async (bot, message, args) => {
  const logChannel = bot.channels.find("name", "admin-log");

  await message.channel.send("CAAAAAAAN DOOOOO!");
  
  //Checks if the user has the permission "MANAGE_MESSAGES"
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You do not have manage messages");

  //Get the metioned user, return if there is none.
  const toMute = message.guild.member((message.mentions.users.first()) || (message.guild.members.get(args[0]))); // I think use .find() instead of .get()
      
  //Checks if the user entered a username or ID.
  if (!toMute) return message.author.send("I CAN'T FIND THAT PERSON AHHHHHHHHH!");
      
  //Checks if the user is muting themselves.
  if(toMute.id === message.author.id) return message.reply("Hi! I'm Mr. Meeseek, you can't mute yourself.");
      
  //Checks if user is muting another user with a higher role.
  if(toMute.highestRole.position >= message.member.highestRole.position) return message.reply("No.");
      
  //Finds a role for people muted.
  let role = message.guild.roles.find("name", "muted");
          
  //If there is no role, then the bot creates a role.
  if(!role) {
    try {
      role = await message.guild.createRole({
          name: "muted",
          color: "#000000",
          permissions: []
          });
      
      //Does not allow the user muted to send messages or add reactions
      message.guild.channels.forEach(async (channel, id) => {
      await channel.overwritePermissions(role, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false,
            });
          });
      } catch(e) {
          logChannel.send(e.stack); // Error would normally mean there was nothing to mute.
          logChannel.send("Someone made a fucky wucky. Dev might know.");
          }
        }
  //Checks if a user is already muted.
  if(toMute.roles.has(role.id)) return message.author.send("This user is already muted!");
      
  //Mutes user and adds them to the muted group
  toMute.addRole(role).catch(error => logChannel.send(`mute command error: ${error}`));
  await message.author.send(`I have muted ${toMute}`);
  logChannel.send(`${toMute} has been muted.`);
      
  return 0;

}

module.exports.help = {

    name: "mute"
}