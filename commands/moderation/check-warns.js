const Discord = require('discord.js')
const db = require('megadb')
const warns = new db.crearDB('warns')

module.exports = {
    name: 'check-warns',
    aliases: ['c-w'],
    description: 'Mira tus warns o los de alguna persona',
    
    async execute(zetacorp, message, args) {
        const persona = message.mentions.members.first() || zetacorp.users.cache.get(args[0]) || message.author
        //if (!message.mentions.members.first()) return message.channel.send('<a:warning:862700922436845599>  | \`Necesitas mencionar a alguien!\`')

      let cantidad = await warns.obtener(`${message.guild.id}.${persona.id}`)

      if (!warns.tiene(`${message.guild.id}.${persona.id}`)) {
        return message.channel.send('<a:tick:859383424867237898> | \`Esa persona no tiene ningún warn\`')
      }

      const warnsembed = new Discord.MessageEmbed()
        .setDescription(`<a:warning:862700922436845599> | Warnings de <@${persona.id}> : ${cantidad}`)


      message.channel.send(warnsembed)
    }
}