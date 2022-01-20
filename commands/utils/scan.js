const Discord = require('discord.js')
const db = require('manage-maliciousdb')

module.exports = {
    name: 'scan',
    aliases: ['detectar', 'scanear'],
    description: 'Scanea el servidor para ver si hay usuarios maliciosos',
    
    async execute (zetacorp, message, args) {
        const users = await db.getMaliciousArray()
        const maliciosos = message.guild.members.cache.filter(x => users.includes(users.id))
        if (maliciosos.length) {
            const embed = new Discord.MessageEmbed()
            .setDescription(`${maliciosos.map(x => x.toString())}.`)
            .setFooter('Para banearlos puedes usar el comando `forceban`')
            message.channel.send(embed);
        } else {
            message.channel.send('<a:tick:859383424867237898> | `No se han encontrado maliciosos en tu server`')
        }
    }
}