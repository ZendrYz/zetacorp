const Discord = require('discord.js')
const moment = require(`moment`);
let os = require('os')
let cpuStat = require('cpu-stat')

module.exports = {
    name: 'botinfo',
    aliases: ['info', 'bot', 'system'],
    description: 'Mira el estado del bot',

    /**
     * 
     * @param {Discord} zetacorp 
     * @param {Message} message 
     * @param {string[]} args 
     * @param {String} ''
     */

    async execute(zetacorp, message, args) {
        const actividad = moment.duration(zetacorp.uptime).format(` D [dias], H [hrs], m [mins], s [secs]`);

        try {
            var totalCores = cpuStat.totalCores();
            var avgClockMHz = cpuStat.avgClockMHz();
            cpuStat.usagePercent(function (e, percent, seconds) {

                const embed2 = new Discord.MessageEmbed()
                    .setTitle(`${message.author.username}, te doy la bienvenida a mi hardware.`, zetacorp.user.displayAvatarURL())
                    .addField(`<:ram:863426538505895976> RAM Usada`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
                    .addField(`<:ram:863426538505895976> RAM Total`, `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
                    .addField(`<:cpu:870423144605831198> CPU`, `${os.cpus().map((i) => `${i.model}`)[0]}`, true)
                    .addField(`<:cpu:870423144605831198> Uso de CPU`, `${percent.toFixed(2)} %`, true)
                    .addField('<:cpu:870423144605831198> Cores', totalCores, true)
                    .addField('<:cpu:870423144605831198> Velocidad', avgClockMHz + 'mHz', true)
                    .addField(`<:cpu:870423144605831198> Arquitectura`, `${os.arch()}`, true)
                    .setColor('YELLOW')

                const botembed = new Discord.MessageEmbed()
                    .setTitle(`${message.author.username}, te doy la bienvenida a mi panel.`, zetacorp.user.displayAvatarURL())
                    .addField(`<:developer:859383438741471242> Developers`, `<@477851232879378441> & <@477137760616972339>`, true)
                    .addField(`<:carpeta:868197917951930378> Libreria`, `Discord.js ^${Discord.version}`, true)
                    .addField(`<a:online:859383439651897374> Uptime`, actividad)
                    .addField(`<:user:859383433075359785> Usuarios`, `${zetacorp.guilds.cache.reduce((c, v) => c + v.memberCount, 0)}`, true)
                    .addField(`<:servidor:870748476378587217> Servidores`, `${zetacorp.guilds.cache.size}`, true)
                    .setColor('YELLOW')
                    .setFooter('Reacciona a 💻 para ver el estado del hardware del equipo | Reacciona a ↩️ para volver aquí')

                message.channel.send(botembed).then(msg => {
                    msg.react('💻')
                    msg.react('↩️')
                    msg.awaitReactions((reaction, user) => {
                        if (message.author.id !== user.id) return;
                        if (reaction.emoji.name == '💻') {
                           
                            msg.edit(embed2)
                        }
                        if (reaction.emoji.name == '↩️') {
                       
                            msg.edit(botembed)
                        }
                    })
                })

                if (e) {
                    return console.log(String(e.stack).red);
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}