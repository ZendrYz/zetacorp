const Discord = require('discord.js')
const db = require('megadb')
const antijoins = new db.crearDB('antijoins', 'data_guilds')
const antibots = new db.crearDB('antibots', 'data_guilds');

module.exports = async (zetacorp, member) => {
  const welcomechannel = member.guild.channels.cache.get(`894239025370648608`)
  if (welcomechannel == null) return;
  const welcomeembed = new Discord.MessageEmbed()
    .setTitle(member.guild.name)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setDescription(`Bienvenido <@${member.user.id}> , disfruta de tu estancia!\n\n$ • Recuerda leerte las <#894239025370648610>!`)
    .setTimestamp()
    .setImage(member.guild.iconURL())
    .setFooter(`Con amor, desde el staff de ZetaCorp`)
  welcomechannel.send(welcomeembed)
  member.roles.add('894239024829591585')

  if (antibots.tiene(member.guild.id)) {
    if (member.user.bot) {
      member.guild.member(member).kick("Antibots activado").then(() => {
        console.log('Bot expulsado en ' + member.guild.name + ', expulsar bots.');
        const id = member.guild.owner.user.id
        id.send(new Discord.MessageEmbed().setTitle("Antibots activado").setDescription('He expulsado al usuario <@' + member.user.id + "> debido a que el sistema antibots está activado en el servidor **" + member.guild.name + "**").setThumbnail(member.user.displayAvatarURL()))
      })
    }
  }

  if (antijoins.tiene(member.guild.id)) {
    member.guild.member(member).kick('Antijoins activado');
    const id = member.guild.owner.user.id
    id.send(new Discord.MessageEmbed().setTitle("Antijoins activado").setDescription('He expulsado al usuario <@' + member.user.id + "> debido a que el sistema antijoins está activado en el servidor **" + member.guild.name + "**").setThumbnail(member.user.displayAvatarURL()))
    console.log('Bot expulsado en ' + member.guild.name + ', expulsar bots.');
  }
}