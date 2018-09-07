module.exports.run = async (bot, message, args) => {
    const logChannel = bot.channels.find("name", "admin-log");

    await message.channel.send("CAAAAAAAN DOOOOO!");

    if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("WHY DID YOU SUMMON ME FOR THIS, YOU CAN'T USE IT, AHHHHHHHH!");

    //Creating declarations to validate the user and role.
    const userRole = message.guild.member((message.mentions.users.first()) || (message.guild.members.find("username", args[0])));
    const assignRole = message.guild.roles.find("name", args[1].toLowerCase());

    //Checks for valid username.
    if(!userRole) return message.author.send("UUUHHHHHHH, YOU FORGOT A USERNAME, I'M MR. MEESEEKS!");

    //Create a new role if it does not exist.
    if(!assignRole) return message.author.send(`UUUHHHHH, I CAN'T FIND ${assignRole}`);

    //Grants the user that role
    userRole.addRole(assignRole).catch(error => logChannel.send(`role command error: ${error}`));
    await message.channel.send(`${userRole} is now ${assignRole}!! OOOOHHHH WEEEEEE!`);
    logChannel.send(`${userRole} is now ${assignRole}, assigned by ${message.author.username}.`);

    return 0;

}

module.exports.help = {

    name: "role"
}