module.exports = (globalVariables) => {
  Object.keys(globalVariables).map(variable => {
    global[variable] = globalVariables[variable];
  });

  async function event(message){

    if (message.author.bot) return;

    const swearWords = ["Fuck", "fuck"];
    if(swearWords.map(n => message.content.includes(n)).filter(n => n !== false)[0]){
      message.channel.send({embed: {
          color: 3447003,
          author: {
            name: message.author.username,
            icon_url: "https://cdn.discordapp.com/avatars/" + message.author.id + "/" + message.author.avatar + ".png"
        },
          title: "Insultron",
          description: "Un mot suceptible d'être innaproprié a été détecter, merci de choisir une action parmis les possibilitées suivante :\n \n \n \n \n \n",
            fields: [{
              name: "Pseudo :",
              value: `${message.author.username}`
            },
            {
              name: "ID :",
              value: `${message.author.id}`
            },
            {
              name: "Mention :",
              value: `<@${message.author.id}>`
            },
            {
              name: "Dans le salon :",
              value: `<#${message.channel.id}>`
            },
            {
              name: "ID du salon :",
              value: `${message.channel.id}`
            },
            {
              name: "Message suceptible d'être innaproprié :",
              value: `${message.content.substr(0)}`
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© BMO"
          }
      }
     }).then(function (message) {
      message.react("🛡️")
      message.react("🔇")
      message.react("⚔️")
      message.react("⛔")
      message.react("🗑️")

      const mod = ["🌟 Modo T'chat  🌟", "👑 Fondateurs 👑", "👑 Fondateur Principal 👑"];
      const collector = message.createReactionCollector((reaction, user) => 
      user.id !== message.author.bot &&
      reaction.emoji.name === "🛡️" ||
      reaction.emoji.name === "🔇" ||
      reaction.emoji.name === "⚔️" ||
      reaction.emoji.name === "⛔" ||
      reaction.emoji.name === "🗑️"
      ).once("collect", reaction => {
      const chosen = reaction.emoji.name;
        if(chosen === "🛡️"){
          const resultembed = new Discord.MessageEmbed()
          .setTitle('Insultron')
          .setColor('#00ff0d')
          .setDescription(`✅ Sanction "PM" appliqué par : <${reaction.author.id}> à`);

        message.edit(resultembed);
        message.reactions.removeAll().catch(error => console.error('Impossible de supprimer les réactions : ', error));
        } 
        else if(chosen === "🔇"){
          const resultembed = new Discord.MessageEmbed()
            .setTitle('Insultron')
            .setColor('#00ff0d')
            .setDescription(`✅ Sanction "Mute" appliqué par : <@${reaction.author.id}> (60m) à`)
            .setFooter('© BMO', client.user.avatarURL)
            .setTimestamp();

          message.edit(resultembed);
          message.reactions.removeAll().catch(error => console.error('Impossible de supprimer les réactions : ', error));
        }
        else if(chosen === "⚔️"){
          const resultembed = new Discord.MessageEmbed()
            .setTitle('Insultron')
            .setColor('#00ff0d')
            .setDescription(`✅ Sanction "Kick" appliqué par : <@${reaction.author.id}> à`)
            .setFooter('© BMO', client.user.avatarURL)
            .setTimestamp();

          message.edit(resultembed);
          message.reactions.removeAll().catch(error => console.error('Impossible de supprimer les réactions : ', error));
        }
        else if(chosen === "⛔"){
          const resultembed = new Discord.MessageEmbed()
          .setTitle('Insultron')
          .setColor('#00ff0d')
          .setDescription(`✅ Sanction "Ban" appliqué par : <@${reaction.author.id}> à`)
          .setFooter('© BMO', client.user.avatarURL)
          .setTimestamp();

        message.edit(resultembed);
        message.reactions.removeAll().catch(error => console.error('Impossible de supprimer les réactions : ', error));
        } else {
          const resultembed = new Discord.MessageEmbed()
            .setTitle('Insultron')
            .setColor('#ff0000')
            .setDescription(`🗑️ Sanction ignoré par : <@${reaction.author.id}>`)
            .setFooter('© BMO', client.user.avatarURL)
            .setTimestamp();

        message.edit(resultembed);
        message.reactions.removeAll().catch(error => console.error('Impossible de supprimer les réactions : ', error));
        }
        collector.stop();
      });
     })
    }

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    let commands = getFiles(__dirname+"/../commands").filter(f => f.endsWith(".js"));
   
    if (message.channel.type ==="dm" || message.channel.type==="group")
      return message.channel.send("Je ne suis pas fait pour fonctionner en DM/Groupes");

    for(let i=0; i<commands.length; i++){
      let command = require(commands[i])(globalVariables);
      for(let n=0; n<command.options.name.length; n++){
        if(message.content.toLowerCase().startsWith(prefix+command.options.name[n].toLowerCase()) && command.options.enable) return command(message, message.content.slice(prefix.length).trim().split(/ +/g));
      }
    }
  }

  event.listener = "message";

  return event;
}
