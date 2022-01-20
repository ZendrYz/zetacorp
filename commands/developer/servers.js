const Discord = require('discord.js')

module.exports = {
  name: 'servers',
  alias: ['guilds'],

  async execute(zetacorp, message, args) {
    const soloa = ['477137760616972339', '477851232879378441']
    if (!soloa.includes(message.author.id)) return message.channel.send('<a:no:859383457125236736> | `Este comando solo lo pueden usar los desarrolladores!`');

    const guilds = zetacorp.guilds.cache.map(g => g.name).join('\n')

    const embed = new Discord.MessageEmbed()
      .setDescription(guilds)

    message.channel.send(embed)
  }
}