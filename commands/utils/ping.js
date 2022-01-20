const Discord = require('discord.js')

module.exports = {
    name: 'ping',
    description: 'Mira la latencia del bot',

    async execute(zetacorp, message, args) {

        let ping = message.zetacorp.ws.ping
        let ping2 = Date.now() - message.createdTimestamp
        let ping3 = function (ping, options) {
            let values = {
                'high': 300,
                'medium': 150,
                'low': 50
            }
            values = {
                ...values,
                ...options
            }
            if (ping > values.high) {
                return '🔴'
            } else if (ping > values.medium) {
                return '🟡'
            } else {
                return '🟢'
            }
            if (ping2 > values.high) {
                return '🔴'
            } else if (ping2 > values.medium) {
                return '🟡'
            } else {
                return '🟢'
            }
        }

        const APIEmbed = new Discord.MessageEmbed()
            .setDescription(`[ <:satelite:859383448819859456> ] Mensajes: \`${ping3(ping2) + ping2} ms\`\n[ <a:wifi:868239371072069682> ] API de Discord: \`${ping3(ping) + ping} ms\``)
        if (ping + ping2 < 130) {
            APIEmbed.setColor('GREEN')
        } else if (ping + ping2 < 200) {
            APIEmbed.setColor('YELLOW')
        } else {
            APIEmbed.setColor('RED')
        }

        message.channel.send(APIEmbed)

    }
}