const Discord = require('discord.js')
const db = require('manage-maliciousdb')

module.exports = {
    name: 'soy',
    aliases: ['me'],
    description: 'Comprueba si eres un usuario malicioso',

    async execute(zetacorp, message, args) {
        const findUser = await db.findElementByID(message.author.id)
        if (!findUser) {
            return message.channel.send('<a:gw:860288614591889438> | `No estás en la base de datos como usuario malicioso`')
        } else {
            const maliembed = new Discord.MessageEmbed()
                .setTitle('Lista negra')
                .setDescription(`\`ID: ${message.author.id}\`\n\n\`Razón: ${findUser.razon}\n\nPrueba: `)
                .setImage(findUser.prueba)

            message.channel.send(maliembed)

        }
    }
}