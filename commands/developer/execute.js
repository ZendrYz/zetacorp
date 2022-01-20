const process = require('child_process');

module.exports = {
    name: 'execute',
    aliases: ['exec'],

    async execute(zetacorp, message, args) {

        const solo = ['477137760616972339', '477851232879378441']
        if (!solo.includes(message.author.id)) return message.channel.send('<a:no:859383457125236736> | `Este comando solo lo pueden usar los desarrolladores!`');


        process.exec(args.join(" "), (error, stdout) => {
            let result = (stdout || error)

            message.channel.send(result, { code: "sh", split: '\n' })
        })
    }
}
