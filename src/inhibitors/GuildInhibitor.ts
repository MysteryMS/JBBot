import { Inhibitor } from 'discord-akairo'
import { Message } from 'discord.js'

class GuildInhibitor extends Inhibitor {
  constructor () {
    super('guild', {
      reason: 'guild'
    })
  }
  exec (message: Message) {
    return !message.guild || message.guild!.id !== '573982661262049310'
  }
}

module.exports = GuildInhibitor