const Discord = require('discord.js')
const db = require('megadb')
const db_logs = new db.crearDB('logs'), raiddetect = new db.crearDB('raiddetect', 'data_guilds')


module.exports = async (zetacorp, channel) => {
  if (channel.type === 'dm') return;

  async function antiraid(userType, tiempo, amount, event) {
    try {
      event = channel;

      const raiddetectt = new db.crearDB('raiddetect', 'antiraid');
      if (!raiddetectt.tiene(event.guild.id)) {
        raiddetectt.establecer(event.guild.id, 0);
      }
      if (raiddetectt.tiene(event.guild.id)) {
        const raid = await raiddetectt.obtener(event.guild.id);
        if (raid >= amount) {
          event.guild.fetchAuditLogs({ type: 'CHANNEL_DELETE'}).then(logs => {
            let persona = logs.entries.first().executor;

            if (userType.toLowerCase() == 'all') {
              event.guild.member(persona).ban({ reason: "Raid." });
            }
          });
        } else {
          raiddetectt.sumar(event.guild.id, 1);
        }
        setTimeout(() => {
          raiddetectt.establecer(event.guild.id, 0);
        }, tiempo);
      }
    } catch (e) {
      cError(e);
    }
  }
  if (raiddetect.tiene(channel.guild.id)) {
    antiraid("ALL", 5000, 4, channel)
  }
  const logs = await db_logs.obtener('logs_' + channel.guild.id)

  if (!logs) return;

  const delechannelembed = new Discord.MessageEmbed()
    .setTitle('<:channel:909180319075295252> | Se borró un canal!')
    .setDescription("<:zc_entrada:894242089200676864> | Se borró un canal llamado `" + channel.name + "`")

    zetacorp.channels.cache.get(logs).send(delechannelembed)

}