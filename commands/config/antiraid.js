const Discord = require('discord.js')
const db = require('megadb')
const raiddetect = new db.crearDB('raiddetect', 'data_guilds');
const ajustes_anti = new db.crearDB('ajustes', 'data_guilds')

module.exports = {
    name: 'antiraid',
    aliases: ['detectar-raid', 'rd'],
    usage: "c'antiraid | c'antiraid ajustes | c'antiraid opciones Punishment",

    async execute(zetacorp, message, args) {
        let ajustes = args[0]
        let opciones = args[1]

        if (message.author.id !== message.guild.owner.user.id) return message.channel.send('<a:No:810974861521584188> | `Necesitas ser el propietario del servidor`')
        if (!ajustes && !opciones) {
            if (raiddetect.tiene(message.guild.id)) {
                const embed1 = new Discord.MessageEmbed()
                    .setTitle('Aviso | Detectar raids')
                    .setDescription('El sistema para detectar raids ha sido desactivado. Ten cuidado <a:warning:894242089406177291>')
                    .setTimestamp()
                message.channel.send(embed1)
                raiddetect.eliminar(message.guild.id)
            } else {
                raiddetect.establecer(message.guild.id, 'Detectar Raid')
                message.channel.send(new Discord.MessageEmbed().setTitle('Aviso | Detectar raids').setDescription('El sistema para detectar raids ha sido establecido correctamente').setTimestamp())
            }
        } else {
            switch (ajustes) {
                case "ajustes":
                    message.channel.send(new Discord.MessageEmbed().setTitle('Ajustes antiraid').setDescription('`-` Member-type\n`-` Channel-limit\n`-` Time').setFooter('Para establecer los ajustes usa c\'antiraid opciones <Ajuste>'))
            }
            switch (opciones) {
                
                case "Member-type":
                    await message.channel.send('<a:loading:859383455765757962> | `Que tipo de miembro deseas banear para los sistemas antiraid? (bots / users / all)`').then(async msg => {
                        msg.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 100000, errors: ['time'] }).then(async collected => {
                            if (collected.first().content.toLowerCase() == 'bots') {
                                await ajustes_anti.establecer(message.guild.id, { miembro: 'bots' })
                                message.channel.send('<a:tick:859383424867237898> | `Mimebro para banear establecido correctamente (bots)`')
                            } else if (collected.first().content.toLowerCase() == 'users') {
                                await ajustes_anti.establecer(message.guild.id, { miembro: 'users' })
                                message.channel.send("<a:tick:859383424867237898> | `Miembro para banear establecido correctamente (users)`")
                            } else if (collected.first().content.toLowerCase() == 'all') {
                                await ajustes_anti.establecer(message.guild.id, { miembro: 'all' })
                                message.channel.send('<a:tick:859383424867237898> | `Miembro para banear establecido correctamente (all)`')
                            } else return message.channel.send('<a:no:859383457125236736> | `Introduce una acción válida (kick / ban)`')
                        })
                    })
                    break;
                    
                case "Channel-limit":
                    await message.channel.send('<a:loading:859383455765757962> | `Cual quieres que sea el limite de canales creados? (min. 4)`').then(async m => {
                        m.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 100000, errors: ['time'] }).then(async coll => {
                            let peo = await ajustes_anti.obtener(message.guild.id)
                            console.log(peo)
                            if (isNaN(coll.first().content) || parseInt(coll.first().content)) return message.channel.send('<a:no:859383457125236736> | `No has puesto un número correcto`')
                            if (coll.first().content < 4) return message.channel.send('<a:no:859383457125236736> | `He dicho que el mínimo es 4`')
                            ajustes_anti.establecer(message.guild.id, { limit: coll.first().content })
                            
                        })
                    })
                    break;

                case "Time":
                    await message.channel.send('<a:loading:859383455765757962> | `Cual quieres que sea el tiempo para detectar el raid? (recomendable 5000ms)`').then(m => {
                        m.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 100000, error: ['time'] }).then(collected => {
                            if (isNaN(collected) || parseInt(collected)) return message.channel.send('peo pvta')
                            ajustes_anti.establecer(message.guild.id, { tiempo: collected.first().content })
                        })
                    })


                    break;
            }
        }
    }
}