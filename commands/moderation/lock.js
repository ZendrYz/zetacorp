const Discord = require("discord.js");
const db = require('megadb')
const lockdb = new db.crearDB('locks', 'data_guilds')

module.exports = {
  name: "lock",
  description: 'Bloquea el canal donde se envió el mensaje',

  async execute(zetacorp, message, args) {
    var perms = message.member.hasPermission(`MANAGE_CHANNELS`)
    if (!perms) return message.channel.send('<a:warning:862700922436845599>  | \`Necesitas permisos de\` `MANAGE_CHANNELS`')

    if (lockdb.tiene(message.guild.id)) {
      return message.channel.send('<a:warning:862700922436845599> | `Este canal ya está bloqueado`')
    }

    message.channel.updateOverwrite(message.guild.roles.everyone, {
      CONNECT: false,
      SEND_MESSAGES: false
    })

    lockdb.establecer(message.guild.id, message.channel.id)

    message.channel.send('<a:tick:859383424867237898> | \`Se ha bloqueado el canal correctamente\`')

  }
}