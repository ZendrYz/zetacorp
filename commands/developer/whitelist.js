const Discord = require('discord.js')
const db = require('megadb')
const blacklistdb = new db.crearDB('blacklists')

module.exports = {
    name: 'whitelist',
    aliases: ['unblock', 'unbl'],
    
    async execute(zetacorp, message, args) {
        if (message.author.id !== '477851232879378441') return message.channel.send('<a:no:859383457125236736> | `Solo mis desarrolladores pueden usar este comando`')
        let user;
        if (message.mentions.users.first()) {
          user = message.mentions.users.first();
        } else if (args[0]) {
          user = zetacorp.users.cache.get(args[0])
        } 
        if (!user) return message.channel.send('<a:warning:862700922436845599> | `Necesitas decir un usuario`')
        
        let blacklist = await blacklistdb.obtener(user.id)
         const embed = new Discord.MessageEmbed()
        .setTitle('Blacklist!')
        .setDescription('Felicidades! Has sido eliminado de la blacklist del bot!')
        
        if (blacklist) {   
        blacklistdb.eliminar(user.id)
        message.channel.send('<a:tick:859383424867237898> | `El usuario` <@' + user.id + '> `fue eliminado de la blacklist correctamente`')
            user.send(embed)
        } else {
            message.channel.send('<a:warning:862700922436845599> | `Esa persona no está en la blacklist`')
        } return;

    }
}