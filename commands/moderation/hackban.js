const Discord = require("discord.js");

module.exports = {
  name: "hackban",
  aliases: ['hb'],
  description: 'Banea globalmente a alguien del servidor',
  
  async execute(zetacorp, message, args) {
      if (!message.member.hasPermission('ADMINISTRATOR')) { return message.channel.send("<a:warning:862700922436845599> | \`Necesitas el permiso de\` `ADMINISTRATOR`")}
      if (!message.guild.me.hasPermission("BAN_MEMBERS")) { return message.channel.send('<a:no:859383457125236736> | \`Necesito poder\` `BANEAR MIEMBROS` \`para usar este comando!\`')}

      const userID = args[0]
      let banareason = args.slice(1).join(" ")

      if (!userID) return message.channel.send("<a:warning:862700922436845599> | \`Dame la\` **ID del usuario**")

      if (!banareason) {
        banareason = "Sin razón"
      }
      
      let gsfd = message.guild.members.cache.get(userID)
      if (gsfd) return message.channel.send('<a:warning:862700922436845599> | `No puedes banear a alguien con el mismo poder de jerarquía o mayor`')

      if (isNaN(userID)) return message.channel.send("<a:warning:862700922436845599> | \`La ID que has proporcionado no son numeros\`")

      if (userID === message.author.id) return message.channel.send("<a:warning:862700922436845599> | \`No te puedes autobanear\`")

      if (userID === zetacorp.user.id) return message.channel.send("<a:warning:862700922436845599> | \`A mi no me puedes banear!\`")

      zetacorp.users.fetch(userID).then(async _user => { //aqui ya hay un fetch noice
        await message.guild.members.ban(_user.id, { banareason }) // 

        const hackbanembed = new Discord.MessageEmbed()
          .setTitle('Caso de hackban <a:banned:854873178803273728>')
          .setDescription(`Nombre: **${_user.username}**\nID: **<@${_user.id}>**\nModerador: **<@${message.author.id}>**\nRazón: ${banareason}`)
          .setFooter(zetacorp.user.username, zetacorp.user.displayAvatarURL()) //that should be okay now

        return message.channel.send(hackbanembed)

      }).catch(error => {

        return message.channel.send(`Un error ha ocurrido: **${error}**`)

      })

  }
}