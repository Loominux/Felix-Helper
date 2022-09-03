const config = require("./config");
module.exports = async function rolesaddrem(bot, interaction, roles, config){

    let add = 1; //add is a check later, if it is 1, role can be added

    //go through all elements
    for(i in roles){
        for(j in roles[i]){

            //i used this for the messages to the user, otherwise it doesn't work, don't ask why
            let Role = roles[i][j]

            //if the Button is found we have to position in roles.js roles[i][j], skip 0 because that is the information element
            if(j != 0 && interaction.data.custom_id == "selfroles_" + i + "_" + roles[i][j].name) {

                //Check if the Category allows multiple Roles from that Category
                if(roles[i][0].AllowMultiple == true){

                    //If the user already has the role they picked, it will be removed
                    if (interaction.member.roles.indexOf(roles[i][j].RoleID) != -1){

                        add = 0;

                        //Message to user
                        interaction.defer(64).then(()=>{
                                interaction.createMessage(`Role: <@&${Role.RoleID}> removed`)
                            }
                        )

                        //Remove Role from user
                        await bot.removeGuildMemberRole(config.guildID, interaction.member.id, roles[i][j].RoleID).catch(function (e) {
                            return console.log(e);
                        });
                    }
                }

                //If the Group allows only one role from that category, remove all Roles from that category
                else if(roles[i][0].AllowMultiple == false){

                    //Check if the user has the Role that they have picked, if yes just remove it and set add to 0
                    if(interaction.member.roles.indexOf(roles[i][j].RoleID) != -1){
                        add = 0;

                        //Message to user
                        interaction.defer(64).then(()=>{
                                interaction.createMessage(`Role: <@&${Role.RoleID}> removed`)
                            }
                        )
                    }

                    //remove all roles from this category
                    for(k in roles[i]) {
                        if (interaction.member.roles.indexOf(roles[i][k].RoleID) != -1) {

                            //Remove Role from user
                            await bot.removeGuildMemberRole(config.guildID, interaction.member.id, roles[i][k].RoleID).catch(function (e){
                                return console.log(e);
                            });
                        }
                    }
                }

                //Check if add is still 1 and if the user doesn't have the picked role, then it will be added
                if(add==1 && interaction.member.roles.indexOf(roles[i][j].RoleID) == -1){

                    //Message to user
                    interaction.defer(64).then(()=>{
                        interaction.createMessage(`Role: <@&${Role.RoleID}> added`)
                        }
                    )

                    //Add role to user
                    await bot.addGuildMemberRole(config.guildID, interaction.member.id, roles[i][j].RoleID).catch(function (e) {
                        return console.log(e);
                    });
                }

                //First check if the category has a Category role, if not, do nothing
                if(typeof(roles[i][0].RoleID) != "undefined"){

                    //Count the amount of roles from the category (from which a role was added/removed)
                    let x = 0;
                    for(let k = 1; k < roles[i].length; k++){
                        if(interaction.member.roles.indexOf(roles[i][k].RoleID) != -1){
                            x++;
                        }
                    }

                    //if the user has 0 Roles from this category, remove the category role
                    if(x == 0){
                        await bot.removeGuildMemberRole(config.guildID, interaction.member.id, roles[i][0].RoleID).catch(function (e) {
                            return console.log(e);
                        }); //Remove role from user
                    }
                    //if the user has more than 0 Roles from this category, add the category role
                    else if(x > 0){
                        await bot.addGuildMemberRole(config.guildID, interaction.member.id, roles[i][0].RoleID).catch(function (e) {
                            return console.log(e);
                        }); //add role to user
                    }
                }
            }
        }
    }
}