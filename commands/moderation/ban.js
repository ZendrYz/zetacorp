const Discord = require('discord.js')

module.exports = {
  name: 'ban',
  aliases: ['b'],
  description: 'Banea a alguien del servidor',

  async execute(zetacorp, message, args) {
    if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('<a:no:859383457125236736> | `No tienes el permiso de` `BANEAR_MIEMBROS`')
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('<a:no:859383457125236736> | `Necesito poder` `BANEAR MIEMBROS` `para usar este comando!`')

    let member = message.mentions.members.first()
    if (!member) return message.channel.send('<a:warning:862700922436845599>  | \`Tienes que mencionar a alguien!\`')
    if (member.user.id == zetacorp.user.id) return message.channel.send('<a:warning:862700922436845599> | `No me puedes banear`')
    if (member.user.id === message.author.id) return message.channel.send(`<a:warning:862700922436845599>  | \`No te puedes banear a ti mismo!\``)
    if (member.user.bot) return message.channel.send('<a:warning:862700922436845599> | `No puedes banear bots`')
    if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send('<a:no:859383457125236736> | `No puedes banear a alguien con el mismo poder de jerarquía o mayor`')


    let racionamiento = args.join(" ").slice(22)
    if (!racionamiento) {
      racionamiento = "Sin razón"
    }

    const banembed = new Discord.MessageEmbed()
      .setTitle('Usuario baneado!')
      .setDescription(`Nombre: **${member.user.username}**\nID: **<@${member.user.id}>**\nModerador: **<@${message.author.id}>**\nRazón: ${racionamiento}`)
      .setColor('YELLOW')
      .setFooter(zetacorp.user.username, zetacorp.user.displayAvatarURL())

    message.guild.members.ban(member, { reason: `${racionamiento}, baneado por ${message.author.tag}` })
    message.guild.member(member).send(new Discord.MessageEmbed().setTitle('Fuiste baneado').setDescription(`Fuiste baneado de ${message.guild.name} por ${message.author.tag} por la razón ${racionamiento}`).setTimestamp()).catch(() => { return message.channel.send('<a:warning:862700922436845599> | `El usuario tiene los MD desactivados, así que no puedo avisarle`') })
    message.channel.send(banembed)
  }
}