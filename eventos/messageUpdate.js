const Discord = require('discord.js')
const db = require('megadb')
const db_logs = new db.crearDB('logs')

module.exports = async (zetacorp, oldMessage, newMessage) => {
  const logs = await db_logs.obtener(`logs_` + oldMessage.guild.id)
  if (logs == null) return;

  var contenidoviejo = oldMessage.content;
  var contenidonuevo = newMessage.content;

  const membed = new Discord.MessageEmbed()
    .setTitle(`<:zc_msg:909179671495716864> Se editó un mensaje!`)
    .addField('<:user:859383433075359785> | Autor', `${newMessage.author}`, true)
    .addField(`<:zc_salida:894242089099997195> | Mensaje antes: `, contenidoviejo, true)
    .addField(`<:zc_entrada:894242089200676864> | Mensaje ahora: `, contenidonuevo, true)

  zetacorp.channels.cache.get(logs).send(membed)
}