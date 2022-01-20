const Discord = require('discord.js')

module.exports = {
   name: 'invitar',
   aliases: ['invite'],
   description: 'Envia el link de invitación del bot',

   execute(zetacorp, message, args) {

      const invite = new Discord.MessageEmbed()
         .setTitle('Invitame a tus servidores')
         .setURL('https://discord.com/api/oauth2/authorize?zetacorp_id=854509294892089344&permissions=8&scope=bot')

      message.channel.send(invite)

   }
}