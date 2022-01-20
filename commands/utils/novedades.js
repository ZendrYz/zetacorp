const Discord = require('discord.js')

module.exports = {
  name: 'novedades',
  aliases: ['news'],
  description: 'Mira las novedades del bot',

  async execute(zetacorp, message, args) {
    let user = message.author
    let categorias = []
    let pagina = 1
    const embed1 = new Discord.MessageEmbed()
      .setTitle('Novedades | V2.4.0')
      .setDescription('`Se han mejorado todos los sistemas anti-raid | Eliminación de casi todos los comandos de la categoría Otros | Antibots y antijoins arreglado | Comando ayuda avanzada para comando | Autoconfig (en desarrollo)`')
      .setTimestamp()
    const embed3 = new Discord.MessageEmbed()
      .setTitle('Noticias del desarrollador')
      .setDescription('`Hola buenas, la organización antiraider ya está creada. Por eso, si alguien está interesado en ayudarme, que me hable al md` ( <@477851232879378441> )')
      .setTimestamp()
    const embed2 = new Discord.MessageEmbed()
      .setTitle('Actualización temática')
      .setDescription("`Si alguien se ha dado cuenta, Behemot Secure ya no existe, ahora pasa a ser llamado ZetaCorp, sumando así la implementación de la corporación anti-raid Zeta. Esperamos aliarnos con otras org's antiraid y hacer crecer nuestro poder contra los raiders.`")
    const paginas = [
      embed1, embed2, embed3
    ]
    let msg = await message.channel.send(embed1)
    console.log('Alguien usó el comando de novedades! Su tag: ' + message.author.tag)

    await msg.react("⏪")
    await msg.react("◀️")
    await msg.react("❌")
    await msg.react("▶️")
    await msg.react("⏩")

    const atrasF = (reaction, user) => reaction.emoji.name === '◀️' && user.id === message.author.id;
    const proximoF = (reaction, user) => reaction.emoji.name === '▶️' && user.id === message.author.id;
    const inicioF = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
    const finF = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;
    const eliminarF = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;

    const atras = msg.createReactionCollector(atrasF, { time: 120000 });
    const proximo = msg.createReactionCollector(proximoF, { time: 120000 });
    const inicio = msg.createReactionCollector(inicioF, { time: 120000 });
    const fin = msg.createReactionCollector(finF, { time: 120000 });
    const eliminar = msg.createReactionCollector(eliminarF, { time: 120000 });

    atras.on("collect", async function (r) {
      if (pagina === 1) return await r.users.remove(user.id);
      pagina--;
      await msg.edit(paginas[pagina - 1])
      await r.users.remove(user.id);
    })

    proximo.on("collect", async function (r) {
      if (pagina === paginas.length) return await r.users.remove(user.id);
      pagina++;
      await msg.edit(paginas[pagina - 1])
      await r.users.remove(user.id);
    })

    inicio.on("collect", async function (r) {
      pagina = 1;
      await msg.edit(embed1)
      await r.users.remove(user.id);
    })
    fin.on("collect", async function (r) {
      pagina = categorias.length;
      await msg.edit(embed3)
      await r.users.remove(user.id);
    })

    eliminar.on("collect", async function (r) {
      await msg.delete().catch(() => null)
    })
  }
}
