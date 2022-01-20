const db = require('megadb')
const antienlaces = new db.crearDB('antienlaces', 'data_guilds')

module.exports = {
  name: 'antienlaces',

    execute(zetacorp, message, args) {
    var perms = message.member.hasPermission(`ADMINISTRATOR`)

    if (!perms) return message.channel.send(`<a:no:859383457125236736> | \`Necesitas permisos de ADMINISTRADOR\``)

    const server = message.guild.id

    const accionam = args[0]

    if (!accionam) return message.channel.send(`<a:warning:862700922436845599>  | \`Debes decir si quieres activarlo (on) o desactivarlo (off)\``)

    switch (accionam) {

      case "on":

        if (antienlaces.tiene(server)) return message.channel.send('<a:warning:862700922436845599> | Este server ya tiene el antienlaces activado')

        antienlaces.establecer(server, message.author.id)

        message.channel.send(`<a:tick:859383424867237898> | \`El antienlaces ha sido establecido\``)

        break;

      case "off":

        if (!antienlaces.tiene(server)) return message.channel.send('<a:warning:862700922436845599> | Este server no tiene el antienlaces activado')
        
        antienlaces.eliminar(server, message.author.id)

        message.channel.send(`<a:tick:859383424867237898> | \`El antienlaces ha sido desactivado\``)

        break;


    }
  }
}