const Discord = require('discord.js')
const db = require('megadb')
const blacklistdb = new db.crearDB('blacklists')

module.exports = {
    name: 'blacklist',
    aliases: ['block', 'bl'],
    
    async execute(zetacorp, message, args) {
        if (message.author.id !== '477851232879378441') return message.channel.send('<a:no:859383457125236736> | `Solo mis desarrolladores pueden usar este comando`')
       
        let user;
        if (message.mentions.users.first()) {
          user = message.mentions.users.first();
        } else if (args[0]) {
          user = zetacorp.api.users(args[0]).get()
        } 
        if (!user) return message.channel.send('<a:warning:862700922436845599> | `Necesitas decir un usuario`')
        let razon = args.slice(1).join(' ')
        if (!razon) {
            razon = "Sin razón"
        }
        const embed = new Discord.MessageEmbed()
        .setTitle('Blacklist!')
        .setDescription(`Vaya! Parece que has sido añadido a la blacklist del bot por ${razon}. Para discutir / apelar, unete al [servidor de soporte](https://discord.gg/qejzJzJNpE)`)
        const embed2 = new Discord.MessageEmbed()
        .setTitle('Caso de blacklist')
        .setDescription(`El usuario <@${user.id}> fue añadido a la blacklist correctamente por: **${razon}**`)
        .setColor('WHITE')
        let blacklist = await blacklistdb.obtener(user.id, user.id)
        
        if (blacklist) {   
        blacklistdb.establecer(user.id, razon)
        user.send(embed)
        message.channel.send(embed2)
        //message.channel.send('<a:tick:859383424867237898> | `El usuario` <@' + user.id + '> `fue añadido a la blacklist correctamente`')
        } else {
            message.channel.send('<a:warning:862700922436845599> | `Esa persona ya está en la blacklist`')
        } return;

    }
}