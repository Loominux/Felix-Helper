const config = require("./config");
module.exports = async function rolesaddrem(bot, interaction, roles, config){

    //go through all elements
    for(i in roles){
        for(j in roles[i]){
            //if the button is found we have to position in the array object roles.js thingy, skip 0, because that is the information element
            if(j != 0 && interaction.data.custom_id == "selfroles_" + i + "_" + roles[i][j].name) {

                //If the Group allows multiple Roles
                if(roles[i][0].AllowMultiple == true){
                }

                //If the Group allows only one role
                else if(roles[i][0].AllowMultiple == false){

                    //Remove all other Roles from that category
                    for(k in roles[i]) {
                        if (interaction.member.roles.indexOf(roles[i][k].RoleID) != -1) {
                            await bot.removeGuildMemberRole(config.guildID, interaction.member.id, roles[i][k].RoleID).catch(function (e) {
                                return console.log(e);
                            }); //Remove Role from user
                        }
                    }
                }

                //if the user already has the role remove it
                if (interaction.member.roles.indexOf(roles[i][j].RoleID) != -1){
                    await bot.removeGuildMemberRole(config.guildID, interaction.member.id, roles[i][j].RoleID).catch(function (e) {
                        return console.log(e);
                    }); //Remove Role from user


                    //After removing check if any roles are left, if none are left remove the group role, start at 1, because 0 is just information
                    let x = 0;
                    for(let k = 1; k < roles[i].length; k++){
                        if(interaction.member.roles.indexOf(roles[i][k].RoleID) != -1){
                            x++;
                        }

                    }
                    if(x == 1){
                        await bot.removeGuildMemberRole(config.guildID, interaction.member.id, roles[i][0].RoleID).catch(function (e) {
                            return console.log(e);
                        }); //Remove role from user
                    }
                }
                //If the user does not have the role add it
                else if(interaction.member.roles.indexOf(roles[i][j].RoleID) == -1){

                    interaction.createMessage("Rolle hinzugefügt")

                    await bot.addGuildMemberRole(config.guildID, interaction.member.id, roles[i][j].RoleID).catch(function (e) {
                        return console.log(e);
                    }); // add role to user

                    //If the group has a Group role add it, skip all groups that don't have a role group
                    if(typeof(roles[i][0].RoleID) != "undefined"){
                        await bot.addGuildMemberRole(config.guildID, interaction.member.id, roles[i][0].RoleID).catch(function (e) {
                            return console.log(e);
                        }); // add role to user
                    }
                }
                return;
            }
        }
    }
}