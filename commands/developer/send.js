const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'send',
    aliases: ['enviar'],

    async execute(zetacorp, message, args) {
        const soloa = ['477851232879378441', '477137760616972339']
        if (!soloa.includes(message.author.id)) return message.channel.send('<a:no:859383457125236736> | `Necesitas ser desarrollador del bot`')
        const id = args[0]
        if (!id) return message.channel.send('<a:no:859383457125236736> | `Necesitas colocar una ID`')
        if (!zetacorp.users.cache.get(id)) return message.channel.send('<a:no:859383457125236736> | `Ese usuario no existe en mi base de datos`')
        if (!args.slice(1).join(' ')) return message.channel.send('<a:no:859383457125236736> | `Debes escribir que enviar`')

        /*zetacorp.users.cache.get(id).send("Mensaje del desarrollador " + message.author.tag + ". **" + args.slice(1).join(' ') + "**").catch(e => {
            message.channel.send(e) 
        })*/
        zetacorp.users.cache.get(id).send(new MessageEmbed().setTitle("Mensaje oficial del desarrollador " + message.author.tag).setDescription("**" + args.slice(1).join(' ') + "**").setThumbnail(message.author.displayAvatarURL({ dynamic: true })))
    }
} 