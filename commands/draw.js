/* Command for pulling a random stick from the virtual box.
 *
 * Note: currently requires a restart if the JSON is modified.
 */

// Set up a persistent object containing the various sticks.
const sticks = {}
sticks.all = require('../resources/sticks.json')
// Create additional arrays by difficulty
sticks.ve = sticks.all.filter(n => n.difficulty === 'Very Easy')
sticks.e = sticks.all.filter(n => n.difficulty === 'Easy')
sticks.m = sticks.all.filter(n => n.difficulty === 'Medium')
sticks.h = sticks.all.filter(n => n.difficulty === 'Hard')
sticks.vh = sticks.all.filter(n => n.difficulty === 'Very Hard')
// Create a "special" array
sticks.sp = sticks.all.filter(n => n.special)
// Create versions of the difficulty arrays without the special sticks
sticks.ve_no = sticks.ve.filter(n => !n.special)
sticks.e_no = sticks.e.filter(n => !n.special)
sticks.m_no = sticks.m.filter(n => !n.special)
sticks.h_no = sticks.h.filter(n => !n.special)
sticks.vh_no = sticks.vh.filter(n => !n.special)
sticks.all_no = sticks.all.filter(n => !n.special)

// Testing command for box of doom.
module.exports = {
  name: 'draw',
  aliases: ['box-test', 'stick'],
  description: 'Draw a stick from the virtual Box of Doom!  Requires a specified difficulty: `ve`, `e`, `m`, `h`, `vh`, or `all`.  Optionally allows you request either only special sticks (`yes`), or no special sticks (`no`).',
  usage: '<difficulty: `ve`|`e`|`m`|`h`|`vh`|`all`> [`yes`|`no`]',
  execute (message, args) {
    // Check for arguments
    if (!args[0]) {
      message.channel.send('I need a difficulty to pick a stick!')
      return
    }
    // Check argument validity
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
    // Modify the difficulty argument to pull a non-special stick
    if (args[1] === 'no') {
      args[0] = args[0].concat('_no')
    }
    // Special-only draw requested
    if (args[1] === 'yes') {
      const draw = sticks.sp[Math.floor(Math.random() * sticks.sp.length)]
      console.log('Special draw!')
      console.log(draw)
      message.channel.send('🎉 🎊 Drawing a special stick! 🎊 🎉')
      message.channel.send(`You have drawn ${draw.name}: ${draw.description}.`)
      return
    }
    // Access specific difficulty array
    const draw = sticks[args[0]][Math.floor(Math.random() * sticks[args[0]].length)]
    console.log(draw)
    if (args[0] === 'all' || args[0] === 'all_no') {
      message.channel.send('Drawing from all sticks...')
    } else {
      message.channel.send(`Drawing from the ${draw.difficulty} sticks...`)
    }
    if (draw.special) {
      message.channel.send(`🎉 Special! 🎉\n${message.author.tag} has drawn ${draw.difficulty}: ${draw.name}: ${draw.description}.`)
    } else {
      message.channel.send(`${message.author.tag} has drawn ${draw.difficulty}: ${draw.name} words.`)
    }
  }
}
