const Discord = require('discord.js')

module.exports = {
  name: 'getinvite',
  aliases: ['gt'],
  description: 'Obtén la invite de cualquier bot',
  async execute(zetacorp, message, args) {
    const botdecline = message.mentions.users.first()

    if (!botdecline) return message.channel.send(`<a:no:859383457125236736> | \`Y el bot?\``)

    if (!botdecline.bot) return message.channel.send("<a:no:859383457125236736> | `Como quieres obtener el link de invitación de una persona?`")

    const inviteembed = new Discord.MessageEmbed()
      .setTitle(`Invitación de ` + botdecline.username)
      .setURL(`https://discord.com/api/oauth2/authorize?zetacorp_id=` + botdecline.id + `&permissions=8&scope=bot`)
      .setFooter(`Link generado con éxito!`)

    message.channel.send(inviteembed)
      .catch(error => {
        message.channel.send(error)
      })
  }
}