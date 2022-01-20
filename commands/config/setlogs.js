const Discord = require('discord.js')
const db = require('megadb')
const db_logs = new db.crearDB('logs')

module.exports = {
  name: 'setlogs',
  description: 'Establece los logs del servidor',
  usage: '<Prefix>setlogs <Channelmention> | <Prefix>setlogs off',
  example: "c'setlogs #logs | c'setlogs off",

  async execute(zetacorp, message, args) {

    if (args[0] == 'off') {

      if (!db_logs.tiene(`logs_` + message.guild.id)) return message.channel.send(`<a:warning:862700922436845599>  | \`Este server no tiene logs establecidos!\``)

      const otroembed = new Discord.MessageEmbed()
        .setThumbnail(`https://media.discordapp.net/attachments/799717676909985842/821008033147912232/cheque_caja.gif`)
        .setTitle(` > Los logs se han eliminado de este servidor`)

      message.channel.send(otroembed)

      db_logs.eliminar(`logs_` + message.guild.id)
    } 

    const aserver = message.guild.id

    const data = await db_logs.obtener("logs_" + aserver)

    if (data) return message.channel.send('<a:no:859383457125236736> | `Este server ya tiene logs establecidos. Canal:` <#' + data + ">")

    if (!message.member.hasPermission(`MANAGE_GUILD`)) return message.channel.send('<a:no:859383457125236736> | `No tienes el permiso de` `MANAGE_GUILD`')
    const canalm = message.mentions.channels.first()

    if (!canalm) return message.channel.send(`:grey_question: | \`Cual quieres que sea el canal de la auditoría? Menciónalo\``)
    if (canalm.guild.id !== aserver) return message.channel.send(`<a:warning:862700922436845599>  | \`No puede poner los logs en otro servidor!\``)
    if (canalm.type === `voice`) return message.channel.send(`<a:warning:862700922436845599>  | \`No puedes poner un canal de voz como canal de auditoría!\``)
    if (canalm.type === `category`) return message.channel.send(`<a:warning:862700922436845599>  | \`No puedes poner una categoría como canal de auditoría!\``)

    const logsembed = new Discord.MessageEmbed()
      .setThumbnail(`https://media.discordapp.net/attachments/799717676909985842/821008033147912232/cheque_caja.gif`)
      .setDescription(`** > El canal <#${canalm.id}> se ha establecido correctamente para los registros de auditoría**`)

    db_logs.establecer(`logs_` + aserver, canalm.id)
    message.channel.send(logsembed)
  }
}