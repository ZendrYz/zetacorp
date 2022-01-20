const Discord = require("discord.js")

module.exports = {
    name: "rcmd",
    aliases: ["reloadcmd", "reloadcommand", "resetcommand", "rcommand", "rel"],
    async execute(zetacorp, message, args) {

        const soloa = ['477851232879378441', '477137760616972339']
        if (!soloa.includes(message.author.id)) return message.channel.send('<a:no:859383457125236736> | `Necesitas ser desarrollador del bot`')

        let commandCategory = args[1]
        let commandName = args[0];
        if (!args[0]) return message.channel.send("<a:no:859383457125236736> | `Escribe el nombre del cmd a reiniciar`");
        if (!args[1]) {
            if (!zetacorp.commands.has(commandName)) {
                return message.channel.send("<a:no:859383457125236736> | `Ese comando no existe`");
            }
            try {
                require(`../${commandName}.js`)
            } catch (error) {
                message.channel.send("<a:no:859383457125236736> | `Ese comando no existe en esa carpeta`")
                return
            }

            try {
                delete require.cache[require.resolve(`../${commandName}.js`)];

                zetacorp.commands.delete(commandName);
                let fileContents = require(`../${commandName}.js`);
                zetacorp.commands.set(commandName, fileContents);

                message.channel.send("<a:tick:859383424867237898> | `" + commandName + ".js se ha reiniciado con exito`")

            } catch (error) {

                message.channel.send("<a:error:859383436087263242> | `Ocurrió error al reinicar el comando`");
                let embed2 = new Discord.MessageEmbed()
                    .setTitle("Error")
                    .setColor("RANDOM")
                    .setDescription(error);
                message.channel.send(embed2)
            }
            return
        }


        if (!zetacorp.commands.has(commandName)) {
            return message.channel.send("<a:no:859383457125236736> | `Ese comando no existe`");
        }
        try {
            delete require.cache[require.resolve(`../${commandCategory}/${commandName}.js`)];

            zetacorp.commands.delete(commandName);
            let fileContents = require(`../${commandCategory}/${commandName}.js`);
            zetacorp.commands.set(commandName, fileContents);

            message.channel.send("<a:tick:859383424867237898> | `" + commandCategory + "/" + commandName + ".js se ha reiniciado con exito`")

        } catch (error) {

            message.channel.send("<a:error:859383436087263242> | `Ocurrió error al reinicar el comando`");
            let embed2 = new Discord.MessageEmbed()
                .setTitle("Error")
                .setColor("RANDOM")
                .setDescription(error);
            message.channel.send(embed2)
        }
    }
}