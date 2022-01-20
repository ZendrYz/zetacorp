const Discord = require('discord.js')

module.exports = {
    name: 'guild',
    aliases: ['server'],

    async execute(zetacorp, message, args) {
        const solo = ['477137760616972339', '477851232879378441']
        if (!solo.includes(message.author.id)) return message.channel.send('<a:no:859383457125236736> | `Este comando solo lo pueden usar los desarrolladores!`');
        let guild = zetacorp.guilds.cache.get(args[0]);
        if (!guild) return message.channel.send("<a:no:859383457125236736> | `El bot no está en este server`")
        let codigo = await guild.channels.cache.filter(m => m.type == "text").random().createInvite()
        if (codigo === undefined) return message.channel.send("Ups, parece que ocurrió un error. Intenta nuevamente")
        message.channel.send(new Discord.MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL()).setDescription(`[Link](${codigo}) <- Invitación de **${guild.name}**`))
    }
}