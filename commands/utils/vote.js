const Discord = require('discord.js')

module.exports = {
    name: 'vote',
    aliases: ['votar'],
    description: 'Votame!',
    
    async execute(zetacorp, message, args) {
        const voteembed = new Discord.MessageEmbed()
    .setTitle('Puedes votarme directamente en estos enlaces')
    .setDescription('<:topgg:868480355752087622> [TopGG](https://top.gg/bot/854509294892089344)\n\n<:aura:868507237600079892> [AuraList](https://auralist.ml/bots/854509294892089344/vote)\n\n<a:neobotlist:859383427509125120> [NeoBotList](https://neolist.glitch.me/bots/like/854509294892089344)\n\n:cookie: [CookyList](https://cooky-list.glitch.me/bots/854509294892089344)\n\n<:mybot:876110216024948736> [MyBot Team](https://portalmybot.com/mybotlist/bot/854509294892089344)')
  
      message.channel.send(voteembed);
    }
}