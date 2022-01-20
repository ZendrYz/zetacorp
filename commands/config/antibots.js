const Discord = require('discord.js')
const db = require('megadb')
const antibots = new db.crearDB('antibots', 'data_guilds')

module.exports = {
  name: 'antibots',

  async execute(zetacorp, message, args) {
    let acciona = args[0]

    if (!message.member.hasPermission('ADMINISTRATOR')) {
      return message.channel.send('<a:no:859383457125236736> | Solo los `ADMINISTRADORES` pueden usar este comando!')
    }

    if (!acciona) return message.channel.send('<a:warning:862700922436845599>  | \`Dime la acción <on / off>\`')
    let infoEmbed = new Discord.MessageEmbed()
      .setTitle('<:engranaje:859383452193652786> | Antibots')
      .setColor('5c4fff');

    switch (acciona) {
      case "on":
        if (!antibots.tiene(message.guild.id)) { //worked?  ye noice
          antibots.establecer(message.guild.id, 'Activado');
          infoEmbed.setDescription('`Perfecto, ahora expulsaré los bots que entren en este servidor` <a:tick:859383424867237898>');
          message.channel.send(infoEmbed);
        } else {
          message.channel.send('<a:warning:862700922436845599>  | Este server ya tiene el antibots activado')
        }
        break;

      case "off":

        if (antibots.tiene(message.guild.id)) {
          antibots.eliminar(message.guild.id);
          infoEmbed.setDescription('`De acuerdo, ahora no expulsaré bots cuando entren` <a:tick:859383424867237898>');
          message.channel.send(infoEmbed);
          return;
        } else {
          message.channel.send('<a:warning:862700922436845599> | Este server ya tiene el antibots desactivado')
        }
        break;
    }
  }
}