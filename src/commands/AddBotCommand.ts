import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'

class AddBotCommand extends Command {
  constructor() {
    super('addbot', {
      aliases: ['addbot', 'adicionarbot'],
      args: [{
        id: 'botID',
        type: 'string',
        prompt: {
          start: 'Insira o ID do bot a ser adicionado.',
          retry: 'Esse ID é inválido. Tente novamente.'
        }
      }, {
        id: 'prefix',
        type: 'string',
        prompt: {
          start: 'Insira o prefixo do bot.'
        }
      }, {
        id: 'lang',
        type: 'string',
        prompt: {
          start: 'Insira a linguagem de programação do bot. (Linguagens suportadas: javascript, kotlin, python, typescript)',
          retry: 'Linguagem inválida. Tente novamente!'
        }
      }]
    })
  }
  async exec (message, { botID, prefix, lang }) {
    let user = await message.client.users.fetch(botID)
    if (!user.bot) return message.util!.send('Esse usuário não é um bot...')
    
    let doc = await message.client.database.RequestedBot.findOne({ id: user.id })
    if (doc) return message.util!.send('Esse bot já está na fila de verificação, por favor aguarde!')
    doc = await message.client.database.AcceptedBot.findOne({ id: user.id })
    if (doc) return message.util!.send('Esse bot já foi adicionado ao servidor, bobinho(a)')
    
    let ownerDoc = await message.client.database.User.findOne({ id: message.author.id }) || new message.client.database.User({ id: message.author.id }).save()
    if (message.guild.members.has(user.id)) return message.util!.send('Esse bot já está aqui!')
    if (!['javascript', 'js', 'python', 'py', 'kotlin', 'kt', 'typescript', 'ts'].some(a => a === lang)) return message.util!.send('Essa linguagem de programação não é suportada!')
    let embed = new MessageEmbed()
    .setTitle('Novo bot!')
    .setAuthor(`Pedido por ${message.author.username}`, message.author.displayAvatarURL())
    .setFooter(`Use ;acceptbot ${user.id} para aceitar.`, user.displayAvatarURL())
    .setThumbnail(user.displayAvatarURL())
    .addField(`Linguagem: ${lang}`, `Prefixo: \`${prefix}\``)
    .setDescription(`Adicione o bot clicando [aqui.](https://discordapp.com/api/oauth2/authorize?client_id=${user.id}&permissions=0&scope=bot)`)
    .setColor('RANDOM')
    
    return message.guild.channels.get('573983770634616862').send(embed).then((msg) => {
      let doc = new message.client.database.RequestedBot({
        id: user.id,
        messageID: msg.id,
        owner: ownerDoc,
        prefix: prefix,
        lang: lang
      }).save()
      
      return message.util!.send(`Ok! \`${user.tag}\` foi adicionado à fila de espera. Tenha paciência!`)
    })
  }
}

module.exports = AddBotCommand