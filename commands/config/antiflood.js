const db = require('megadb'), antiflood = new db.crearDB('antiflood', 'data_guilds')

module.exports = {
    name: 'antiflood',
    aliases: ['antispam'],
    
    async execute(zetacorp, message, args) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('<a:no:859383457125236736> | `Necesitas permiso de ` `ADMINISTRADOR`')
        
        if (!antiflood.tiene(message.guild.id)) {
            antiflood.establecer(message.guild.id, 'Antiflood')
            message.channel.send('<a:tick:859383424867237898> | `Se ha activado el antiflood correctamente`')
        } else {
            antiflood.eliminar(message.guild.id)
            message.channel.send('<a:tick:859383424867237898> | `Se ha desactivado el antiflood correctamente`')
        }
    }
}