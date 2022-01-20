const Discord = require('discord.js')

module.exports = {
  name: 'suggestid',
  description: 'Sugiere una ID para que sea añadida a la blacklist',

  async execute(zetacorp, message, args) {
    let suggestedID = args[0]
    if (!suggestedID) return message.channel.send("> Por favor, dime la ID que quieres sugerir.")
    if (isNaN(suggestedID) || suggestedID.length > 18 || suggestedID.length < 18) return message.channel.send("> Por favor, dime una ID valida!")
    if (zetacorp.channels.cache.get(suggestedID)) return message.channel.send("> Hey! Envía la ID de un usuario o bot, no de un canal!")

    let verifyEmbed1 = new Discord.MessageEmbed()
    verifyEmbed1.setTitle("Cuestionario")
    verifyEmbed1.setDescription("__1. ¿Que ha hecho este usuario / bot para considerarse ser añadido a la blacklist?__")
    verifyEmbed1.setFooter("Responde a continuación", message.author.displayAvatarURL({ dynamic: true }))

    message.channel.send(verifyEmbed1)
    let filter = m => m.author.id === message.author.id
    let BanReason = "";
    let BanReasonLink = "";
    message.channel.awaitMessages(filter, { max: 1, time: 120000, errors: ['time'] })
      .then(collected => {
        if (collected.size <= 1) {
          BanReason = collected.first().content
        }

        let verifyEmbed2 = new Discord.MessageEmbed()
        verifyEmbed2.setTitle("Cuestionario")
        verifyEmbed2.setDescription("__2. Envianos el **LINK** de alguna captura donde se enseñe a este usuario / bot *haciendo el mal*__")
        verifyEmbed2.setFooter("Responde a continuación (Con un link! No una imagen adjunta!)", message.author.displayAvatarURL({ dynamic: true }))

        message.channel.send(verifyEmbed2)
        message.channel.awaitMessages(filter, { max: 1, time: 120000, errors: ['time'] })
          .then(async collected => {
            if (collected.size <= 1) {
              if (!collected.first().content.startsWith('https://')) return message.channel.send('<a:no:859383457125236736> | No has proporcionado un link. Vuelve a usar el comando y proporciona un link esta vez!')
              BanReasonLink = collected.first().content

            }

            const canalenviar = zetacorp.channels.cache.get('854803699783041024')
            let suggestedUser = await zetacorp.users.fetch(suggestedID) //no, porque para el fetch se necesita el UserManager, y eso te lo da el users nada más

            const embed = new Discord.MessageEmbed()
              .setTitle('ID sugerida!')
              .setAuthor(`Reportada por ${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
              .setDescription(`ID: ${suggestedID}\n<@${suggestedID}>`)
              .addField("Razon:", BanReason)
              .addField("Resources:", BanReasonLink)
              .setImage(BanReasonLink)
              .setThumbnail(suggestedUser.avatarURL({ dynamic: true }))

            canalenviar.send(embed)
              .catch(error => {
                embed.setFooter("No se pudo crear una vista previa de la imagen")
                embed.setImage(null)
                canalenviar.send(embed)
              })
          })
      })
  }
}