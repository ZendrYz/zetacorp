const Discord = require('discord.js')

module.exports = {
    name: 'help',
    aliases: ['h'],
    description: 'Pues, eso, comando de ayuda',

    async execute(zetacorp, message, args) {
        if (!args[0]) {
            const helping = new Discord.MessageEmbed()
                .setTitle(`Hola ${message.author.username}, bienvenido a mi panel de ayuda`)
                .setDescription("**ZetaCorp** se encarga de proteger tu servidor, con comandos para banear a más de 800 usuarios maliciosos, evitar enlaces, y autobanear personas con muchos warns!\n<:info:861666262857285633> | Principal\n<a:flecha2:862704053275459594> Prefix: **c'**\n<a:flecha2:862704053275459594> Comandos: **c'cmds**\n<:user:859383433075359785> Usuarios: **" + zetacorp.guilds.cache.reduce((c, v) => c + v.memberCount, 0) + "** \n<:servidor:894242088894480405> Servidores: **" + zetacorp.guilds.cache.size + "**")
                .setFooter('Programado por ZendrYz e Iván | Creditos a SP Agency por la inspiración de muchos comandos', zetacorp.user.displayAvatarURL())
            message.channel.send(helping)
        } else {
            if (args[0]) {
                const command = zetacorp.commands.get(args[0].toLowerCase()) || zetacorp.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));
                if (!command) {
                    const nocmd = new Discord.MessageEmbed()
                        .setTitle('Ese comando no existe')
                        .setDescription('Prueba a usar `c\'cmds` para ver los comandos disponibles')
                    message.channel.send(nocmd)
                } else {
                    const embed = new Discord.MessageEmbed()
                        .setTitle('Comando: `' + command.name + "`")
                        .setDescription(command.description ? `${command.description}` : "`Parece que no hay descripción`")
                        .setFooter('Recuerda que todos los comandos empiezan por un prefix')
                        .addField('Alias: ', command.aliases ? `${command.aliases.join(', ')}` : "`No hay aliases`")
                        .addField('Uso', command.usage ? `${command.usage}` : "`No hay uso incluido`")
                        .addField('Ejemplo', command.example ? `${command.example}` : '`No hay ejemplos`')
                    message.channel.send(embed)
                }
            }
        }
    }
}