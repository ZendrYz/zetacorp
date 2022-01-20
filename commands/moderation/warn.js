const Discord = require("discord.js");
const db = require('megadb')
const warns = new db.crearDB('warns')

module.exports = {
  name: "warn",
  aliases: ['w'],
  description: 'Avisa a alguien del servidor',
  
  async execute(zetacorp, message, args) {
      const persona = message.mentions.members.first()
      if (!persona) return message.channel.send('<a:warning:862700922436845599>  | \`Necesitas mencionar a alguien!\`')

      if (persona.id === message.author.id) return message.channel.send(`<a:warning:862700922436845599>  | \`No te puedes warnear a ti mismo!\``)
           
      if (persona.id === zetacorp.user.id) return message.channel.send('<a:warning:862700922436845599> | `No me puedes warnear`')
      if (persona.user.bot) return message.channel.send("<a:warning:862700922436845599> | `No puedes warnear a un bot`")

      if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('<a:no:859383457125236736> | \`Necesitas el permiso `MANAGE_GUILD` para usar este comando!\`')
      if (message.member.roles.highest.position <= persona.roles.highest.position) return message.channel.send('<a:no:859383457125236736> | `No puedes warnear a alguien con el mismo poder de jerarquía o mayor`')

      var razon = args.slice(1).join(" ")
      if (!razon) {
        razon = 'Sin razón'
      }

      if (!warns.tiene(`${message.guild.id}.${persona.id}`)) {
        warns.establecer(`${message.guild.id}.${persona.id}`, {cantidad: 0, Razon: `${razon}`})
      }

      warns.sumar(`${message.guild.id}.${persona.id}`, 1)

      const warnembed = new Discord.MessageEmbed()
        .setTitle('<:staff:859383432340832256> | Usuario warneado!')
        .addField('<:user:859383433075359785> | Usuario:', `<@${persona.id}> (${persona.id})`)
        .addField('<:mod:859383434198777856> | Moderador:', `<@${message.author.id}> (${message.author.id})`, true)
        .addField('<a:flecha2:862704053275459594> | Razón:', `${razon}`)

      message.channel.send(warnembed)


  }
}