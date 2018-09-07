const ytdl = require("ytdl-core");
const request = require("request");
const getYoutubeID = require("get-youtube-id");
const Discord = require("discord.js");
const fetchVideoInfo = require("youtube-info");
const botSettings = require("./botsettings.json"); // Import the settings from the file and read it as js

const bot = new Discord.Client({disableEveryone: true});      // Create an instance of a Client
bot.commands = new Discord.Collection();
const prefix = botSettings.prefix;
const yt_api_key = botSettings.yt_api_key;
//const botsettings = botSettings.bot_controller;

const guilds = {};


bot.login(botSettings.token);

bot.on('ready', async () => {
    console.log(`Ready for liftoff! ${bot.user.username}`);

    try {
        const link = await bot.generateInvite(["ADMINISTRATOR"]);
        console.log(link);
    } catch (e) {
            console.log(e.stack);
        }

});

bot.on('message', async () => {

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    const messageArray = message.content.split(" ");
    const command = messageArray[0];  // the command after the prefix.
    const args = messageArray.slice(1); // Slices off the command in messageArray leaving arguments.
  
    if(!command.startsWith(prefix)) return; // Returns the prefix of the command if not found
  
    var cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot, message, args);
  
    // This list of variables is solely for music.
    //const mess = message.content.toLowerCase();

    /**
   * @property queue
   * @property queueNames
   * @property isPlaying
   * @property dispatcher
   * @property voiceChannel
   * @property skipReq
   * @property skippers  
   */

  // All the necessary properties for the guilds{} object.
  if(!guilds[message.guild.id]) {
    guilds[message.guild.id] = {
      queue: [],
      queueNames:[],
      isPlaying: false,
      dispatcher: null,
      voiceChannel: null,
      skipReq: 0,
      skippers: []

    };
  }
  
    if(!command.startsWith(prefix)) return;

    if(command === `${prefix}play`) {
        if(message.member.voiceChannel || guilds[message.guild.id].voiceConnection !== null) {

            //Checks if there's a queue.
            if(guilds[message.guild.id].queue.length > 0 || guilds[message.guild.id].isPlaying) {
      
              //Gets the ID of the argument and adds it to the queue 
              getID(args, id => {
                addToQueue(id, message);
      
                //searches for the information of the video in order to display the title.
                fetchVideoInfo(id, (err, videoInfo) => {
      
                  if (err) throw new Error(err);
                  message.reply(`Up next: **${videoInfo.title}**`);
                  guilds[message.guild.id].queueNames.push(videoInfo.title);
                });
              });
            } 
      
            //If there's no queue, then immediately stream audio.
            else {
              guilds[message.guild.id].isPlaying = true;
              getID(args, id => {
      
                guilds[message.guild.id].queue.push("placeholder");
                playMusic(id, message);
                fetchVideoInfo(id, (err, videoInfo) => {
      
                  if (err) throw new Error(err);
                  message.channel.send( `Now playing **${videoInfo.title}**`);
                  //msg.delete(1000);
                  guilds[message.guild.id].queueNames.push(videoInfo.title);
                });
              });
            }
          }
          //If there are no users in the voice channel
          else {
            message.channel.send("Need listeners in voice channel.");
            //msg.delete(300);
          }
      
          return;
    }

    if (command === `${prefix}skip`) {
    // Validate if there's at least one person in the voice channel
    // Add a skip request is a user requests it
    if(guilds[message.guild.id].skippers.indexOf(message.author.id) === -1) {
        guilds[message.guild.id].skippers.push(message.author.id);
        guilds[message.guild.id].skipReq++;
  
        //Take the number of people in the room - 1 (because of bot) and / 2 for minimun # of skips requested.
        if(guilds[message.guild.id].skipReq >= Math.ceil((guilds[message.guild.id].voiceChannel.members.size - 1) / 2)) {
          skipSong(message);
          await message.channel.send("Song must have sucked. Jk. Skipped at the very least.");
        } 
          else {
            await message.channel.send("Skips needed: **" + (Math.ceil((guilds[message.guild.id].voiceChannel.members.size - 1) / 2) - guilds[message.guild.id].skipReq) + "**");
          }
      } 
        else {
          await message.reply(" You already voted.");
        }
  
    }

    if (command === `${prefix}stop`) {
        if(!message.member.hasPermission("ADMINISTRATOR")) {
          await message.channel.send("You dont have the power to stop me! Just mute or leave.");
        }

        if(guilds[message.guild.id].isPlaying == false) {
          message.reply("Nothing is playing son.");
          //msg.delete(500);
        }
        else {
          message.reply("Theres no more sound, only peace, probably.");
          //msg.delete(500);
    
          guilds[message.guild.id].queue = [];
          guilds[message.guild.id].queueNames  =[];
          guilds[message.guild.id].isPlaying = false;
          guilds[message.guild.id].dispatcher.end();
          guilds[message.guild.id].connection.disconnect;
          guilds[message.guild.id].voiceChannel.leave();
        }
    
        return;
    }

    if (command === `${prefix}queue`) {
        var message = "```";
      
        for(var i = 0; i < guilds[message.guild.id].queueNames.length; i++) {
          
          var temp = (i + 1) + ": " + guilds[message.guild.id].queueNames[i] + (i === 0 ? " <----Current Song" : "") + "\n";
          if((temp).length <= 2000) {
            temp;
          }
          else {
            message.channel.send(message);
          }
        }
        message.channel.send(message);
    
        return;
    }

});

   /**
    * @param message
    */
   function skipSong(message) {
    guilds[message.guild.id].dispatcher.end();

   }

   /**
    * @param id 
    * @param message
    */
  function playMusic(id, message) {
   const voiceChannel = message.member.voiceChannel;

    voiceChannel.join().then(connection => {
      // TODO: create a conditional to accept shortened youtube links.

      const stream = ytdl("https://www.youtube.com/watch?v=" + id, { filter: 'audioonly'});

      guilds[message.guild.id].skipReq = 0;
      guilds[message.guild.id].skippers = [];

      guilds[message.guild.id].dispatcher = connection.playStream(stream);
      guilds[message.guild.id].dispatcher.on('end', () => {
        guilds[message.guild.id].skipReq = 0;
        guilds[message.guild.id].skippers = [];
        guilds[message.guild.id].queue.shift();
        guilds[message.guild.id].queueNames.shift();

        if(guilds[message.guild.id].queue.length === 0) {
          guilds[message.guild.id].queue = [];
          guilds[message.guild.id].queueNames = [];
          guilds[message.guild.id].isPlaying = false;
        }
        else {
          setTimeout( () => {
            playMusic(guilds[message.guild.id].queue[0], message);
          }, 1000);
          playMusic(guilds[message.guild.id].queue[0], message);
        }
      })
    });
  }

  /**
   * @param string or str. 
   */
   function getID(str) {

     if(isYoutube(str)) {
       return getYoutubeID(str);
     } 
     else {
       searchVideo(str, id => {
        return id;
       });
     }

     return 0;
   }

   /**
    * @param strID 
    */
  function addToQueue(strID, message) {
    if(isYoutube(strID)) {
      guilds[message.guild.id].queue.push(getYoutubeID(strID));
    } 
    else {
      guilds[message.guild.id].queue.push(strID);
    }
  }

  /**
   * @param query 
   * @param callback
   * TODO: Fix the bug where the title is not being searched for.
   */
  function searchVideo(query, callback) {
    request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + yt_api_key, (error, response, body) => {
        console.log("error:", error);
        console.log("respnose", response);
        const json = JSON.parse(body);
        if(!json.items) { 
            return console.log("nothing of the sort for this vid.");
        }
        else {
            return callback(json.items.id.videoId);
        }
    }   );
  }

  /**
   * @param str 
   */
  function isYoutube(str) {
    return str.toString().toLowerCase()
            .indexOf("youtube.com") > -1;
  }
