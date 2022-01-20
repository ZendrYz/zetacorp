const Discord = require('discord.js')

module.exports = {
    name: 'report',
    aliases: ['reportar'],
    description: 'Reporta un error del bot',
    
    async execute(zetacorp, message, args) {
      const sugierechannel = zetacorp.channels.cache.get(`898242663608877104`);
      const reporte = args.join(` `)
      if (!reporte) return message.channel.send(`<a:warning:862700922436845599> | \`Envia un reporte para el bot\``)

      const llegadaEmbed = new Discord.MessageEmbed()
        .setTitle(`:e_mail: | **Ha llegado un nuevo reporte!**`)
        .setDescription(`<@477851232879378441> , ha llegado un reporte. Aquí lo tienes: ` + reporte)
        .setColor(`#480048`)
        .addField('Enviado desde:', message.guild.name)
        .setFooter(message.author.displayAvatarURL({dynamic: true}), `Enviado por ${message.author.username} (${message.author.id})`)
      sugierechannel.send(llegadaEmbed)

      const sugiereembed = new Discord.MessageEmbed()
        .setTitle(`:e_mail: | **Reporte**`)
        .setDescription(`Tu reporte se ha enviado al buzón del bot con éxito.`)
        .setColor(`#480048`)
        .setFooter(`Reporte enviado por ` + message.author.username)

      message.channel.send(sugiereembed).then(m => m.react(`\u2709`))
    }
}