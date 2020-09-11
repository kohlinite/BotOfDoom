module.exports = {
  name: 'ping',
  cooldown: 15,
  description: 'Ping!',
  execute (message, args) {
    message.channel.send('Pong.')
  }
}
