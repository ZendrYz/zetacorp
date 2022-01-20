const Discord = require('discord.js');
const db = require('megadb')
const automoderator = new db.crearDB('automoderator', 'moderador_automatico');
const antienlaces = new db.crearDB('antienlaces', 'data_guilds')
const warns = new db.crearDB('warns')
const blacklistdb = new db.crearDB('blacklists')
const aantiflood = new db.crearDB('antiflood', 'data_guilds')
const antigrabbers = new db.crearDB('antigrabbers', 'data_guilds')

module.exports = async (zetacorp, message) => {

    if (!message.guild) return

    const prefixes = new db.crearDB('prefixes', 'data_guilds')

    let prefix;

    if (prefixes.tiene(message.guild.id)) {
        prefix = await prefixes.obtener(message.guild.id)
    } else {
        prefix = "!"
    }

    if (message.author.bot) return;

    if (message.content == prefix) return;

    if (message.content.match(new RegExp(`^<@!?${zetacorp.user.id}>( |)$`))) {
        const gsd = new Discord.MessageEmbed()
            .setTitle(message.author.username + ', te doy la bienvenida a mi portal')
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription('<:dot:885632414746026025> `Mi prefix en este servidor es` `' + prefix + '`\n\n<:dot:885632414746026025> `Para ver mi lista de comandos, usa` `' + prefix + 'cmds`\n\n<:dot:885632414746026025> `Si quieres reportar algún error, puedes unirte a mi` [comunidad](https://discord.gg/qejzJzJNpE) `y abrir un tiquet`\n\n<a:libro:876403809524543509>  `Disfruta usando mis comandos`')
        message.channel.send(gsd)
    }

    const persona = message.mentions.members.first() || message.member;

    function deleteMessage() {
        message.delete()
        message.member.kick("Enviar token grabber")
        message.channel.send(new Discord.MessageEmbed().setTitle('Link malicioso <a:zc_warning:894242089406177291>').setDescription(`El usuario ${message.author.tag} \`( ${message.author.id} )\` ha enviado un link malicioso, y el sujeto ha sido expulsado por seguridad.`).setColor('YELLOW').setTimestamp().setThumbnail(message.author.displayAvatarURL({ dynamic: true })))
    }

    const links = [
        "2no.co",
        "blasze.com",
        "blasze.tk",
        "gotyouripboi.com",
        "iplogger.com",
        "iplogger.org",
        "iplogger.ru",
        "ps3cfw.com",
        "yip.su",
        "bmwforum.co",
        "bucks.as",
        "cyberh1.xyz",
        "discörd.com",
        "disçordapp.com",
        "fortnight.space",
        "fortnitechat.site",
        "freegiftcards.co",
        "grabify.link",
        "joinmy.site",
        "leancoding.co",
        "minecräft.com",
        "quickmessage.us",
        "särahah.eu",
        "särahah.pl",
        "shört.co",
        "spötify.com",
        "spottyfly.com",
        "starbucks.bio",
        "starbucksisbadforyou.com",
        "starbucksiswrong.com",
        "stopify.co",
        "xda-developers.us",
        "youshouldclick.us",
        "yoütu.be",
        "yoütübe.co",
        "yoütübe.com",
        "youtubeshort.watch",
        "adblade.com",
        "adcash.com",
        "adcell.de",
        "adexchangecloud.com",
        "adf.ly",
        "adfoc.us",
        "adforce.com",
        "bc.vc",
        "bitl.cc",
        "btcclicks.com",
        "ceesty.com",
        "cur.lv",
        "fastclick.com",
        "getcryptotab.com",
        "gmads.net",
        "l2s.pet",
        "linkbucks.com",
        "linkshrink.net",
        "miniurl.pw",
        "nitroclicks.com",
        "ouo.io",
        "pay-ads.com",
        "petty.link",
        "pnd.tl",
        "restorecosm.bid",
        "sh.st",
        "short.es",
        "shorte.st",
        "shrtz.me",
        "udmoney.club",
        "uii.io",
        "ur-l.me",
        "vivads.net",
        "xponsor.com",
        "zeusclicks.com",
        "zipansion.com",
        "black-friday.ga",
        "boost.ink",
        "easycommerce.cf",
        "featu.re",
        "free.gg",
        "justdoit.cards",
        "makeprogress.ga",
        "pointsprizes.com",
        "referralpay.co",
        "selly.gg",
        "shoppy.gg",
        "weeklyjob.online",
        "wn.nr",
        "nakedphotos.club",
        "privatepage.vip",
        "viewc.site",
        "baymack.com",
        "btconline.io",
        "btcpool.io",
        "freebitco.in",
        "minero.cc",
        "outbuck.com",
        "alex-nv.ru",
        "alexandrnav.ru",
        "alexandrs1.ru",
        "amazingsexdating.com",
        "clooud9.xyz",
        "cloud9team.fun",
        "cloud9team.space",
        "cloudteam9.com",
        "cloudteam9.fun",
        "cs-moneiy.us",
        "csgocyber.ru",
        "csgocyber.ru",
        "easter-event.com",
        "ezence.ink",
        "ezrobux.gg",
        "fnaticprize.site",
        "fnaticwin.xyz",
        "fortnite.cards",
        "fortnite.events",
        "fortnite-christmas.com",
        "fortnite-gifts.com",
        "fortnite-giveaway.com",
        "fortnite-special.com",
        "fortnite-vbuck.com",
        "fortnite-vbucks.de",
        "fortnite-vbucks.net",
        "fortnite.cards",
        "fortnite.events",
        "fortnitevb.com",
        "free-gg.com",
        "free-steam-code.com",
        "gams-toph.xyz",
        "giveawaybot.pw",
        "intimki.com",
        "katowice.ru",
        "keymagic.me",
        "libra-sale.io",
        "lootweapons.com",
        "magicstreek.me",
        "myetherermwallet.com",
        "natus-vincerygivez.xyz",
        "navi.auction",
        "new-give.com",
        "nv-box.com",
        "nv-drop.com",
        "operation-broken.xyz",
        "oprewards.com",
        "rbxfree.com",
        "roblox-christmas.com",
        "robloxsummer.com",
        "rocketcase.xyz",
        "roll-case.com",
        "rollskin.ru",
        "rustgift.ru",
        "seamcommunlty.com",
        "seamcommunty.com",
        "sleamcomnnunity.me",
        "sleamconnunnity.me",
        "sleamcormunity.me",
        "sreancommuniity.com",
        "staemcommeuneuity.ru",
        "staerncomrmunity.com",
        "steaamcomnnunity.com",
        "steaimeecommuniity.com",
        "steam-event.com",
        "steam-gift-codes.com",
        "steam-money.org",
        "steam-promo-page.ml",
        "steam-wallet-rewards.com",
        "steamcannunlty.com",
        "steamcommanitty.ru",
        "steamcomminiity.site",
        "steamcommnnunnity.world",
        "steamcommnunty.com",
        "steamcommunity-com.xyz",
        "steamcommunniitly.ru",
        "steamcommunyru.com",
        "steamcommunyti.ru",
        "steamcommunytu.ru",
        "steamcomnuniity.ru",
        "steamcomrnuniuty.com",
        "steamcomrrnunity.com",
        "steamcomunity.ru",
        "steamconnunjty.com",
        "steamcornmuniti.xyz",
        "steammcomunity.ru",
        "steamncomnmunity.com",
        "steamprofiles.site",
        "steampromote.com",
        "steamquests.com",
        "steamreward.com",
        "steamspecial.com",
        "steamsummer.com",
        "steamtradeoffer.ml",
        "steancommuinity.me",
        "steancommutitly.ru",
        "steancomunnity.com",
        "steancomunnity.ru",
        "steancoommunlty.ru",
        "steanncomunitly.com",
        "steannconnnnunity.com",
        "stearmcommunitty.ru",
        "stearmcommunity.ru",
        "stearmcommunnitty.ru",
        "stearmcommunnity.ru",
        "steemcommunnity.ru",
        "stermccommunitty.ru",
        "stermcommuniity.com",
        "sterrmccommunity.ru",
        "stleamconnunlty-tyztradeoffernewpartnhr15902271.xyz",
        "streamcommuniuity.com",
        "streamcommunnitly.com",
        "streamcomnunely.com",
        "streancommunitiy.icu",
        "streancommunuty.ru",
        "strearmcomunity.ru",
        "steamconmunity.co",
        "steancommunity.com",
        "steancommunytiu.ru",
        "toom-skins.xyz",
        "topr-games.xyz",
        "topw-gamez.xyz",
        "topz-games.xyz",
        "trade-offers.me",
        "whatsappx.com",
        "wild-day.com",
        "winfnatic.pro",
        "wowcloud9.com",
        "wowfnatic.com",
        "wowfnatic.site",
        "getlibra.tech",
        "ngrok",
        "stearncommuty.com",
        "discord-gifts.me",
        "giftdiscord.site",
        "steamcommunityz.com",
        "eonxcrypto.com",
        "steamcomminutiu.ru",
        "steamcomminytiu.ru",
        "steamncommunitu.co",
        "steamcomrnunity.ru",
        "stearmmcomunitty.ru",
        "dicsord.space",
        "steamcommunlilty.com",
        "discord.wales",
        "discord-gift.co",
        "steamcomnunnirty.ru",
        "stearmmcomunity.ru",
        "steamcomrnunitiy.com",
        "dlscord.online",
        "rocket-way.com",
        "steamcommunlilty.com",
        "linkdeej.com",
        "dlscord.press",
        "leech.is",
        "discordgivenitro.com",
        "steancomnunytu.ru",
        "discrodnitro.org",
        "steamcommytiny.com",
        "steamcommnunylti.com",
        "steamcommunityu.ru",
        "stieamcommuunitey.us",
        "steamcommunity.link",
        "stermmcomuniity.ru",
        "bit.do",
        "steamcommutyniu.com",
        "dlscord.work",
        "glft-discord.com",
        "steamcommunitiyu.com",
        "discorcl.link",
        "discorcl.art",
        "keydropcs.ru",
        "steamcommunutiy.com",
        "steamcomrninuty.link",
        "steamgivenitro.com",
        "stermcomunniity.ru",
        "steamcomnumily.com",
        "nitro-airdrop.org",
        "dicord.gift",
        "discord-nitro.su",
        "steamcommmunilty.com",
        "free-nitlross.ru",
        "diskord.ru.com",
        "discord-nitro.link",
        "steamconmumnity.com",
        "steancommunity.link",
        "freenitros.ru",
        "discordnltro.com",
        "discorb.ru.com",
        "discorcl.click",
        "discordgift.ru.com",
        "discordglft.ru",
        "discodnitro.info",
        "dlscordgift.com",
        "steamcomminuty.com",
        "discord-airdrop.com",
        "dlscord-app.com",
        "discord-app.ru.com",
        "dlscord-nitro.click",
        "steamdiscord.com",
        "dicsordgift.com",
        "discrodapp.ru",
        "discord-give.com"
    ]

    async function antiflood(mensajes, tiempo, action, event) {
        try {
            event = message;
            const msgs = new db.crearDB('intelligentAntiflood', 'antiraid');
            if (!msgs.tiene(event.author.id)) {
                msgs.establecer(event.author.id, 0);
            }
            msgs.sumar(event.author.id, 1);
            let amount = await msgs.obtener(event.author.id);
            if (amount >= mensajes) {
                if (action.toLowerCase() == 'kick') {
                    msgs.eliminar(event.author.id);
                    event.guild.member(event.author).kick('Antiflood activado.');
                    event.channel.send(`<@${event.author.id}> ha sido expulsado for hacer flood`);
                } else if (action.toLowerCase() == 'ban') {
                    msgs.eliminar(event.author.id);
                    event.guild.member(event.author).ban({ reason: 'Antiflood activado.' });
                    event.channel.send(`<@${event.author.id}> ha sido baneado por hacer flood`);
                }
            }
            setTimeout(() => {
                msgs.eliminar(event.author.id);
            }, tiempo);
        } catch (e) {
            console.error(e)
        }
    }

    if (antigrabbers.tiene(message.guild.id)) {
        if (links.some(word => message.content.toLowerCase().includes(word))) {
            deleteMessage()
        }
    }

    if (antienlaces.tiene(message.author.id)) {
        if (message.content.startsWith(`https` || `discord.gg/`)) {
            if (message.member.hasPermission(`ADMINISTRATOR`)) {
                return;
            } else {
                const Embed = new Discord.MessageEmbed()
                    .setColor(`#00FF00`)
                    .setDescription('<a:prohibido:856505798459654194> | Está prohibido enviar enlaces en este servidor!')
                message.channel.send(Embed);
                message.delete()
                warns.sumar(`${message.guild.id}.${persona.id}`, 1)
            }
        }
    }

    if (!message.content.startsWith(prefix)) return

    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    const command = args.shift().toLowerCase();

    let accion = args[0]

    const id = args[0]

    const warnings = await warns.obtener(`${message.guild.id}.${message.author.id}`)

    if (warnings === 5) {

        const data = await automoderator.obtener(message.guild.id)

        if (data == 'kick') {

            persona.user.kick('Muchos warns')

            const kickeadoembed = new Discord.MessageEmbed()
                .setTitle('Usuario kickeado!')
                .setDescription(`<@${persona.id}> fue autokickeado por tener más de 5 warns.`)

            const parakickeado = new Discord.MessageEmbed()
                .setTitle('Fuiste kickeado!')
                .setDescription(`Fuiste kickeado de ${message.guild.name} por tener más de 5 warns. Ten más cuidado la próxima vez!`)

            const logs = await db_logs.obtener(`logs_` + message.guild.id)
            if (logs == null) {
                const datas = message.guild.channels.cache.random()
               //console.log(datas.id)
                if (datas.for(message.guild.me).hasPermission('VIEW_CHANNEL' && 'SEND_MESSAGES')) {
                    zetacorp.channels.cache.get(datas.id).send(kickeadoembed)
                }
            }
            persona.send(parakickeado)

        }
    } else {
        if (warnings === 10) {

            const dato = await automoderator.obtener(message.guild.id)

            if (dato == 'ban') {

                message.member.user.ban('Muchos warns')

                const baneadoembed = new Discord.MessageEmbed()
                    .setTitle('Usuario baneado!')
                    .setDescription(`<@${persona.id}> fue autobaneado por tener más de 10 warns.`)

                const parabaneado = new Discord.MessageEmbed()
                    .setTitle('Fuiste baneado!')
                    .setDescription(`Fuiste baneado de ${message.guild.name} por tener más de 10 warns. Ten más cuidado la próxima vez!`)

                const logs = await db_logs.obtener(`logs_` + oldMessage.guild.id)
                if (logs == null) return;

                zetacorp.channels.cache.get(logs).send(baneadoembed)
                persona.send(parabaneado)

            }
        }
    }

    let cmd = zetacorp.commands.get(command) || zetacorp.commands.find(c => c.aliases && c.aliases.includes(command));
    if (cmd) {
        if (blacklistdb.tiene(message.author.id)) {
            let razon = await blacklistdb.obtener(message.author.id)
            return message.channel.send('<a:no:859383457125236736> | `No puedes usar este comando ya que estás en la blacklist por` **' + razon + "**")
        } else {
            cmd.execute(zetacorp, message, args)
            zetacorp.channels.resolve('900390437955723304').send(`${message.author.tag} (${message.author.id}) usó el comando: ${command}`)
        }
    } else {
        const nocmd = new Discord.MessageEmbed()
            .setTitle('Ese comando no existe')
            .setDescription('Prueba a usar `c\'cmds` para ver los comandos disponibles')
        message.channel.send(nocmd)
    }
    if (aantiflood.tiene(message.guild.id)) {
        antiflood(6, 5000, 'ban', message)
    }
}

