const sticks = require('../resources/very_easy.json')
// const regSticks = sticks.filter(n => !n.special)

// Testing command for box of doom.
module.exports = {
  name: 'box-test',
  description: 'Test command for box of doom.  Currently only returns a test message.',
  execute (message, args) {
    const draw = sticks[Math.floor(Math.random() * sticks.length)]
    message.channel.send('This is a test stick, from the very easy set.')
    if (draw.special) {
      message.channel.send(`You have drawn ${draw.name}: ${draw.description}.`)
    } else {
      message.channel.send(`You have drawn ${draw.name} words.`)
    }
  }
}
