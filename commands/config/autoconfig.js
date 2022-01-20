const db = require('megadb'), logs = new db.crearDB('logs')
const { MessageEmbed } = require('discord.js')
const db2 = require('manage-maliciousdb')
const raiddetect = new db.crearDB('raiddetect', 'data_guilds')

module.exports = {
    name: 'autoconfig',
    aliases: ['autoconfiguracion'],

    async execute(zetacorp, message, args) {

        if (message.author.id !== '477851232879378441') return message.channel.send('<a:no:859383457125236736> | `Comando en mantenimiento`')

        if (!message.member.hasPermission('ADMINISTRATOR')) {
            return message.channel.send('<a:no:859383457125236736> | Solo los `ADMINISTRADORES` pueden usar este comando!')
        }

        const m1 = await message.channel.send('<a:warning:894242089406177291> | `El bot empezará su configuración automática, el cual consiste en habilitar los sistemas antiraid si estos no están activados, activar el forceban para banear a los usuarios maliciosos, etc.`')
        const m4 = await message.channel.send("<a:loading:867705645977567232> | `Comprobando sistemas antiraid`")
        const m2 = await message.channel.send('<a:loading:867705645977567232> | `Baneando a los usuarios maliciosos`')
        const m3 = await message.channel.send('<a:loading:867705645977567232> | `Comprobando permisos`')
        const m5 = await message.channel.send('<a:loading:867705645977567232> | `Comprobando canal de logs`')

        setTimeout(async () => {
            const data = await raiddetect.obtener(message.guild.id)
            if (!data) {
                raiddetect.establecer(message.guild.id, 'Detectar raids')
                await m1.delete()
                await m4.edit("<a:warning:894242089406177291> | `Antiraid establecido correctamente. Antes no lo estaba`")
            } else {
                await m4.edit("<a:tick:859383424867237898> | `Antiraid establecido correctamente. Ya estaba activado`")
            }
        }, 5000)

        setTimeout(async () => {
            try {
                const u = await db2.getMaliciousArray()
                u.map(id => message.guild.members.ban(id))

                m2.edit('<a:tick:859383424867237898> | `Todos los usuarios maliciosos han sido baneados correctamente`')
            } catch (e) {
                m2.edit("Ha ocurrido un error al banear: **" + e + "**")
            }
        }, 10000)

        setTimeout(async () => {
            if (!message.guild.me.hasPermission('ADMINISTRATOR')) {
                const rol = message.guild.roles.cache.find(rol => rol.name == "ZetaCorp")
                if (message.guild.me.hasPermission('MANAGE_ROLES') && !rol) {
                    rol = await message.guild.roles.create({
                        data: {
                            name: 'ZetaCorp',
                            reason: 'Rol creado por el configurador automático',
                            color: 'BLUE',
                            permissions: 'ADMINISTRATOR'
                        }
                    }).catch(e => console.log(e))
                }
                m3.edit('<a:warning:894242089406177291> | `No tengo permisos de ADMINSTRADOR. Por ello, he creado un rol específico con permisos de ADMINISTRADOR`')
            } else {
                m3.edit('<a:tick:859383424867237898> | `Tengo permisos de ADMINSTRADOR`')
            }
        }, 16000)
        setTimeout(async () => {
            const dato = await logs.obtener("logs_" + message.guild.id)
            if (!dato) {
                try {
                    message.guild.channels.cache.create('・🤖〡logsbot', { type: 'GUILD_TEXT', topic: "Logs de ZetaCorp" }).then(ch => {
                        ch.send('<a:tick:859383424867237898> | `En este canal se enviarán los nuevos logs`') && m5.edit('<a:warning:894242089406177291> | `Como no había canal de logs, establecí yo uno propio llamado ` <#' + ch.id + '>')
                        logs.establecer("logs_" + message.guild.id, ch.id)
                    })
                } catch (e) { return e }
            } else {
                m5.edit('<a:tick:859383424867237898> | `Canal de logs encontrado`')
            }
        }, 20000)
        setTimeout(async () => {
            message.channel.send(new MessageEmbed().setTitle('<a:ruedas:859383437164937235> | Autoconfiguración ZetaCorp').setDescription('La autoconfiguración del bot ha terminado con éxito. Si crees que debería corregir algo, usa `c\'cmds` y en el apartado de Configuración, mira que comandos te pueden servir para aumentar la seguridad').setFooter('Gracias por usar a ZetaCorp', zetacorp.user.displayAvatarURL()))
        }, 23000)
    }
}