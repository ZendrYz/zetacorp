const Discord = require('discord.js')
const db = require('megadb')
const warns = new db.crearDB('warns')

module.exports = {
    name: 'unwarn',
    description: 'Quitale los warns a alguien',
    
    async execute(zetacorp, message, args) {
        const persona = message.mentions.members.first()
        if (!persona) return message.channel.send('<a:warning:862700922436845599>  | \`Necesitas mencionar a alguien!\`')

      if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('<a:no:859383457125236736> |\`Necesitas el permiso\` `MANAGE_GUILD` \`para usar este comando!\`')

      if (!warns.tiene(`${message.guild.id}.${persona.id}`)) {
        return message.channel.send('<a:tick:859383424867237898> | \`Esa persona no tiene ningún warn\`')
      }

      const adverembed = new Discord.MessageEmbed()
        .setDescription(`Deseas quitarle todas las advertencias a <@${persona.id}> ?`)

      const siembed = new Discord.MessageEmbed()
        .setDescription(`<a:tick:859383424867237898> | \`De acuerdo, he eliminado todos los warns de\` <@${persona.id}>`)

      const noembed = new Discord.MessageEmbed()
        .setDescription('<a:no:859383457125236736> | `Comando cancelado`')

      message.channel.send(adverembed).then(msg => {
        msg.react('✔️')
        msg.react('❌')

        msg.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == `❌` || reaction.emoji.name == `✔️`), { max: 1, time: 10000000 })
          .then(async collected => {
            if (collected.first().emoji.name == `❌`) msg.edit(noembed) && msg.reactions.removeAll();
            if (collected.first().emoji.name == `✔️`) {
              warns.eliminar(`${message.guild.id}.${persona.id}`)
              msg.edit(siembed)
              msg.reactions.removeAll();
            }
            console.log(`Alguien usó este comando!`)
          })
      })
    }
}