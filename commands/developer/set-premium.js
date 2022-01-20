const db = require('megadb'), premiums = new db.crearDB('premium')

module.exports = {
    name: 'set-premium',
    aliases: ['premium'],
    async execute(zetacorp, message, args) {
        if (message.author.id !== '477851232879378441') return message.channel.send('<a:no:859383457125236736> | `Solo mi desarrollador puede utilizar este comando`')
        const id = args[0]
        if (!id) return message.channel.send('<a:no:859383457125236736> | `Necesitas colocar una id`');
        if (isNaN(id)) return message.channel.send('<a:no:859383457125236736> | `Pon una ID válida`')
        premiums.establecer(id, "Usuario premium").catch(e => { message.channel.send('<a:error:894242891428429845> | `Ha ocurrido un error: `' + e) })
        message.channel.send('<a:tick:859383424867237898> | `Se ha establecido el premium correctamente`')
    }
}