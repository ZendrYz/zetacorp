const Discord = require('discord.js')
const db = require('megadb')
const db_logs = new db.crearDB('logs')

module.exports = async (zetacorp, message) => {
    const logs = await db_logs.obtener(`logs_` + message.guild.id)

  if (logs == null) return;
  
  const messagedeleteembed = new Discord.MessageEmbed()
    .setTitle(`<:zc_msg:909179671495716864> Un mensaje fue borrado!`)
    .addField(`<:user:859383433075359785> | Usuario/a:`, `<@${message.member.user.id}>`, true)
    .addField(`🎛️ | Contenido:`, message.content, true)
    .addField(`<:channel:909180319075295252> | Canal donde se borró:`, `<#${message.channel.id}>`, true)

  zetacorp.channels.cache.get(logs).send(messagedeleteembed)
}