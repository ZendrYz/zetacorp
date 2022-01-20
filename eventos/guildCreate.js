const Discord = require('discord.js')
const db = require('megadb')
const raiddetect = new db.crearDB('raiddetect', 'data_guilds');

module.exports = async (zetacorp, guild) => {
    raiddetect.establecer(guild.id, 'Detectar Raid')
    const embed = new Discord.MessageEmbed()
        .setThumbnail(guild.iconURL())
        .setTitle("Nuevo Servidor.")
        .addField("Servidor", `${guild.name} (${guild.id})`)
        .addField("Region", guild.region)
        .addField("Roles", guild.roles.cache.size)
        .addField("Miembros", guild.memberCount)
        .addField("Dueño", `${guild.owner.user.tag} | (${guild.owner.user.id})`, true)
        .setTimestamp()
        .setColor('5c4fff')
        .setFooter(guild.name, guild.iconURL());

    zetacorp.channels.cache.get('898242663608877102').send(embed)
}