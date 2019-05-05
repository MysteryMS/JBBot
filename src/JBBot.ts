import { AkairoClient, CommandHandler, InhibitorHandler } from 'discord-akairo'

class JBBot extends AkairoClient {
  commandHandler: CommandHandler = new CommandHandler(this, {
    directory: `${__dirname}/commands/`,
    prefix: ';',
    handleEdits: true,
    commandUtil: true,
    argumentDefaults: {
      prompt: {
        timeout: 'O tempo acabou e o comando foi cancelado. Tente novamente.',
        ended: 'Muitas tentativas, o comando foi cancelado',
        cancel: 'Comando cancelado.',
        retries: 6,
        time: 30000
      }
    }
  })
  inhibitorHandler: InhibitorHandler = new InhibitorHandler(this, {
    directory: `${__dirname}/inhibitors/`
  })
  database = require(`${__dirname}/database`)
  
  constructor () {
    super({
      ownerID: ['485837271967465472', '268526982222970880']
    })
    
    this.commandHandler.useInhibitorHandler(this.inhibitorHandler)
    this.inhibitorHandler.loadAll()
    
    this.commandHandler.loadAll()
  }
}

export default JBBot