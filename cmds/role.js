module.exports.run = async (bot, message, args) => {
    const logChannel = message.guild.channels.find("name", "admin-log");

    await message.channel.send("CAAAAAAAN DOOOOO!");

    if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("WHY DID YOU SUMMON ME FOR THIS, YOU CAN'T USE IT, AHHHHHHHH!");

    //creating declarations to validate the user and role.
    const userRole = message.guild.member((message.mentions.users.first() || (message.guild.members.get(args[0]))));
    const assignRole = message.guild.roles.find("name", args[1].toLowerCase());

    // Check for a valid username.
    if(!userRole) return message.author.send("UUUHHHHHHH, YOU FORGOT A USERNAME, I'M MR. MEESEEKS!");

    // Check for valid role.
    if(!assignRole) return message.author.send("UUUHHHHH, YOU FORGOT TO TYPE A ROLE");

    // Check to see if user already has role.
    if(userRole.roles.has(assignRole)) return message.author.send(`They're already assigned ${assignRole}`);

    userRole.addRole(assignRole).catch(error => `role command error: ${error}`);
    await message.channel.send(`${userRole} is now ${assignRole}!! OOOOHHHH WEEEEEE!`);
    logChannel.send(`${userRole} is now ${assignRole}, assigned by ${message.author.username}.`);

    return 0;

}

module.exports.help = {

    name: "role"
}