const db = require('megadb'), ids = new db.crearDB('ids')

module.exports = {
    name: 'add-staff',
    aliases: ['addstaff', 'añadir-staff'],

    async execute(zetacorp, message, args) {
        const soloa = ['477851232879378441', '477137760616972339']
        if (!soloa.includes(message.author.id)) return message.channel.send('<a:no:859383457125236736> | `Necesitas ser desarrollador del bot`')
        const id = args[0]
        if (!id) return message.channel.send('<a:no:859383457125236736> | `Necesitas colocar una ID`')
        if (isNaN(id)) return message.channel.send('<a:no:859383457125236736> | `Introduzca una ID valida`')
        if (ids.tiene(id)) return message.channel.send('<a:no:859383457125236736> | `Ese usuario ya es staff de ZetaCorp`')

        ids.establecer(id, id).catch(e => message.reply(e))
        message.channel.send('<a:tick:859383424867237898> | `Se ha añadido un nuevo miembro del staff`')
    }
}