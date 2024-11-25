const { token } = require('./configs/sensitive.json');
const { 
        Client, Events, GatewayIntentBits,
        ActivityType, InteractionCollector,
        Modal, MessageActionRow, TextInputComponent,
        MessageButton, MessageSelectMenu, Guild,
        Collection,
      } = require('discord.js');

const discord = require("discord.js")
const discordModals = require("discord-modals")
const fs = require("fs")

/*------------------------------------------
        Create new client instance
------------------------------------------*/

const client = new Client({ intents: [ 'DIRECT_MESSAGES', 'GUILD_MESSAGES', 'GUILDS' ] });

/*------------------------------------------
        Client Ready Console Log
------------------------------------------*/

client.on("ready", async () => {
    console.log("Bot hat gestartet");

/*------------------------------------------
            Discord Bot Status  
------------------------------------------*/

    client.user.setPresence({ activities: [{ name: `@ for help`, type: `STREAMING` }], status: 'online'})

    })

/*------------------------------------------
                Slashcommands  
------------------------------------------*/

client.on("interactionCreate", async (interaction) => {
    if(!interaction.isCommand()) return;

    if(interaction.commandName === "help"){

        let embed = new discord.MessageEmbed()
        .setColor("ORANGE")
        .setDescription("# ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ " +
                        "ST4R-Fl0W3R's Help Menu\n" +

                        "## Commands\n" +
                        "> You can find a documentation of all commands on [our website](https://docs.fl0wer.xyz/)!\n" + 
                        "> Or use the selection-menu below!\n‎ \n" + 

                        "### ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ " +
                        "Useful links\n" + 
                        "‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ " +
                        "[Dashboard](https://fl0wer.xyz/dashboard/) | [Support-Server](https://fl0wer.xyz/discord/) | [Website](https://fl0wer.xyz/)"
        )
        .setImage("https://cdn.discordapp.com/attachments/1009485740230586447/1308848494701973685/Fl0W3Rliner.png?ex=673f6fa6&is=673e1e26&hm=58b36a1baa2e2a0cbf22ed46765d297c924aeda0c7bd837462b96b1b602949c4&")

        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId("helpbar")
                .setPlaceholder("⚙  Click to select a option")
                .addOptions([
                    {
                        emoji: "🏡",
                        label: "Main Menu",
                        description: "You are currently on this menu",
                        value: "help",
                    },{
                        emoji: "🔨",
                        label: "Moderation Category",
                        description: "Server Moderation only",
                        value: "moderation",
                    },{
                        emoji: "⚙",
                        label: "Settings Category",
                        description: "Manage ST4R-FL0W3R's settings",
                        value: "settings",
                    }
                ])
        )

        await interaction.reply({ embeds: [embed], components: [row], ephemeral:true })
    }
})

/*------------------------------------------
                /Admin  
------------------------------------------*/

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === "admin") {

        let owner = await interaction.guild.fetchOwner()

        let embed = new discord.MessageEmbed()
        .setDescription('# Fl0W3R Admin Panel\nTo manage <@1010152440601006230> on `' + interaction.guild.name + '` use the selection menu!\n\n' + `## ${interaction.guild.name}'s Server Information`)
        .setFields(
            { name: 'Owner', value: `${owner}`, inline: true},
            { name: 'Created', value: `${interaction.guild.createdAt}`, inline: true},
            { name: 'Members', value: `${interaction.guild.memberCount}`, inline: true},
        )

        await interaction.reply({ embeds: [embed], ephemeral:true })
    }
})

/*------------------------------------------
                    /Add  
------------------------------------------*/

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === "add") {
        let member = interaction.user.id;
        let embed = new discord.MessageEmbed()
            .setColor("#2b2d31")
            .setDescription(
            /* Embed Title */    "# 🔗 Adding Fl0W3R\n" +
            /* Description */    `> Thank you for your interest <@${member}> ❤\n` + 
            /* Description */    "> Press the button to add <@1010152440601006230> to your server!"
            )
        const row = new discord.MessageActionRow()
        .addComponents(
            new MessageButton()
            .setEmoji("➕")
            .setLabel("Click to add Fl0W3R into your server!")
            .setStyle("LINK")
            .setURL("https://fl0wer.xyz/add")
        );

        
        await interaction.reply({ embeds: [embed], components: [row], ephemeral:true})
    }
})

/*------------------------------------------
                /Ping  
------------------------------------------*/

/*------------------------------------------
                /Roll  
------------------------------------------*/



/*------------------------------------------
                /Avatar  
------------------------------------------*/

/*------------------------------------------
                /embedmaker  
------------------------------------------*/

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === "embed") {
            const modal = new Modal()
                .setCustomId('embedMakerModal')
                .setTitle('🎨 Embed-Maker')
            
            const embedColorInput = new TextInputComponent()
                .setCustomId('embedColorInput')
                .setLabel('🌈 Embed Color')
                .setStyle('SHORT')
                .setPlaceholder('Please use HEX-Colors')
                .setRequired(false)

            const embedTitleInput = new TextInputComponent()
                .setCustomId('embedTitleInput')
                .setLabel("🚧 Embed Title")
                .setStyle("SHORT")
                .setPlaceholder("Write in your embed title")
                .setRequired(false)

            const embedDescInput = new TextInputComponent()
                .setCustomId("embedDescInput")
                .setLabel("🧾 Embed Description")
                .setStyle("PARAGRAPH")
                .setPlaceholder("Write in your embed description")
                .setRequired(true)

            const firstActionRow = new MessageActionRow().addComponents(embedColorInput)
            const secondActionRow = new MessageActionRow().addComponents(embedTitleInput)
            const thirdActionRow = new MessageActionRow().addComponents(embedDescInput)

        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow)
        await interaction.showModal(modal);
    }
})

client.on('modalSubmit', async (modal) => {
    let firstResponse = modal.getTextInputValue(embedColorInput)

    modal.deferReply({ephemeral:true}).then(()=>{
        modal.followUp({content: "Deine bewerbung wurde angenommen"})
    })
})

/*------------------------------------------
              /set functions  
------------------------------------------*/




client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'set') {

        // /set tempvoice

        const setFunctions = interaction.options.getString('function');

        if (interaction.options.getSubcommand() === 'Tempvoice') {

            let embed = new discord.MessageEmbed()
            .setDescription("Hello World!")
            interaction.reply({embeds: [embed], ephemeral:true })

        }


    }
})

/*------------------------------------------
              Log into Discord  
------------------------------------------*/

client.login(token);