const Discord = require('discord.js')
const descp = 'BOT STATS';
const package = require('../package.json')
const versionStatus = 'Estable.';
module.exports = (zetacorp) => {
  console.log('Todos los archivos funcionan a la perfección. Estoy listo!')
  const arrayOfStatus = [
    `${zetacorp.guilds.cache.size} servidores`,
    'c\'cmds',
    "c'vote 💖",
    "c'bot"
  ];
  let index = 0;
  setInterval(() => {
    if (index === arrayOfStatus.length) index = 0
    const status = arrayOfStatus[index];
    zetacorp.user.setActivity(status, { type: 'WATCHING' }).catch(console.error)
    index++;
  }, 10000)
  zetacorp.channels.cache.get('905848570790428682').bulkDelete(100)
  zetacorp.channels.cache.get('905848570790428682').send('<a:online:859383439651897374> | `' + descp + '`\n\n> `' + package.version + ' [' + versionStatus + ']`\n> Cambios realizados el `' + dato.getDate() + '/' + data + '/' + dato.getFullYear() + '` a las `' + dato.getHours() + ':' + dato.getMinutes() + ':' + dato.getSeconds() + '`');
}