const Discord = require("discord.js");

const PREFIX = "Monika,";

var fortunes = [
    "Yes",
    "No",
    "Don't know",
    "Errrm, i don't know how to answar that...",
    "What?",
    "Wokay"
]

var bot = new Discord.Client();

bot.on("ready", function() {
    console.log("Ready");
});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (message.content == "who is waifu in ddlc?")
    message.channel.sendMessage("Just Monika. :>");

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "test":
            message.channel.sendMessage("Working!");
            break;
        case "info":
            message.channel.sendMessage("I'm Monika, President of the Doki Doki Literature Club and a bot for the ⛧Game Lounge! ^^");
            break;
        case "qna":
            if (args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
            else message.channel.sendMessage("Can't read that");
            break;
        default:
            message.channel.sendMessage("Invalid command");
    } 
});

bot.login(process.env.BOT_TOKEN);
