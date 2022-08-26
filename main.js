const Eris = require("eris");
const config = require("./config.js");

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
const roles = new RolesConstructor();

//Ignore Error 1006 1001 and -3008
bot.on("error", function (err, shard){
    if(err.code == 1006) return;
    if(err.code == 1001) return;
    if(err.code == -3008) return;

    return console.log(err.code + "\n" + err);
});

bot.connect();

//Some Magic
creator.withServer(new GatewayServer((handler) => bot.on('rawWS', (event) => {if (event.t === 'INTERACTION_CREATE') handler(event.d);})));

//When bot is ready log
bot.on("ready", async function(){
    console.log("Bot started");
});

//If someone send a message
bot.on("messageCreate", async function (message){

    //run all the code when someone send 7sfinit
    if(message.content == "7selfroleinit" && message.member.roles.indexOf(config.initRole) != -1){

        //first create a small info message
        let content = {
            embed:{
                title: "Some Info",
                fields: [
                    {
                        name: "Selfroles",
                        value: "Selfroles are great to show people who you are.\nPress a button with a role you want and it will appear on your Profile. Want to get rid of one role? Simply press that role button again."
                    },

                    {
                        name: "About the Bot",
                        value: "This Bot is created by <@292221048987058176>, feel free to send some feedback for better functionality or if you found a bug in <#824833759365955594>." +
                            "\nThis bot is available as a GitLab Repository, if you are a curious Nerd you can check out the Code [here](https://gitlab.com/Qevra/felix-helper)."
                    }
                ],
                color: 0xbd93f9
            }
        }
        await bot.createMessage(message.channel.id, content).catch((e)=>{console.log(e)});

        //then go through the roles.js file and create messages
        for(k in roles){

            let content;

            //Create stuff for the content
            if(roles[k][0].ShowRoles == false)
            {
                console.log(roles[k][0].title, ": false\n");

                content = {
                    embed:{
                        title: roles[k][0].title,
                        description: roles[k][0].description,
                        color: roles[k][0].color
                    },
                    components: []
                }
            }

            //if ShowRoles is true, the message will contain a list of the Roles (with the @ Stuff, but without pinging it)
            else if(roles[k][0].ShowRoles == true){

                console.log(roles[k][0].title, ": true\n");

                content = {
                    embed:{
                        title: roles[k][0].title,
                        description: roles[k][0].description,
                        color: roles[k][0].color,
                        fields: [{
                            name: roles[k][0].FieldName,
                            value: ""
                        }]

                    },
                    components: []
                }


                //go through the roles in the category and list them with @
                for(i in roles[k]){

                    if(i > 0){
                        content.embed.fields[0].value += "<@&" +roles[k][i].RoleID+ ">\n";
                    }

                }

                console.log("test 2")


            }


            //Get Row length ... 5, because that is the max length of action rows
            rows = Math.ceil((roles[k].length -1) / 5);

            //Fancy stuff because it is prettier when two rows are about the same length
            //devide total length by rows, round up both of them

            rowlength = Math.ceil((roles[k].length -1) / rows)

            //Start with element 1, becasue 0 hold all the category information
            let x = 1;

            for(let i = 0; i < rows; i++){

                //push the basic stuff for the buttons
                content.components.push(
                    {
                        type: 1,
                        components: []
                    }
                )

                //go through all the rows and lines
                for(let j = 0; j < rowlength; j++){
                    if(x < roles[k].length){

                        //Check if the Button should contain a Emoji, if so check if it is a normal or a custom one, based on that push different stuff into the content
                        if(roles[k][0].ShowEmotes == true)
                        {
                            if(roles[k][x].CustomEmote == false){
                                content.components[i].components.push({
                                    type:2,
                                    style: 2,
                                    custom_id: "selfroles_" +k+ "_" + roles[k][x].name,
                                    label: roles[k][x].name,
                                    emoji: {
                                        name: roles[k][x].EmoteName
                                    }
                                })
                            }
                            else if(roles[k][x].CustomEmote == true){
                                content.components[i].components.push({
                                    type:2,
                                    style: 2,
                                    custom_id: "selfroles_" +k+ "_" + roles[k][x].name,
                                    label: roles[k][x].name,
                                    emoji: {
                                        name: roles[k][x].EmoteName,
                                        id: roles[k][x].EmoteID
                                    }
                                })
                            }
                        }

                        //if no emoji is in the button use this
                        else{
                            content.components[i].components.push({
                                type:2,
                                style: 2,
                                custom_id: "selfroles_" +k+ "_" + roles[k][x].name,
                                label: roles[k][x].name
                            })
                        }
                    }
                    x++;
                }
            }

            //Post the message with the Buttons
            await bot.createMessage(message.channel.id, content).catch((e)=>{console.log(e)});
        }
    }
});

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
