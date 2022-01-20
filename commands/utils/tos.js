const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'tos',
    aliases: ['polity'],
    description: 'Mirate los terminos y condiciones del bot',
    
    async execute (zetacorp, message, args) {
        const embed = new MessageEmbed()
        .setTitle('Politica de privacidad')
        .setAuthor(zetacorp.user.username, zetacorp.user.displayAvatarURL())
        .setDescription('```1) El bot usa una base de datos (en este caso MongoDB) para recolectar y almacenar los datos de los comandos configurables.\nEl bot está hosteado en una vps privada, asi que nadie tiene acceso a los archivos, solo los desarrolladores.```\n ```2) Nadie, pero nadie, eliminará nunca los datos almacenados, así que no hay que preocuparse por establecer una y otra vez el prefix del bot / canales.```\n```3) EL bot cuenta con un sistema el cual otorga un rol administrativo a algun staff, esto se hace para hacer más facil el poder evitar raideos```\n```4) El developer tiene un comando privado para obtener el link de invitación a algún servidor donde se encuentre el bot.```\n```5) El mal uso del bot + su descubrimiento conllevará a:```\n- **Establecer su id en la blacklist del bot y prohibir el uso de sus comandos**\n- **Banearle del servidor público de ZetaCorp**')
        .setColor('RANDOM')
        
        message.channel.send(embed)
    }
}