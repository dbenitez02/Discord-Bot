module.exports.run = async (bot, message, args) => {
    
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You do not have the permission to use this.");

    await message.channel.send("https://www.youtube.com/watch?v=SgDZ9LhZ2_g");
    return 0;

}
module.exports.help = {
    name: "Satan"
}