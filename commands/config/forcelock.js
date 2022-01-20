const db = require('megadb')
const forcedb = new db.crearDB('forcelocks', 'data_guilds')

module.exports = {
    name: 'forcelock',
    aliases: ['fl'],

    async execute(zetacorp, message, args) {
        if (!message.member.hasPermission('ADMINISTRATOR')) { return message.channel.send("<a:warning:862700922436845599> | \`Necesitas el permiso de\` `ADMINISTRATOR`") }
        if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) { return message.channel.send('<a:no:859383457125236736> | \`Necesito poder\` `MANEJAR CANALES` \`para usar este comando!\`') }

        if (forcedb.tiene(message.guild.id)) return message.channel.send('<a:warning:862700922436845599> | `Este server ya está bloqueado`')

        message.guild.channels.cache.forEach((channel) => {
            channel.updateOverwrite(message.guild.roles.everyone, {
                'SEND_MESSAGES': false,
                'CONNECT': false
            })
        })
        forcedb.establecer(message.guild.id, 'Forcelock activado')
        message.channel.send('<a:tick:859383424867237898> | `Se han bloqueado todos los canales`')
    }
}