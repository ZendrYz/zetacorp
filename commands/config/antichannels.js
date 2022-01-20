const Discord = require('discord.js')
const db = require('megadb')

module.exports = {
    name: 'antichannels',
    aliases: ['antich', 'anticanales', 'antichs'],
    
    async execute(zetacorp, message, args) {
        const infoeEmbed = new Discord.MessageEmbed()
        .setColor('5c4fff');

      if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('<a:no:859383457125236736> | \`Necesitas el permiso de\` `MANAGE_CHANNELS`');
      if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send('<a:no:859383457125236736> | \`Necesito el permiso de\` `MANAGE_CHANNELS`');

      const antichannels = new db.crearDB('antichannels', 'data_guilds');
      if (antichannels.tiene(message.guild.id)) {
        antichannels.eliminar(message.guild.id);
        infoeEmbed.setDescription('<a:tick:859383424867237898> | `Ahora voy a dejar crear canales`');
        message.channel.send(infoeEmbed);
        return;
      }
      if (!antichannels.tiene(message.guild.id)) {
        antichannels.establecer(message.guild.id, 'Activado');
        infoeEmbed.setDescription('<a:tick:859383424867237898> | `Ahora no voy a dejar crear canales`');
        message.channel.send(infoeEmbed);
        return;
      }
    }
}