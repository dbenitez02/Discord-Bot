const urban = require("relevant-urban");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    const logChannel = message.guild.channels.find("name", "admin-log");

    await message.channel.send("CAAAAAAAN DOOOOO!");

    // Check if there are arguments.
    if(!args[0]) return message.channel.send("UUUH YOU PUT NOTHING HERE!!");

    // if argument found, we will store it.
    const def = await urban(args.join(" ")).catch(error => { 
        message.author.send("Oppsie whoopsie, someone made a fucky wucky. Get the dev. ");
        console.log("urban module error error:\n" + error);
     });

     const embed = new Discord.RichEmbed()
        .setColor("#000d33")
        .setAuthor(def.word)
        .setTitle("Click here for more!")
        .setURL(def.urbanURL)
        .setFooter("Urban Dictionary", bot.user.displayAvatarURL)
        .setDescription(`Definition:\n${def.definition}`)
        .setTimestamp()
        .addField("Example: ", def.example)
        .addField(":thumbsup:", def.thumbsUp, true)  
        .addField(":thumbsdown:", def.thumbsDown, true);
        
    await message.channel.send('', {embed})
        .catch(error => { 
            logChannel.send("Embed error:" + error);
            console.log("Embed error" + error);
        });

    await message.channel.send("ALLLLLL DONE!");

    return 0;
     
}

module.exports.help = {

    name: "define"
}