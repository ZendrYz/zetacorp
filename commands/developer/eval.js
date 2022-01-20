module.exports = {
  name: 'eval',
  aliases: ['e'],

  async execute(zetacorp, message, args) {
    const solo = ['477137760616972339', '477851232879378441']
    if (!solo.includes(message.author.id)) return message.channel.send('<a:no:859383457125236736> | `Este comando solo lo pueden usar los desarrolladores!`');

    const comandoa = args.join(" ");
    if (!comandoa) return message.channel.send("<a:warning:862700922436845599>  | `Necesitas escribir un comando!`")

    try {
      let words = ["token", "destroy"]
      if (words.some(word => message.content.toLowerCase().includes(word))) {
        return message.channel.send("<a:warning:862700922436845599> | `Esas palabras están prohibidas!`")
      }
    } catch (e) { console.log(e) }
    try {
      let time = Date.now()
      let res = require('util').inspect(await eval(comandoa, { depth: 0 }));
      let time2 = Date.now()
      if (res.length > 1000) {
        let src = await require('sourcebin').create([{ content: res, language: 'javascript' }], { title: 'Eval - ZetaCorp', description: args.join(' ') })
        return message.channel.send(`\`\`\`yaml\n${Date.now() - message.createdTimestamp} ms | ${typeof (res)}\`\`\``) && message.channel.send(`${src.url}`)
      }
      return message.channel.send(`\`\`\`yaml\n${Date.now() - message.createdTimestamp} ms | ${typeof (res)}\`\`\``) && message.channel.send(`\`\`\`js\n${res}\`\`\``)
    } catch (e) {
      return message.channel.send(`\`\`\`js\n${e}\`\`\``).catch(console.log)
    }
  }
}