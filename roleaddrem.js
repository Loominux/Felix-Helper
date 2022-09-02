const config = require("./config");
module.exports = async function rolesaddrem(bot, interaction, roles, config){

    //if s is 1, role can be added
    let add = 1;

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

                    add = 0;

                    interaction.defer(64).then(()=>{
                            interaction.createMessage("Role: " + "<@&" + roles[i][j].RoleID + ">"+ " removed")
                        }
                    )

                    await bot.removeGuildMemberRole(config.guildID, interaction.member.id, roles[i][j].RoleID).catch(function (e) {
                        return console.log(e);
                    }); //Remove Role from user

                }




                //If the user does not have the role add it
                else if(interaction.member.roles.indexOf(roles[i][j].RoleID) == -1 && add==1){

                    interaction.defer(64).then(()=>{
                        interaction.createMessage("Role: " + "<@&" + roles[i][j].RoleID + ">"+ " added")
                        }
                    )

                    await bot.addGuildMemberRole(config.guildID, interaction.member.id, roles[i][j].RoleID).catch(function (e) {
                        return console.log(e);
                    }); // add role to user

                    }



                //Check Roles from that category

                let x = 0;

                for(let k = 1; k < roles[i].length; k++){
                    if(interaction.member.roles.indexOf(roles[i][k].RoleID) != -1){
                        x++;
                    }
                }



                if(x == 0){
                    await bot.removeGuildMemberRole(config.guildID, interaction.member.id, roles[i][0].RoleID).catch(function (e) {
                        return console.log(e);
                    }); //Remove role from user
                }
                else if(x > 0){
                    await bot.addGuildMemberRole(config.guildID, interaction.member.id, roles[i][0].RoleID).catch(function (e) {
                        return console.log(e);
                    }); //add role to user
                }

                }
            }
        }
}