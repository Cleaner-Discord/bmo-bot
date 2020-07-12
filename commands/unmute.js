module.exports = (globalVariables) => {
    Object.keys(globalVariables).map(variable => {
      global[variable] = globalVariables[variable];
    });


async function command(message, args){
    if (!message.member.roles.cache.some(r => ["🐹 Modo T'chat Test 🐹", "🛡️ P'tit Modo 🛡️", "🌟 Modo T'chat  🌟", "👑 Fondateurs 👑", "👑 Fondateur Principal 👑"].includes(r.name))) 
                return message.channel.send(`Désolé <@` + message.author.id + `>, vous n'avez pas la permission nécessaire à l'utilistion  de cette commande.`);
        
            let tounmute = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
            
            if (!tounmute) 
                return message.channel.send("Merci de mentionner un utilisateur sous la forme suivante:\n\nMention : ``@user#1234``\nDiscord ID : ``251455597738721280``");

            if (tounmute.id === client.user.id) 
                return message.channel.send("Je ne peux pas m'auto sortir de prison !");
            
            if (tounmute.user.bot) 
                return message.channel.send("Impossible de sortir un bot de prison !");
            
            if (tounmute.id === message.author.id) 
                return message.channel.send("Vous ne pouvez pas exécuter cette commande sur vous-même");

            if (!tounmute.roles.cache.find(role => role.name === "🏝️ No Man's Land")) {
                return message.channel.send(`Cette utilisateur n'est pas en prison !`);
            }

            if (tounmute.roles.cache.some(r => ["🐹 Modo T'chat Test 🐹", "🛡️ P'tit Modo 🛡️", "🌟 Modo T'chat  🌟", "👑 Fondateurs 👑", "👑 Fondateur Principal 👑"].includes(r.name))) 
                return message.channel.send("Impossible d'exécuter cette commande sur un modérateur !");

            let muterole = message.guild.roles.cache.find(r => ["🏝️ No Man's Land"].includes(r.name));
                if (!muterole) {
                    message.channel.send("Aucun rôle \'\'🏝️ No Man's Land\'\', je ne peux donc pas éxécuter cette commande")
                }
            
            let reason = args.slice(3).join(' ');
            if (!reason) reason = "Tu as commis une infraction, un modérateur t'a donc envoyé(e) en prison";
                
                await (tounmute.roles.remove(muterole.id));
                client.users.cache.get(tounmute);

            tounmute.send(`${message.author.tag} t'as sortie de prison => ${reason}`)
            
            const logchan = message.guild.channels.cache.find(c => ["𝐦𝐨𝐝-𝐥𝐨𝐠𝐬"].includes(c.name))
                setTimeout(function() {
                if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logchan) {
                    message.guild.channels.create('𝐦𝐨𝐝-𝐥𝐨𝐠𝐬').catch(error => message.channel.send(`Une erreur s'est produite durant la création du salon \"𝐦𝐨𝐝-𝐥𝐨𝐠𝐬\" : \`\`${error}\`\``));
                }
            }, 2000);

            logchan.send({
                embed: {
                color: '#fc0703',
                author: {
                    name: tounmute.user.tag,
                    icon_url: "https://cdn.discordapp.com/avatars/" + tounmute.user.id + "/" + tounmute.user.avatar + ".png"
                },
                title: "Unmute",
                description: "Get Unjailed B*tch :D",
                thumbnail: {
                    url: "https://cdn.discordapp.com/avatars/" + message.author.id + "/" + message.author.avatar + ".png",
                },
                fields: [{
                    name: "Action",
                    value: `Unmute (Auto)`,
                    inline: false,
                }, {
                    name: "Nom d'utilisateur",
                    value: `${tounmute.user.tag}`,
                    inline: false,
                }, {
                    name: "ID",
                    value: `${tounmute.user.id}`,
                    inline: false,
                }, {
                    name: "Unmute par",
                    value: `${message.author.tag}`,
                    inline: false,
                }, {
                    name: "ID du Modérateur",
                    value: `${message.author.id}`,
                    inline: false,
                }, {
                    name: "Raison",
                    value: `${reason}`,
                    inline: false,
                }],
                timestamp: new Date(),
                footer: {
                    icon_url: client.avatarURL,
                    text: "© BMO"
                }
                }
            });
}

    command.options = {
          name: ["unmute"],
          enable: true
    };
      
    return command;
}
      