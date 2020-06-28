const setupCMD = "~createrolemessage";
let initialMessage = `**React to the messages below to receive the associated role. If you would like to remove the role, simply remove your reaction!**`;
const roles = ["Runescape", "Osu!", "League", "Fortnite"];
const reactions = ["🐉", "🥑", "🌞", "🏵"];
const commands = require("./commands");
const fs = require("fs");
require('dotenv').config();

const Discord = require("discord.js");
const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Latest commit hash: ` + hash);
  fs.appendFileSync(
    "uptime.txt",
    Date(Date.now()).toString() + " Logged in!" + "\r\n"
  );
  client.user.setActivity("*" + "help", { type: "PLAYING" });
});

client.on("message", (msg) => {
  if (msg.author.bot) {
    return;
  }

  Object.values(commands).forEach(async (command) => {
    const response = await command(msg.content);
    if (response) {
      msg.reply(response);
    }
  });
});

if (roles.length !== reactions.length)
  throw "Roles list and reactions list are not the same length!";

function generateMessages() {
  var messages = [];
  messages.push(initialMessage);
  for (let role of roles)
    messages.push(`React below to get the **"${role}"** role!`);
  return messages;
}

client.on("message", (message) => {
  if (
    message.author.id == process.env.yourID &&
    message.content.toLowerCase() == setupCMD
  ) {
    var toSend = generateMessages();
    let mappedArray = [
      [toSend[0], false],
      ...toSend.slice(1).map((message, idx) => [message, reactions[idx]]),
    ];
    for (let mapObj of mappedArray) {
      message.channel.send(mapObj[0]).then((sent) => {
        if (mapObj[1]) {
          sent.react(mapObj[1]);
        }
      });
    }
  }
});

client.on("raw", (event) => {
  if (
    event.t === "MESSAGE_REACTION_ADD" ||
    event.t == "MESSAGE_REACTION_REMOVE"
  ) {
    let channel = client.channels.get(event.d.channel_id);
    let message = channel.fetchMessage(event.d.message_id).then((msg) => {
      let user = msg.guild.members.get(event.d.user_id);

      if (msg.author.id == client.user.id && msg.content != initialMessage) {
        var re = `\\*\\*"(.+)?(?="\\*\\*)`;
        var role = msg.content.match(re)[1];

        if (user.id != client.user.id) {
          var roleObj = msg.guild.roles.find("name", role);
          var memberObj = msg.guild.members.get(user.id);

          if (event.t === "MESSAGE_REACTION_ADD") {
            memberObj.addRole(roleObj);
          } else {
            memberObj.removeRole(roleObj);
          }
        }
      }
    });
  }
});
