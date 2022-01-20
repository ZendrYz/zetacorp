const Discord = require('discord.js')

module.exports = {
  name: 'sos',
  aliases: ['alarma'],
  description: 'Envia una señal de alarma al equipo ZetaCorp',

  async execute(zetacorp, message, args) {

    let ca = zetacorp.channels.cache.get("894325608581070909" && "898242663608877105");

    if (!message.guild.me.permissions.has("CREATE_INSTANT_INVITE")) return message.channel.send("<a:No:810974861521584188> | `No pude crear la invitación`");

    if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send("<a:No:810974861521584188> | `Necesitas el permiso` `MANAGE_MESSAGES` `para lanzar un sos`");

    message.channel.createInvite({ maxAge: 0, maxUses: 10 }).then(ya => {

      const elx2 = new Discord.MessageEmbed()
        .setTitle("ZetaCorp - Staff")
        .setDescription("Enviado!")
        .setColor("PURPLE")
      message.channel.send("<@" + message.author.id + ">", elx2)

      ca.send(`@everyone`);
      ca.send(`${ya}`)

    });


  }

}
