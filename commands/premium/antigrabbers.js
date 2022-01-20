const db = require('megadb'), antigrabbers = new db.crearDB('antigrabbers', 'data_guilds'), premium = new db.crearDB('premium')

module.exports = {
    name: 'antigrabbers',
    aliases: ['anti-grabber', 'antigrabber', 'anti-grabbers'],
    description: 'Evita los token-grabbers e ip-loggers',

    async execute(zetacorp, message, args) {
        if (premium.tiene(message.author.id)) {
            if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('<a:no:859383457125236736> | `No tienes el permiso de` `ADMINISTRATOR`')
            if (antigrabbers.tiene(message.guild.id)) {
                antigrabbers.eliminar(message.guild.id)
                message.channel.send('<a:tick:859383424867237898> | `Se ha desactivado el sistema anti-grabbers correctamente`')
            } else {
                antigrabbers.establecer(message.guild.id, 'Anti-grabbers activado')
                message.channel.send('<a:tick:859383424867237898> | `Se ha activado el sistema anti-grabbers correctamente`')
            }
        } else {
            return message.channel.send('<a:no:859383457125236736> | `Tienes que ser usuario premium`')
        }
    }
}