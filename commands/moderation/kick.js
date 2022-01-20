const Discord = require("discord.js");

module.exports = {
  name: "kick",
  aliases: ['k'],
  description: 'Expulsa a alguien de tu servidor',

  async execute(zetacorp, message, args) {
    if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('<a:no:859383457125236736> | \`No tienes el permiso de\` `KICKEAR_MIEMBROS`')

    if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send('<a:no:859383457125236736> | \`Necesito el permiso\` `KICKEAR_MIEMBROS` \`para usar este comando!\`')

    const memberkick = message.mentions.members.first()

    let racionamiento = args.slice(22).join(' ')
    if (!racionamiento) {
      racionamiento = "Sin razón"
    }

    if (!memberkick) return message.channel.send('<a:warning:862700922436845599>  | \`Tienes que mencionar a alguien!\`')

    if (memberkick.user.id === message.author.id) return message.channel.send(`<a:warning:862700922436845599> | \`No te puedes kickear a ti mismo!\``)

    if (memberkick.user.id === zetacorp.user.id) return message.channel.send(`<a:warning:862700922436845599> | \`No me puedes kickear!\``)

    if (message.member.roles.highest.position <= memberkick.roles.highest.position) return message.channel.send('<a:no:859383457125236736> | `No puedes kickear a alguien con el mismo poder de jerarquía o mayor`')

    const kickembed = new Discord.MessageEmbed()
      .setTitle('Usuario kickeado!')
      .setDescription(`Nombre: **${memberkick.user.username}**\nID: **<@${memberkick.user.id}>**\nModerador: **<@${message.author.id}>**\nRazón: ${racionamiento}`)
      .setColor('YELLOW')
      .setFooter(zetacorp.user.username, zetacorp.user.displayAvatarURL())

    message.guild.members.kick(memberkick, { reason: `${racionamiento}, baneado por ${message.author.tag}` })
    message.guild.member(memberkick).send(new Discord.MessageEmbed().setTitle('Fuiste kickeado').setDescription(`Fuiste kickeado de ${message.guild.name} por ${message.author.tag} por la razón ${racionamiento}`).setTimestamp())
    message.channel.send(kickembed)

  }
}