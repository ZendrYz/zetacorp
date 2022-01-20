const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'purge',
    aliases: ['clear', 'limpiar'],
    description: 'Elimina x mensajes de tu servidor',
    example: "c'purge 2",

    /**
     * 
     * @param {Discord} zetacorp 
     * @param {Message} message 
     * @param {String[]} args 
     */

    async execute(zetacorp, message, args) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            return message.channel.send('<a:no:859383457125236736> | Necesitas el permiso `MANAGE_MESSAGES`')
        }
        let number = args[0]

        const purgeembed = new MessageEmbed()
            .setDescription(`<a:tick:859383424867237898> | He borrado ${number} mensajes!`)

        if (!args[0]) return message.channel.send(`<a:no:859383457125236736> | \`Necesitas poner la cantidad de mensajes!\``)

        if (isNaN(number) || parseInt(number)) return message.channel.send(`<a:warning:862700922436845599> | \`Solo debes escribir números válidos\``)
        if (number <= 0) return message.channel.send(`<a:no:859383457125236736> | \`No puedes borrar menos que 0 mensajes\``)
        if (number >= 100) return message.channel.send('<a:no:859383457125236736> | `No puedes borrar más de 100 mensajes`')
        message.channel.bulkDelete(number + 1).then(() => {
            message.channel.send(purgeembed)
        }).catch(Error => {
            message.channel.send(`<a:error:859383436087263242> | \`Un error ha ocurrido: \` **${Error.message}**`)
        })
    }
}