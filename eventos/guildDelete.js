const Discord = require('discord.js')

module.exports = async (zetacorp, guild) => {
const embed = new Discord.MessageEmbed()
    .setThumbnail(guild.iconURL())
    .setTitle("Me Han Expulsado de Un Servidor.")
    .addField("Servidor", `${guild.name} (${guild.id})`)
    .addField("Region", guild.region)
    .addField("Roles", guild.roles.cache.size)
    .addField("Miembros", guild.memberCount)
    .addField("Dueño", `${guild.owner.user.tag} | (${guild.owner.user.id})`,true)
    .setTimestamp()
    .setColor('5c4fff')
    .setFooter(guild.name, guild.iconURL());

  zetacorp.channels.cache.get('898242663608877102').send(embed)
}