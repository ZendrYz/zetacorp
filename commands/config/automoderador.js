const Discord = require('discord.js')
const db = require('megadb')
const db_logs = new db.crearDB('logs')
const warns = new db.crearDB('warns')


module.exports = {
  name: 'automoderador',

  async execute(zetacorp, message, args) {

    const infoaEmbed = new Discord.MessageEmbed()

    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('<a:no:859383457125236736> | \`Necesitass permisos de\` `ADMINISTRADOR`');
    const automoderator = new db.crearDB('automoderator', 'moderador_automatico');
    if (automoderator.tiene(message.guild.id)) {
      infoaEmbed.setDescription('<a:warning:862700922436845599> | Vas a deshabilitar el automoderador. Estás seguro?')
      message.channel.send(infoaEmbed).then(x => {
        x.react('✅')
        x.react('❌')
        x.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '❌'), { max: 1, time: 30000 }).then(collected => {
          if (collected.first().emoji.name == '✅') {
            automoderator.eliminar(message.guild.id)
            x.edit(infoaEmbed.setDescription('<a:warning:862700922436845599>  | `Ahora no moderaré tu servidor`'));
            x.reactions.removeAll()
          }
          if (collected.first().emoji.name == '❌') {
            x.edit(infoaEmbed.setDescription(`<a:no:859383457125236736> | \`De acuerdo, comando cancelado.\``));
            x.reactions.removeAll();
          }
        }).catch(() => {
          x.edit(infoaEmbed.setDescription(`<a:no:859383457125236736> | \`He cancelado el comando debido a un error\``));
          x.reactions.removeAll();
        });
        return;
      })
    }


    if (!automoderator.tiene(message.guild.id)) {
      infoaEmbed.setDescription('<a:warning:862700922436845599>  | Vas a activar el automoderador, ¿Prefieres que haga kick o ban cuando un usuario tenga muchas infracciónes?\n\nReacciona a `1️⃣` si prefieres que expulse o reacciona a `2️⃣` si prefieres que haga ban. Reacciona a `❌` para cancelar el comando');
      message.channel.send(infoaEmbed).then(msg => {

        msg.react('1️⃣');
        msg.react('2️⃣');
        msg.react('❌')
        msg.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '1️⃣' || reaction.emoji.name == '2️⃣' || reaction.emoji.name == '❌'), { max: 1, time: 30000 }).then(collected => {
          if (collected.first().emoji.name == '1️⃣') {
            msg.reactions.removeAll();
            automoderator.establecer(message.guild.id, 'kick');
            msg.edit(infoaEmbed.setDescription('<a:tick:859383424867237898> | `A partir de ahora este server estará protegido y haré kicks`'));

          } else if (collected.first().emoji.name == '2️⃣') {
            msg.reactions.removeAll();
            automoderator.establecer(message.guild.id, 'ban');
            msg.edit(infoaEmbed.setDescription('<a:tick:859383424867237898> | `A partir de ahora este server estará protegido y haré ban`'));

          } else if (collected.first().emoji.name == '❌') {
            msg.edit(infoaEmbed.setDescription(`<a:no:859383457125236736> | \`De acuerdo, comando cancelado.\``));
            msg.reactions.removeAll();

          } else msg.reactions.removeAll();
        }).catch(() => {
          msg.edit(infoaEmbed.setDescription(`<a:no:859383457125236736> | \`He cancelado el comando debido a un error\``));
          msg.reactions.removeAll();
        });
        return;
      });
    }
  }
}