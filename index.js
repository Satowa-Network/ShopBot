//          Discord Imports
const {Client, GatewayIntentBits, Collection} = require("discord.js");
const {REST} = require("@discordjs/rest");
const { Routes } = require('discord-api-types/v9')
const {readdirSync} = require("fs");
const fs = require("fs");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildWebhooks
    ]
});

//          Discord CommandHandler
const slashCommandsFiles = fs.readdirSync("./commands/slashCommands").filter(file => file.endsWith('.js'));
const commands = [];
client.commands = new Collection();
try {
    for (const file of slashCommandsFiles) {
        const command = require(`./commands/slashCommands/${file}`);
        commands.push(command.data.toJSON());
        client.commands.set(command.data.name, command);
        console.log("SlashCommands pushed")
    }
} catch (e) {
    console.log("There was an error while set the SlashCommand Files\n"+e)
    console.log(slashCommandsFiles)
    console.log("---------------")
}
//          dotenv import
require("dotenv").config();
const config = require("./config.json");




//          onReady Statement
client.on("ready", async () => {
    console.log("Logged in as "+client.user.username);

    //      SlashCommands registering
    const rest = new REST({version: '10' }).setToken(process.env.TOKEN);
    await(async () => {
        try {
            await rest.put(
                Routes.applicationCommands(process.env.CLIENT_ID), {
                    body: commands
                }
            );
            console.log("SlashCommands registered\n")
            console.log(commands);
        } catch (e) {
            console.error("There was an error registering SlashCommands!")
        }
    })();
})


//          Client InteractionCreate Statement

client.on("interactionCreate", async interaction => {
    try {
        if(!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if(!command) return;
        await command.run(interaction, client, config);
    } catch (e) {
        console.error("There was an error executing the SlashCommand!\n"+e)
    }
})

//          Client Login
client.login(process.env.TOKEN);