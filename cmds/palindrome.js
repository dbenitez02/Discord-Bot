
module.exports.run = async  (bot, message, args) => {
    await message.channel.send("CAAAAAAAN DOOOOO!");

    const string = args.join(" ");
    if (!string) return message.channel.send("UHHH I THINK YOU FORGOT SOMETHING."); 

    // set postions of the first and last character of the string.
    var first = 0;
    var last = string.length - 1;
    
    while(last > first) {
        // Move to the next position if the position does not contain a character.
        if(string[first].match(/[\W_]/g)) {  // The RegEx checks for non-characters only.
            first++;
        }
        if(string[last].match(/[\W_]/g)) {  
            last--;
        }

        // Time for the comparison, if mismatch then false.+
        if(string[first].toLowerCase() !== string[last].toLowerCase()) {
             return message.channel.send("OOOOH NOOO, THAT IS NOT A PALINDROME!!");
        }

        // If both characters are true then check the next pair.
        first++;
        last--;       
    }

    // if all characters match, we is good to go!
        
    await message.channel.send(`OOOOOHHH WEEEEE! ${string} is a palindrome!!!`);
    
    return 0;
}

module.exports.help = {

    name: "palindrome"
}