const Discord = require('discord.js');
const db = require('megadb');
const premium = new db.crearDB('premium')
const antiroles = new db.crearDB('antiroles', 'data_guilds')

module.exports = {
    name: 'antiroles',
    aliases: ['antirole', 'antirol'],
    description: 'Evita que se creen roles en el servidor',

    async execute(zetacorp, message, args) {
        if (premium.tiene(message.author.id)) {
            if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('<a:No:810974861521584188> | `Necesitas el permiso` `MANAGE_ROLES`')
            if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send('<a:No:810974861521584188> | `Necesito el permiso` `MANAGE_ROLES`')
            if (antiroles.tiene(message.guild.id)) {
                antiroles.eliminar(message.guild.id)

                message.channel.send('<a:tick:859383424867237898> | `Se ha deshabilitado el antiroles correctamente`')
            } else {
                antiroles.establecer(message.guild.id, 0)
                message.channel.send('<a:tick:859383424867237898> | `Se ha habilitado el antiroles correctamente`')
            }
        } else {
            return message.channel.send('<a:no:859383457125236736> | `Tienes que ser usuario premium`')
        }
    }
}