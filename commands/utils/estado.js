const Discord = require('discord.js')
const db = require('megadb')
const antienlaces = new db.crearDB('antienlaces', 'data_guilds')
const db_logs = new db.crearDB('logs')

module.exports = {
  name: 'estado',
  aliases: ['status'],
  description: 'Mira el estado de tu servidor',

  async execute(zetacorp, message, args) {
    const prefixes = new db.crearDB('prefixes', 'data_guilds')

    const regiones = {
      'brazil': ':flag_br: Brasil',
      'europe': '<:europe:879671252191703130> Europa',
      'hongkong': '<:asia:882972582226296882> Hong Kong',
      'india': '<:asia:882972582226296882> India',
      'japan': '🗾 Japón',
      'russia': '<:europe:879671252191703130> Russia',
      'singapore': '<:asia:882972582226296882> Singapore',
      'southafrica': '<:africa:879995633627459604> Africa',
      'sydeny': '<:oceania:879995633665191986> Sydeny',
      'us-central': '<:america:882972582175977472> US Central',
      'us-east': '<:america:882972582175977472> US East',
      'us-west': '<:america:882972582175977472> US West',
      'us-south': '<:america:882972582175977472> US South'
    }

    let prefix;

    if (prefixes.tiene(message.guild.id)) {
      prefix = await prefixes.obtener(message.guild.id)
    } else {
      prefix = "c'"
    }

    message.channel.send('<a:loading:859383455765757962> | `Recopilando los datos del servidor.`').then(msg => {
      setTimeout(() => {

        const moderator = new db.crearDB('automoderator', 'moderador_automatico');

        let p = '';

        if (moderator.tiene(message.guild.id)) { p = '`👮 | Moderando Servidor`' } else { p = '`👮 | Sin Moderar el Servidor`' }

        const embed = new Discord.MessageEmbed()
          .setDescription(`Estado del server \`${message.guild.name}\`\nPrefix: \`${prefix}\` | ${p}\n> **Miembros actuales:** ${message.guild.memberCount}\n> **Cantidad de Roles:** ${message.guild.roles.cache.size}\n> **Region:** ${regiones[message.guild.region]}`)
          .setFooter(`${message.guild.name}, ${message.guild.id}`, message.guild.iconURL())

        const antichannels = new db.crearDB('antichannels', 'data_guilds');
        if (antichannels.tiene(message.guild.id)) { embed.addField('<:staff:859383432340832256> | Anti Canales', '<:on:876110216066904074>', true) } else { embed.addField('<:staff:859383432340832256> | Anti Canales', '<:off:876110216016560148>', true) }

        const antispam = antienlaces.obtener(message.guild.id)
        if (antispam) { embed.addField('<a:prohibido:859383437961723904> | Antispam', '<:on:876110216066904074>', true) } else { embed.addField('<a:prohibido:859383437961723904> | Antispam', '<:off:876110216016560148>', true) }

        const antiraid = new db.crearDB('raiddetect', 'data_guilds')
        if (antiraid.tiene(message.guild.id)) { embed.addField('<a:ruedas:859383437164937235> | Antiraid', '<:on:876110216066904074>', true) } else { embed.addField('<a:ruedas:859383437164937235> | Antiraid', '<:off:876110216016560148>', true) }

        const antibots = new db.crearDB('antibots', 'data_guilds')
        if (antibots.tiene(message.guild.id)) { embed.addField('<:bot:859383453330046986> | Antibots', '<:zc_on:894242088546357299>', true) } else { embed.addField('<:bot:859383453330046986> | Antibots', '<:zc_off:894242088445681675>', true) }

        const antiflood = new db.crearDB('antiflood', 'data_guilds')
        if (antiflood.tiene(message.guild.id)) { embed.addField('<:zc_msg:909179671495716864> | Antiflood', '<:zc_on:894242088546357299>', true) } else { embed.addField('<:zc_msg:909179671495716864> | Antiflood', '<:zc_off:894242088445681675>', true) }

        const antilinks = new db.crearDB('antienlaces', 'data_guilds')
        if (antilinks.tiene(message.guild.id)) { embed.addField('🔗 | Antilinks', '<:zc_on:894242088546357299>', true) } else { embed.addField('🔗 | Antilinks', '<:zc_off:894242088445681675>', true) }

        const antigrabbers = new db.crearDB('antigrabbers', 'data_guilds')
        if (antigrabbers.tiene(message.guild.id)) { embed.addField('<a:prohibido:859383437961723904> | Antigrabbers', '<:on:876110216066904074>', true) } else { embed.addField('<a:prohibido:859383437961723904> | Antigrabbers', '<:off:876110216016560148>', true) }

        const antijoins = new db.crearDB('antijoins', 'data_guilds');
        if (antijoins.tiene(message.guild.id)) { embed.addField('<a:police:859383443783024660> | Expulsar Miembros', '<:on:876110216066904074>', true) } else { embed.addField('<a:police:859383443783024660> | Expulsar Miembros', '<:off:876110216016560148>', true) }

        const logs = db_logs.obtener(message.guild.id)
        if (logs) { embed.addField('<a:ruedas:859383437164937235> | Registro', '<:on:876110216066904074>', true) } else { embed.addField('<a:ruedas:859383437164937235> | Registro', '<:off:876110216016560148>', true) }

        embed.setColor('YELLOW');
        msg.delete();
        message.channel.send(embed);
      }, 2000);
    });
  }
}