const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'nuke',
    aliases: ['n'],
    description: 'Borra un canal y crea uno idéntico',

    async execute(zetacorp, message, args) {
        if (!message.member.hasPermission(`ADMINISTRATOR`)) {
            return message.channel.send('<a:no:859383457125236736> | `No tienes Permisos para usar este comando`')
        }
        let nukereason = args.join(` `) || `Sin razón`

        if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) {
            return message.channel.send('<a:no:859383457125236736> | `No tengo Permisos para usar este comando`')
        }
        if (!message.channel.deletable) {
            return message.reply(`<a:no:859383457125236736> | \`Este canal no puede ser nukeado!\``)
        }
        message.channel.delete()
        
        let nukeEmbed = new MessageEmbed()
            .setTitle(`Canal nukeado!`)
            .setDescription(`Este canal ha sido nukeado correctamente`)
            .setImage(`https://media0.giphy.com/media/XrNry0aqYWEhi/giphy.gif?cid=ecf05e47bz8gkvj123ojaxpa5crxn5d0i044wh0ctbn7bmf4&rid=giphy.gif`)
        
               let canal = message.channel;
               let categoria = message.channel.parentID;
               let posicion = message.channel.position;
        
        message.channel.clone({parent: categoria, positon: posicion}).then(canalNukeado => 
        canalNukeado.setPosition(posicion)).then(terminado => 
        terminado.send(nukeEmbed))

      
    }
}
