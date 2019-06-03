const fs = require('fs');
module.exports = async(msg) => {
    if (msg.trim() == "*8balladd" && msg.author.id == process.env.MikkID || msg.trim() == "*8balladd" && msg.author.id == process.env.RasmusID || msg.trim() == "*8balladd" && msg.author.id == process.env.yourID)
    {
        if (msg.content.endsWith("8balladd")) {
            return "Please insert a message to add to the repository of 8ball!";
        }
        else {
            var commandLength = "asdasdasdd";
            fs.appendFileSync("sayings.txt", msg.content.slice(commandLength.length).split(/ + /) + "\r\n");
            console.log("Sayings file has been updated\nAdded: '" + msg.content.slice(commandLength.length).split(/ + /) + "'");
            
            return ("The message: '" +  msg.content.slice(commandLength.length).split(/ + /) + "' has been added to the 8ball repository!");
        }
    }
    else{
        return false;
    }
}