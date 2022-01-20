const Discord = require("discord.js");
const db = require('megadb'), lockdb = new db.crearDB('locka', 'data_guilds')

module.exports = {

  name: "unlock",
  description: 'Desbloquea el canal donde se envió el mensaje',

  async execute(zetacorp, message, args) {
    var perms = message.member.hasPermission(`MANAGE_CHANNELS`)
    if (!perms) return message.channel.send('<a:warning:862700922436845599>  | \`Necesitas permisos de\` `MANAGE_CHANNELS`')

    const dato = await lockdb.obtener(message.guild.id)
    if (dato) {
      message.channel.updateOverwrite(message.guild.roles.everyone, {
        CONNECT: true,
        SEND_MESSAGES: true
      })
        .catch(() => null)
        .then(() => {
          message.channel.send('<a:tick:859383424867237898> | \`Se ha desbloqueado el canal correctamente\`')
          lockdb.eliminar(message.guild.id)
        })
    } else {
      return message.channel.send('<a:warning:862700922436845599> | `Este canal ya está desbloqueado`')
    }

  }
}