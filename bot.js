//const ytdl = require("ytdl-core");
//const request = require("request");
//const getYoutubeID = require("get-youtube-id");
//const fetchVideoInfo = require("youtube-info");
const botSettings = require("./botsettings.json"); // Import the settings from the file and read it as js
const Discord = require("discord.js"); // Import the discord.js module
const antiSpam = require("discord-anti-spam");
const fs = require("fs");

const bot = new Discord.Client({disableEveryone: true});      // Create an instance of a Client
bot.commands = new Discord.Collection();
const prefix = botSettings.prefix;
//const yt_api_key = botSettings.yt_api_key;
//const botsettings = botSettings.bot_controller;

/**
 * TODO:
 * 1. Need to create separate files for each command to make this look cleaner.[DONE]
 * 2. Debug the fuck out of a couple of commands that are already noted.. Gonna need some alcohol. [DONE]
 * 3. Test the the commands and spend the rest of my life debugging them. [Still need to debug user-related commands]
 * 4. Research some shit about youtubes api. [Its broken, tabled.]
 * 5. Create an annoucement command. [DONE] 
 * 6. Create a purge command. [DONE]
 * 7. Create a ban command. [Needs to be tested.]
 */

 // Reads files from the cmds and sends an error if there is any while searching commands
 fs.readdir("./cmds/", (err, files) => {
  if(err) console.error(err);

  // filters any files that ends with .js and creates an array.
  var jsfiles = files.filter(f => f.split(".").pop() === "js");

  // Checks if there are no files
  if(jsfiles.length <= 0) {
    console.log("No commands");
    return;
  }

  console.log(`Loading ${jsfiles.length} commands...`); // List number of commands found.


  // Prints commands in file.
  jsfiles.forEach((f, i) => { //Loops through each file.
    var props = require(`./cmds/${f}`);
    console.log(`${i + 1}: ${f} loaded!`);
    bot.commands.set(props.help.name.toLowerCase(), props);
  });
 });

// Accepts any link form.
// const URL_REG_EXP = /^(?:https?:\/\/)?(?:w{3}\.)?(?:youtu\.be\/|youtube\.com\/watch\?v=)[\w-]{11}$/i;

// Bot logs in
bot.login(process.env.TOKEN);

bot.on('ready', async () => {
  console.log(`READY TO RUMBLE!!!!!! ${bot.user.username}`);

  try {
    const link = await bot.generateInvite(["ADMINISTRATOR"]);
    console.log(link);
  } catch (e) {
     console.log(e.stack);
   }
   antiSpam(bot, {
    warnBuffer: 3, //Maximum amount of messages allowed to send in the interval time before getting warned.
    maxBuffer: 5, // Maximum amount of messages allowed to send in the interval time before getting banned.
    interval: 500, // Amount of time in ms users can send a maximum of the maxBuffer variable before getting banned.
    warningMessage: "Hi! Mr. Meekseeks, Im here to give you your last warning.", // Warning message send to the user indicating they are going to fast.
    banMessage: "Dis fuckboi has been banned for being an annoying shit, anyone else up for the ban?", // Ban message, always tags the banned user in front of it.
    maxDuplicatesWarning: 6,// Maximum amount of duplicate messages a user can send in a timespan before getting warned
    maxDuplicatesBan: 8, // Maximum amount of duplicate messages a user can send in a timespan before getting banned
    deleteMessagesAfterBanForPastDays: 2 // Delete the spammed messages after banning for the past x days.
   });

   console.log("The anti spam is locked and loaded.");

   bot.user.setStatus('online');
   bot.user.setPresence({ game: { name: 'use !meeseeks for help', type: 0 } })
});

// Create an event listener for new guild members
bot.on('guildMemberAdd', member => {
  const logChannel = bot.channels.find("name", "admin-log");

  logChannel.send(`User ${member.user.username} has joined the server.`);

  var role = member.guild.roles.find("name", "plebs");
  member.addRole(role); // New user shall be will fall with the rest of the plebs.

  logChannel.send(`The one named ${member.user} has joined the server.`); // Let mods know a new user joined.

  // Sends a reply message to the new member.
   member.send(`HI ${member.user.username}! I'M MR. MEESEEKS!! LOOK AT MEEEEEE!! Use !meeseeks for commands!`);
  
  });

bot.on("message", message => {
  
  
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  const messageArray = message.content.split(" ");
  const command = messageArray[0];  // the command after the prefix.
  const args = messageArray.slice(1); // Slices off the command in messageArray leaving arguments.

  /**
   * What would Mr. Meeseeks say?
   */
  if(message.content.toLowerCase() === `summon mr. meeseeks`) {
    message.channel.send("I'M MR. MEESEEKS! LOOK AT MEEEEE!!!!!!");
  
  }

  if(message.content.toLowerCase() === `existence`) {
    message.channel.send("EXISTENCE IS PAIN!!!!!");

  }

  if(message.content.toLowerCase() === `good`) {
    message.channel.send({
      files: [{
        attachment: '/Users/Dan/Documents/Jsbot/pics/good.jpg',
        name: 'good.jpg'
      }]
    })
      .catch(console.error);
  }

  if(message.content.toLowerCase() === `die`) {
    message.channel.send({
      files: [{
        attachment: '/Users/Dan/Documents/Jsbot/pics/die.jpg',
        name: 'die.jpg'
      }]
    })
      .catch(console.error);
  }

  if(!command.startsWith(prefix)) return; // Returns the prefix of the command if not found

  var cmd = bot.commands.get(command.slice(prefix.length));
  if(cmd) cmd.run(bot, message, args);  // Checks to make sure the command exists.


  if(!command.startsWith(prefix)) return;
  
});