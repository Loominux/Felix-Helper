module.exports = async function selfroleinit(ChannelID, bot, roles){

    //run all the code when someone sends 7selfroleinit
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
                        "\nThis bot is available as a GitLab Repository, if you are a curious Nerd you can check out the Code [here](https://gitlab.com/dev.paulweber/felix-helper)."
                }
            ],
            color: 0xbd93f9
        }
    }
    await bot.createMessage(ChannelID, content).catch((e)=>{console.log(e)});

    //then go through the roles.js file and create messages
    for(k in roles){

        let content;

        //Create a basic embed
        if(roles[k][0].ShowRoles == false)
        {

            content = {
                embed:{
                    title: roles[k][0].title,
                    description: roles[k][0].description,
                    color: roles[k][0].color
                },
                components: []
            }
        }

        //if ShowRoles is true, the embed will contain a list of the Roles (with mentions, but without pinging them)
        else if(roles[k][0].ShowRoles == true){

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


            //go through the roles in the category and add them with mention to embed.fields.value
            for(i in roles[k]){

                if(i > 0){
                    content.embed.fields[0].value += "<@&" +roles[k][i].RoleID+ ">\n";
                }

            }
        }


        //Get Row length ... 5, because that is the max length of action rows
        rows = Math.ceil((roles[k].length -1) / 5);

        //Fancy stuff because it is prettier when two rows are about the same length
        //divide total length by rows, round up both of them

        rowlength = Math.ceil((roles[k].length -1) / rows)

        //Start with element 1, because 0 holds all the category information
        let x = 1;

        for(let i = 0; i < rows; i++){

            //push the base contend for the buttons
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
        await bot.createMessage(ChannelID, content).catch((e)=>{console.log(e)});
    }
}