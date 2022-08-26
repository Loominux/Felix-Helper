const Eris = require("eris");
const config = require("./config.js");
const selfroleinit = require("./selfroleinit");

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

const { SlashCreator, GatewayServer, SlashCommand, CommandOptionType } = require('slash-create');

const creator = new SlashCreator({
    applicationID: config.ApplicationID,
    publicKey: config.PublicKey,
    token: config.Token
});

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

//Buttons

try{
    creator.withServer(new GatewayServer((handler) => bot.on('rawWS', (event) => {if (event.t === 'INTERACTION_CREATE') handler(event.d);})));
}catch(e){}

//When bot is ready log


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

            await interaction.createMessage("Test").catch((e)=>{return console.log(e)});
        }
    }
})


creator.on("componentInteraction", async (button) => {

    let userroles = button.member.roles;

    //go through all elements
    for(i in roles){
        for(j in roles[i]){
            //if the button is found we have to position in the array object roles.js thingy, skip 0, because that is the information element
            if(j != 0 && button.customID == "selfroles_" + i + "_" + roles[i][j].name) {

                //If the Group allows multiple Roles
                if(roles[i][0].AllowMultiple == true){
                }

                //If the Group allows only one role
                else if(roles[i][0].AllowMultiple == false){

                    //Remove all other Roles from that category
                    for(k in roles[i]) {
                        if (userroles.indexOf(roles[i][k].RoleID) != -1) {
                            await bot.removeGuildMemberRole(button.guildID, button.member.id, roles[i][k].RoleID).catch(function (e) {
                                return console.log(e);
                            }); //Remove Role from user
                        }
                    }
                }

                //if the user already has the role remove it
                if (userroles.indexOf(roles[i][j].RoleID) != -1){
                    await bot.removeGuildMemberRole(button.guildID, button.member.id, roles[i][j].RoleID).catch(function (e) {
                        return console.log(e);
                    }); //Remove Role from user


                    //After removing check if any roles are left, if none are left remove the group role, start at 1, because 0 is just information
                    let x = 0;
                    for(let k = 1; k < roles[i].length; k++){
                        if(userroles.indexOf(roles[i][k].RoleID) != -1){
                            x++;
                        }

                    }
                    if(x == 1){
                        await bot.removeGuildMemberRole(button.guildID, button.member.id, roles[i][0].RoleID).catch(function (e) {
                            return console.log(e);
                        }); //Remove role from user
                    }
                }
                //If the user does not have the role add it
                else if(userroles.indexOf(roles[i][j].RoleID) == -1){
                    await bot.addGuildMemberRole(button.guildID, button.member.id, roles[i][j].RoleID).catch(function (e) {
                        return console.log(e);
                    }); // add role to user

                    //If the group has a Group role add it, skip all groups that don't have a role group
                    if(typeof(roles[i][0].RoleID) != "undefined"){
                        await bot.addGuildMemberRole(button.guildID, button.member.id, roles[i][0].RoleID).catch(function (e) {
                            return console.log(e);
                        }); // add role to user
                    }
                }
                return;
            }
        }
    }
});
