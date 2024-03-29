/*
* Command for retrieving word count range.
*/

// Set up a persistent object containing the various sticks.
const sticks = {}
sticks.all = require('../resources/sticks.json')
// Create additional arrays by difficulty
sticks.ve = sticks.all.filter(n => n.difficulty === 'Very Easy').filter(n => !n.special)
sticks.e = sticks.all.filter(n => n.difficulty === 'Easy').filter(n => !n.special)
sticks.m = sticks.all.filter(n => n.difficulty === 'Medium').filter(n => !n.special)
sticks.h = sticks.all.filter(n => n.difficulty === 'Hard').filter(n => !n.special)
sticks.vh = sticks.all.filter(n => n.difficulty === 'Very Hard').filter(n => !n.special)

// Command properties
module.exports = {
  name: 'level',
  aliases: ['range'],
  description: 'Returns the range of word counts for a provided difficulty.',
  usage: '<difficulty: `ve`|`e`|`m`|`h`|`vh`|`all`>',
  execute (message, args) {
    if (!args[0]) {
      message.channel.send('I need a difficulty selection!')
      return
    }
    // Check arg validity
    const validArgs = [
      've',
      'e',
      'm',
      'h',
      'vh',
      'all'
    ]
    if (!validArgs.some(e => e === args[0])) {
      message.channel.send('Invalid difficulty specified.  Please specify one of {`ve`,`e`,`m`,`h`,`vh`,`all`}.')
      return
    }
    // Find and return requested range
    const requestedSticks = sticks[args[0]]
    const values = requestedSticks.map(a => Number.parseInt(a.name))
    const filteredValues = values.filter(n => !Number.isNaN(n))
    const min = filteredValues.reduce((a, b) => Math.min(a, b))
    const max = filteredValues.reduce((a, b) => Math.max(a, b))
    if (args[0] === 'all') {
      message.channel.send(`Difficulty All has a range from ${min} to ${max}.`)
    } else {
      message.channel.send(`Difficulty ${requestedSticks[0].difficulty} has a range from ${min} to ${max}.`)
    }
  }
}
