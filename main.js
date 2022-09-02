const Eris = require("eris");
const config = require("./config.js");
const selfroleinit = require("./selfroleinit");
const rolesaddrem = require("./roleaddrem");

const bot = new Eris(config.Token, {intents: [
        "all",
        "allNonPrivileged",
        "allPrivileged",
        "directMessages",
        "directMessageReactions",
        "directMessageTyping",
        "guilds",
        "guildMembers",
        "guildPresences",
        "guildBans",
        "guildEmojisAndStickers",
        "guildIntegrations",
        "guildInvites",
        "guildVoiceStates",
        "guildPresences",
        "guildMessages",
        "guildMessageReactions",
        "guildMessageTyping",
        "guildWebhooks"
    ]});






//load roles from roles.js
const RolesConstructor = require("./roles.js");
const {Interaction} = require("eris");
const roles = new RolesConstructor();

//Ignore Error 1006 1001 and -3008
bot.on("error", function (err, shard){
    if(err.code == 1006) return;
    if(err.code == 1001) return;
    if(err.code == -3008) return;

    return console.log(err.code + "\n" + err);
});

bot.connect();

//Slash command

bot.on("ready", async()=>{
    //register Command
    await bot.createGuildCommand(config.guildID, {
        name: "Selfroleinit",
        type: Eris.Constants.ApplicationCommandTypes.CHAT_INPUT,
        description: "Post the messages from the Selfrole Bot"
    }).catch((e)=>{return console.log(e)});

    console.log("Bot started");
})

bot.on("interactionCreate", async (interaction)=>{
    //Check if a User interacts with a command
    if (interaction instanceof Eris.CommandInteraction){

        //check command name
        if(interaction.data.name == "selfroleinit"){

            //selfroleinit(interaction.channel.id, bot, roles);

           await interaction.createMessage("Generating Messages....").catch((e)=>{return console.log(e)});

           console.log(interaction)

           selfroleinit(interaction.channel.id, bot, roles)

        }
    }

    if (interaction.data.custom_id){
        rolesaddrem(bot, interaction, roles, config)

    }

})

