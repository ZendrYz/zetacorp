const Discord = require('discord.js')

module.exports = {
  name: 'restart',

  async execute(zetacorp, message, args) {
    const soloa = ['477137760616972339', '477851232879378441']
    if (!soloa.includes(message.author.id)) return message.channel.send('<a:no:859383457125236736> | `Este comando solo lo pueden usar los desarrolladores!`');
    const em = new Discord.MessageEmbed()
      .setDescription('<a:online:859383439651897374> | Sistema reiniciandose correctamente')

    message.channel.send(em)
    setTimeout(async () => {
      await process.exit().catch(e => { message.channel.send(e) })
    }, 1000)
  }
}