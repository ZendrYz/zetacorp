const Discord = require('discord.js')
const zetacorp = new Discord.Client({ fetchAllMembers: true, partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'], intents: 32767 })
require(`moment-duration-format`);
const fs = require('fs')
let { readdirSync } = require('fs')

process.on('unhandledRejection', (reason, p) => {
    console.log(" [anticrash] :: Unhandled Rejection / Catch")
    console.log(reason, p)
})


//------------------------------------//
//----- Command + Event handler ------//
//------------------------------------//


zetacorp.commands = new Discord.Collection();

const handler = fs.readdirSync('./commands').filter(f => f.endsWith('.js'));

for (const file of handler) {
    const command = require(`./commands/${file}`);
    zetacorp.commands.set(command.name, command)
}

const moderacionhandler = fs.readdirSync('./commands/moderation').filter(file => file.endsWith('.js'));

for (const file of moderacionhandler) {
    const command = require(`./commands/moderation/${file}`);
    zetacorp.commands.set(command.name, command);
    console.log(command.name + '✅')
}
const perfilhandler = fs.readdirSync('./commands/perfil').filter(f => f.endsWith('.js'));
for (const file of perfilhandler) {
    const command = require(`./commands/perfil/${file}`)
    zetacorp.commands.set(command.name, command)
}
const utilshandler = fs.readdirSync('./commands/utils').filter(file => file.endsWith('.js'));

for (const file of utilshandler) {
    const command = require(`./commands/utils/${file}`);
    zetacorp.commands.set(command.name, command);
    console.log(command.name + '✅')
}

const premiumhandler = fs.readdirSync('./commands/premium').filter(f => f.endsWith('.js'));

for (const file of premiumhandler) {
    const command = require(`./commands/premium/${file}`)
    zetacorp.commands.set(command.name, command);
    console.log(command.name + '✅')
}

const confighandler = fs.readdirSync('./commands/config').filter(file => file.endsWith('.js'));

for (const file of confighandler) {
    const command = require(`./commands/config/${file}`);
    zetacorp.commands.set(command.name, command)
    console.log(command.name + '✅')
}

const developerhandler = fs.readdirSync('./commands/developer').filter(file => file.endsWith('.js'));

for (const file of developerhandler) {
    const command = require(`./commands/developer/${file}`);
    zetacorp.commands.set(command.name, command);
    console.log(command.name + '✅')
}

for (const file of readdirSync('./eventos')) {
    if (file.endsWith('js')) {
        let fileName = file.substring(0, file.length - 3)
        let fileContents = require(`./eventos/${file}`)

        zetacorp.on(fileName, fileContents.bind(null, zetacorp))
    }
}
try {
    zetacorp.login(process.env.TOKEN)
} catch {
    console.log('Hubo un error iniciando sesión')
}
