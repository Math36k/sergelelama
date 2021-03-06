const Discord = require('discord.js');
const bot = new Discord.Client();

var prefix = ('*')

bot.on('ready', function(){
	bot.user.setGame("J'te baise petite bite");
	console.log('Connecté');
});

bot.login('DE1NTU1NTQyNjUyNjgyMjYw.DW3n9Q.L7AvdoKs5urmXeSlF8jU_VnQBlQ');

bot.on('message', message => {
	if(message.content === prefix + "help"){
		message.channel.sendMessage("Liste des commandes: \n -*help");
	}
	if(message.content === 'Salut'){
    if(message.member.roles === "Administrator"){
    message.reply('Bien le bonjour frero. :ok_hand: ');
    }else{
		message.reply('Bien le bonjour. :ok_hand:');
    }
	}
	if(message.content === 'jtm'){
		message.reply('Pas moi petite bite. :joy:');
	}
  if(message.content === prefix + 'purge'){
  // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
}
});

bot.on('message', message => {

  if (message.content.startsWith('!play')) {
    // On récupère le premier channel audio du serveur
    let voiceChannel = message.guild.channels
      .filter(function (channel) { return channel.type === 'voice' })
      .first()
    // On récupère les arguments de la commande 
    // il faudrait utiliser une expression régulière pour valider le lien youtube
    let args = message.content.split(' ')
    // On rejoint le channel audio
    voiceChannel
      .join()
      .then(function (connection) {
        // On démarre un stream à partir de la vidéo youtube
        let stream = YoutubeStream(args[1])
        stream.on('error', function () {
          message.reply("Je n'ai pas réussi à lire cette vidéo :(")
          connection.disconnect()
        })
        // On envoie le stream au channel audio
        // Il faudrait ici éviter les superpositions (envoie de plusieurs vidéo en même temps)
        connection
          .playStream(stream)
          .on('end', function () {
            connection.disconnect()
          })
      })
  }

})

bot.on('guildMemberAdd', member => {
  member.createDM().then(channel => {
    return channel.send('Bienvenue ' + member.displayName)
  }).catch(console.error)
  // On pourrait catch l'erreur autrement ici (l'utilisateur a peut être désactivé les MP)
})
