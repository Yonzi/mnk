const Discord = require("discord.js");
const YTDL = require("ytdl-core");

const TOKEN = "NDAxMDYxODAzNzU0Mzg5NTA0.DTkuKw.4zD63R8o7Z-MxPBihIpzrEK4Bbo"
const PREFIX = "Mnk ";

var fortunes = [
    "Yes",
    "No",
    "Don't know",
    "Errrm, i don't know how to answar that...",
    "What?",
    "Wokay"
];

function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}

var bot = new Discord.Client();

var servers = {};

bot.on("ready", function() {
    console.log("Ready");
});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (message.content == "i go sleep liao")
    message.channel.sendMessage("Bye~");

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
                .addField("BOT INSTRUCTIONS", " ================")
                .addField("dabBot", "Type !!!play < music name > and !!!choose < number > to play it. Prefix for this bot is ' !!! '.")
                .addField("Minoka.chr, Created by Piixel", "Please type Mnk qna < questions > and she'll reply with a Yes, No and more. Furthermore, typing Mnk notice.me or Mnk give.hugs will program her to send you something special...well kinda")
                .addField("Yuri.chr, Created by Piixel", "Use this bot only in 'The Bar', type Yuri,play < music name > for quick play, or type Yuri,search < music name > for more selections. Type Yuri,help if more info is needed.")
                .setColor(0xff86d8)
                .setFooter("- Message from Piixel, Head of Room.")
            message.channel.sendEmbed(details);
            break;
        case "notice.me":
            message.channel.sendMessage(message.author.toString() + "https://pa1.narvii.com/6632/989aef578051d568b8b39d1a6640a968db6f7c76_hq.gif");
            break;
        case "give.hugs":
            message.channel.sendMessage(message.author.toString() + "https://i.imgur.com/NdkhTra.gif");
            break;
        case "play":
            if (!args[1]) {
                message.channel.sendMessage("Please provide link");
                return;
            }

            if (!message.member.voiceChannel) {
                message.channel.sendMessage("You must be in a voice channel!");
                return;
            }

            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message);
            });
            break;
        case "skip":
            var server = servers[message.guild.id];

            if (server.dispatcher) server.dispatcher.end();
            break;
        case "stop":
            var server = servers[message.guild.id];

            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            break;
        default:
            message.channel.sendMessage("Invalid command");
    } 
});

bot.login(TOKEN);