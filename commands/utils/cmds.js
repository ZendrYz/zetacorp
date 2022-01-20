const Discord = require('discord.js')
const db = require('megadb'), premium = new db.crearDB('premium')

module.exports = {
    name: 'cmds',
    aliases: ['comandos', 'commands'],
    description: 'Muestra los comandos del bot',

    async execute(zetacorp, message, args) {
        if (!premium.tiene(message.author.id)) {
            const gfds = new Discord.MessageEmbed()
                .setTitle("Ayuda")
                .setDescription("```Hola! Soy ZetaCorp, un bot de protección para que tu servidor este seguro.```\n```También en este embed encontrarás todos mis comandos, así que disfruta!```")
                .setColor('#2bff00')
                .setFooter('Solicitado por ' + message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                .addField('<a:ruedas:859383437164937235> `Configuración`', '> `antiraid`, `antijoins`, `antibots`, `automoderador`, `setlogs`, `setprefix`, `antichannels`, `antienlaces`, `forcelock`, `forceunlock`, `antiflood`,')
                .addField('<:staff:859383432340832256> `Moderación`', '> `ban`, `hackban`, `forceban`, `kick`, `warn`, `unwarn`, `check-warns`, `lock`, `unlock`, `purge`, `nuke`')
                .addField('<:platinum:862702297149997116> `Otros`', '> `perfil`, `suggestid`, `scan`, `ping`, `tos`, `getinvite`, `estado`, `soy`, `invitar`, `botinfo`, `novedades`, `sos`, `sugerir`, `vote`')
                .addField('<:desarrollador:798222471148339201> `Desarrolladores`', '> `eval`, `set-premium`, `set-dev`, `restart`, `execute`, `guilds`, `rcmd`, `block`, `unblock`, `send`, `anuncio`, `server`, `add-staff`, `remove-staff`')
            message.channel.send(gfds)
        } else {
            const gfds2 = new Discord.MessageEmbed()
                .setTitle("Ayuda")
                .setDescription("```Hola! Soy ZetaCorp, un bot de protección para que tu servidor este seguro.```\n```También en este embed encontrarás todos mis comandos, así que disfruta!```")
                .setColor('YELLOW')
                .setFooter('Solicitado por ' + message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                .addField('<a:ruedas:859383437164937235> `Configuración`', '> `antiraid`, `antijoins`, `antibots`, `automoderador`, `setlogs`, `setprefix`, `antichannels`, `antienlaces`, `forcelock`, `forceunlock`, `antiflood`,')
                .addField('<:staff:859383432340832256> `Moderación`', '> `ban`, `hackban`, `forceban`, `kick`, `warn`, `unwarn`, `check-warns`, `lock`, `unlock`, `purge`, `nuke`')
                .addField('<:platinum:862702297149997116> `Otros`', '> `perfil`, `suggestid`, `novedades`, `scan`, `ping`, `tos`, `getinvite`, `estado`, `soy`, `invitar`, `botinfo`, `novedades`, `sos`, `sugerir`, `vote`')
                .addField('<:zc_developer:894242891269038120> `Desarrolladores`', '> `eval`, `set-premium`, `set-dev`, `restart`, `execute`, `guilds`, `rcmd`, `block`, `unblock`, `send`, `anuncio`, `server`, `add-staff`, `remove-staff`')
                .addField('<:star:867715162667483160> `Premium`', '> `antiroles`, `antigrabbers`')
            message.channel.send(gfds2)
        }
    }
}