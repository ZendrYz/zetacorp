const Discord = require('discord.js')
const db = require('megadb')
const blacklistdb = new db.crearDB('blacklists')
module.exports = {
    name: 'forceban',
    description: 'Banea a usuarios maliciosos',

    async execute(zetacorp, message, args) {
        if (message.author.id !== '477851232879378441') return message.channel.send('<a:no:859383457125236736> | `Comando en mantenimiento`')
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('<a:no:859383457125236736> | `Necesitas el permiso` `BAN_MEMBERS`')
        if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send('<a:no:859383457125236736> | `Necesito el permiso` `BAN_MEMBERS`')
        const users = await blacklistdb.obtener()
        console.log(users);
       /* try {
            
        } catch (e) {
            message.channel.send('Ha ocurrido un error al banear' + e)
        }

        try {
            const embed = new Discord.MessageEmbed()
                .setTitle('Forceban | Activado')
                .setDescription('Todos los usuarios maliciosos han sido baneados del servidor')
                .setColor('RANDOM')
            message.channel.send(embed)
        } catch (e) {
            return;
        }*/
    }
}