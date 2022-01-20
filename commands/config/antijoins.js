const Discord = require('discord.js')
const db = require('megadb')
const antijoins = new db.crearDB('antijoins', 'data_guilds')

module.exports = {
  name: 'antijoins',

  async execute(zetacorp, message, args) {
    let acciona = args[0]

    if (!message.member.hasPermission('ADMINISTRATOR')) {
      return message.channel.send('<a:no:859383457125236736> | Solo los `ADMINISTRADORES` pueden usar este comando!')
    }

    if (!acciona) return message.channel.send('<a:warning:862700922436845599>  | \`Dime la acción <on / off>\`')
    let infoEmbed = new Discord.MessageEmbed()
      .setTitle('<:engranaje:859383452193652786> | Antijoins')
      .setColor('5c4fff');

    switch (acciona) {
      case "on":
        if (!antijoins.tiene(message.guild.id)) { //worked?  ye noice
          antijoins.establecer(message.guild.id, 'Activado');
          infoEmbed.setDescription('`Perfecto, ahora expulsaré los nuevos usuarios que entren en este servidor` <a:tick:859383424867237898>');
          message.channel.send(infoEmbed);
        } else {
          message.channel.send('<a:warning:862700922436845599>  | Este server ya tiene el antijoins activado')
        }
        break;

      case "off":

        if (antijoins.tiene(message.guild.id)) {
          antijoins.eliminar(message.guild.id);
          infoEmbed.setDescription('`De acuerdo, ahora no expulsaré usuarios cuando entren` <a:tick:859383424867237898>');
          message.channel.send(infoEmbed);
          return;
        } else {
          message.channel.send('<a:warning:862700922436845599>  | Este server ya tiene el antijoins desactivado')
        }
        break;
    }
  }
}