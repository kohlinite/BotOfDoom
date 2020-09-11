// Testing command for box of doom.
module.exports = {
  name: 'box-test',
  description: 'Test command for box of doom.  Currently only returns a test message.',
  execute (message, args) {
    message.channel.send('This is only a test stick.')
    message.channel.send('You have 15 minutes to write 200 words.')
  }
}
