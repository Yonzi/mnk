const Discord = require("discord.js");

const PREFIX = "est ";

var fortunes = [
    "Yes",
    "No",
    "Don't know",
    "I don't know how to answer that.",
    "What",
    "Wokay"
]

var bot = new Discord.Client();

bot.on("ready", function() {
    console.log("Ready");
});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (message.content == "welcome")
    message.channel.sendMessage("enjoy your stay");

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "test":
            message.channel.sendMessage("Working");
            break;
        case "info":
            message.channel.sendMessage("est, bot of ⛧Game Lounge.");
            break;
        case "qna":
            if (args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
            else message.channel.sendMessage("Can't read that");
            break;
        case "details":
            var details = new Discord.RichEmbed()
                .addField("BOT INSTRUCTIONS", " ===============")
                .addField("Tatsumaki", "all-purpose bot, but mainly leveling functionally. Type t!help then t!help < command names > if you want to know more. (Only in # *tatsumakis-desk*)")
                .addField("FredBoat♪♪", "Type ;;play < music name > and ;;< number > to play it. Prefix for this bot is ' ;; '. (Only in # *music-hub*)")
                .addField("Vexera", "Type !play < music name > for quick play, or type !search < music name > for selections. Prefix for this bot is ' ! '. (Only in # *music-bar*)")
                .addField("est", "a replacement...yeah")
                .addField("Monika", "RIP 1 year of service")
                .setColor(0x3F9EDE)
                .setFooter("- Message from Piiixel, Head of Lounge.")
            message.channel.sendEmbed(details);
            break;
        case "noticeme":
            message.channel.sendMessage(message.author.toString() + "https://pa1.narvii.com/6632/989aef578051d568b8b39d1a6640a968db6f7c76_hq.gif");
            break;
        case "giveshug":
            message.channel.sendMessage(message.author.toString() + "https://i.imgur.com/NdkhTra.gif");
            break;
        default:
            message.channel.sendMessage("Invalid command");
    } 
});

bot.login(process.env.BOT_TOKEN);
