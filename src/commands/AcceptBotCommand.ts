import { Command } from 'discord-akairo'

class AcceptBotCommand extends Command {
  constructor() {
    super('acceptbot', {
      aliases: ['acceptbot', 'aceitarbot', 'accbot', 'accb'],
      args: [{
        id: 'bot',
        type: 'user',
        prompt: {
          start: 'Diga o ID do bot a ser aceito.',
          retry: 'Bot não encontrado. Adicione-o no servidor antes.'
        }
      }]
    })
  }

  async exec (message, { bot }) {
    if (!message.member.roles.has('573983735418978317')) return message.util!.send('Apenas administradores podem aceitar bots.')
    let botDoc = await message.client.database.RequestedBot.findOne({ id: bot.id })
    if (!botDoc) return message.util!.send('O bot não foi encontrado no banco de dados.')
    
    let acceptedBot = new message.client.database.AcceptedBot({ id: bot.id, owner: botDoc.owner, prefix: botDoc.prefix, lang: botDoc.lang })
    return message.util!.send('Finalizando o pedido...').then(async (msg) => {
      await message.guild.channels.get('573983770634616862').messages.fetch(botDoc.messageID).then(m => m.delete())
      await botDoc.delete()
      await acceptedBot.save()
      await message.guild.member(bot).roles.add('573983741454581770')
      if (['js', 'javascript'].some(a => a === botDoc.lang)) await message.guild.member(bot).roles.add('573983744252444682')
      if (['py', 'python'].some(a => a === botDoc.lang)) await message.guild.member(bot).roles.add('573983744797442071')
      if (['ts', 'typescript'].some(a => a === botDoc.lang)) await message.guild.member(bot).roles.add('574300334818721812')
      if (['kt', 'kotlin'].some(a => a === botDoc.lang)) await message.guild.member(bot).roles.add('573983747142058036')
      return msg.edit('<a:deucerto:574384242952241153> Sucesso! O bot foi aceito.')
    })
  }
}

module.exports = AcceptBotCommand