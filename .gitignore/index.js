const Discord = require('discord.js');
const bot = new Discord.Client();

var prefix = ('*')

bot.on('ready', function(){
	bot.user.setGame('Command: *help');
	console.log('Connecté');
});

bot.login('NDE1NTU1NTQyNjUyNjgyMjYw.DW3n9Q.L7AvdoKs5urmXeSlF8jU_VnQBlQ');

bot.on('message', message => {
	if(message.content === prefix + "help"){
		message.channel.sendMessage("Liste des commandes: \n -*help");
	}
	if(message.content === 'Salut'){
		message.reply('Bien le bonjour. :)');
		console.log("Commande Salut effectuée");
	}
});
