import { Command } from 'discord-akairo'

class PingCommand extends Command {
  constructor() {
    super('ping', {
      aliases: ['ping'] 
    })
  }

  exec (message) {
    return message.util!.send(`Pong! ${Math.round(this.client.ws.ping)}ms`)
  }
}

module.exports = PingCommand