const Discord = require("discord.js");

const PREFIX = "Mnk ";

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

    if (message.content == "welcome")
    message.channel.sendMessage("Irasshai!");

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "test":
            message.channel.sendMessage("Working!");
            break;
        case "info":
            message.channel.sendMessage("I'm Monika! President of Doki Doki Literature Club and the bot of ⛧Game Lounge.");
            break;
        case "qna":
            if (args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
            else message.channel.sendMessage("Can't read that");
            break;
        case "details":
            var details = new Discord.RichEmbed()
                .addField("BOT INSTRUCTIONS", " ===============")
                .addField("Tatsumaki", "all-purpose bot, but mainly leveling functionally. Type t!help then t!help < command names > if you want to know more. (Only in #*tatsumakis-desk*")
                .addField("FredBoat♪♪", "Type ;;play < music name > and ;;< number > to play it. Prefix for this bot is ' ;; '. (Only in #*music-hub*)")
                .addField("Vexera", "Type !play < music name > for quick play, or type !search < music name > for selections. Prefix for this bot is ' ! '. (Only in #*music-bar*")
                .addField("Minoka.chr, Created by Piixel", "Please type Mnk qna < questions > and she'll reply with a Yes, No and more. Furthermore, typing Mnk notice.me or Mnk give.hugs will program her to send you something special...well kinda. (Only in #*chat-lounge*)")
                .addField("🎻Rin 🎶, Saved Piixel from depression in 2016", "Private(?) music bot. If interested, http://docs.shelter.host/Rin will be the command lists.")
                .setColor(0xff86d8)
                .setFooter("- Message from Piixel, Head of Lounge.")
            message.channel.sendEmbed(details);
            break;
        case "notice.me":
            message.channel.sendMessage(message.author.toString() + "https://pa1.narvii.com/6632/989aef578051d568b8b39d1a6640a968db6f7c76_hq.gif");
            break;
        case "give.hugs":
            message.channel.sendMessage(message.author.toString() + "https://i.imgur.com/NdkhTra.gif");
            break;
        default:
            message.channel.sendMessage("Invalid command");
    } 
});

bot.login(process.env.BOT_TOKEN);
