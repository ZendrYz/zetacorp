const db = require('megadb')
const prefixes = new db.crearDB('prefixes', 'data_guilds')

module.exports = {
    name: 'setprefix',

    async execute(zetacorp, message, args) {

        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('<a:no:859383457125236736> | `Necesitas el permiso GESTIONAR SERVIDOR`')

        var prefix = args[0]

        const regex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g

        if (!prefix) return message.channel.send('<a:warning:862700922436845599> | `Necesitas decir el nuevo prefix`')

        let a = regex.test(prefix)

        if (a == true) return message.channel.send('<a:no:859383457125236736> | `No emojis`')

        if (prefix.length > 3) return message.channel.send('<a:no:859383457125236736> | `El prefix no puede tener más de 3 letras`')

        prefixes.establecer(message.guild.id, prefix)

        message.channel.send('<a:tick:859383424867237898> | `Se ha establecido el prefix de este servidor a` ' + '`' + prefix + '`')
    }
}