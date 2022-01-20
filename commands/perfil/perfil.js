const Discord = require('discord.js')
const db = require('megadb')
const perfil = new db.crearDB('perfil', 'perfiles')
const premium = new db.crearDB('premiums', 'perfiles')
const premiums = new db.crearDB('premium')
const devs = new db.crearDB('devs', 'perfiles')
const textos = new db.crearDB('textos', 'perfiles')
module.exports = {
    name: 'perfil',
    usage: "c'perfil set-texto <Texto> | c'perfil",
    description: 'Mira tu perfil global',

    async execute(zetacorp, message, args) {
        if (!perfil.tiene(message.author.id)) {
            const embed1 = new Discord.MessageEmbed()
                .setTitle('<a:warning:862700922436845599> | Establecer contraseña')
                .setDescription('> Como veo que es la primera vez que usas el comando `perfil`, te pediría que porfavor introdujeses una contraseña, para que nadie pueda ver tu información')
                .setFooter('Recuerda no introducir contraseñas que ya estés usando en tu cuenta de gmail, discord, etc.')
                .setColor('YELLOW')
            message.channel.send(embed1).then(m => {
                m.channel.awaitMessages(msg => msg.author.id == message.author.id, { max: 1, time: 100000, errors: ['time'] }).then(collected => {
                    let con = collected.first().content;
                    //let mensaje = m.channel.messages.find(m => m.content == con
                    //con.delete()
                    perfil.establecer(message.author.id, `${con}`).catch(e => console.log(e + "con el comando perfil") && m.channel.send('Hubo un error: ' + e)).then(() => {
                        //mensaje.delete();
                        m.channel.send('<a:tick:859383424867237898> | `Se estableció correctamente tu contraseña`')
                    })
                })
            })
        } else {
            if (args[0] == "set-texto") {
                let texto = args.slice(1).join(' ');
                if (!texto) return message.channel.send('<a:no:859383457125236736> | `Necesitas decir un texto`')
                const links = [" .gg", "..gg", "`gg/`", "`http:`", "http:", "http", " .com", "`.com`", ".com", ".be", " .be", ".me", " .me", " https:", " .gg/", "-gg/", " -gg/", "`.gg`", "`https:`", "`discord.gg/`", "**.gg**", ".gg/", ".me/", ".io/", "discordapp.com/invite", "youtube.com/", "youtu.be/", "twitter.com/", "facebook.com/", "twitch.com/", 'discord.gg/', 'http://gestyy.com/', 'https://grabify.link/', '	http://detonnot.com/', "https//:", ".com", "https://"]

                if (links.some(word => message.content.toLowerCase().includes(word))) return message.channel.send("<a:no:859383457125236736> | `No links`").then(message.delete())
                textos.establecer(message.author.id, `${texto}`)
                message.channel.send('<a:tick:859383424867237898> | `Se ha establecido tu texto personalizado a` **' + texto + "**")
                
            } else if (!args[0]) {
                const cont = await perfil.obtener(message.author.id)

                message.channel.send(new Discord.MessageEmbed().setTitle('<a:warning:862700922436845599> | Introducir contraseña').setDescription('> Te pediría que introdujeras la contraseña de tu perfil para poder acceder a los datos').setColor('YELLOW')).then(mg => {
                    mg.channel.awaitMessages(msg => msg.author.id == message.author.id, { max: 1, time: 100000, errors: ['time'] }).then(async collected => {
                        let cona = collected.first().content
                        if (cona !== cont) {
                            return message.channel.send('<a:no:859383457125236736> | `Contraseña incorrecta. Vuelve a intentarlo`')
                        } else {
                            //cona.delete()
                            let p;
                            if (devs.tiene(message.author.id)) {
                                p = await devs.obtener(message.author.id)
                            } else {
                                p = "No es developer del bot"
                            }
                            let a;
                            if (premium.tiene(message.author.id)) {
                                a = await premium.get(message.author.id)
                            } else {
                                a = "No es miembro premium"
                            }
                            let n;
                            if (textos.tiene(message.author.id)) {
                                n = await textos.obtener(message.author.id)
                            } else {
                                n = "No tiene texto personalizado"
                            }
                            const embed2 = new Discord.MessageEmbed()
                                .setTitle('<:user:859383433075359785> | Perfil de ' + message.author.username)
                                .addField('<:id:894242089234206760> | ID', message.author.id).addField('<:developer:894242891269038120> | Developer', `${p}`)
                                .addField('<:platinum:862702297149997116> | Premium', `${a}`)
                                .addField('🗂️ | Texto personalizado', `${n}`)
                                .setColor('YELLOW')
                            message.channel.send(embed2)
                        }
                    })
                })
            }
        }
    }
}