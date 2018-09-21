const urban = require("relevant-urban");
const Discord = require("discord.js");
const Util = require("discord.js");

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
     const a = def.definition;

     // Going to split off any excessively long definitions to prevent errors from occurring.
     const word = Util.splitMessage(a, {maxLength: 700, char: ' ', append: '...' });
     for (const num of word) {
     // Do nothing in the loop, grabbing arrays. Theres definitely a faster way of grabbing the first array.
     }
     const chunk = word[0]; // Grab the first array to display the definition.

     const embed = new Discord.RichEmbed()
        .setColor("#000d33")
        .setAuthor(def.word)
        .setTitle("Click here for more!")
        .setURL(def.urbanURL)
        .setFooter("Urban Dictionary", bot.user.displayAvatarURL)
        .setDescription(`Definition:\n${chunk}`)
        .setTimestamp()
        .addField("Example: ", def.example)
        .addField(":thumbsup:", def.thumbsUp, true)  
        .addField(":thumbsdown:", def.thumbsDown, true)

        if(embed) {
            try {
                message.channel.send('', {embed})
            }
            catch(e) {
                logChannel.send("`define command` has error occurred");
                message.author.send("Someone made a fucky wucky. Get the dev.")
                console.log("Embed error:\n" + e);
            }
        }

    await message.channel.send("ALLLLLL DONE!");

    return 0;
     
}

module.exports.help = {

    name: "define"
}