const sticks = {}
sticks.all = require('../resources/sticks.json')
sticks.ve = sticks.all.filter(n => n.difficulty === 'Very Easy')
sticks.e = sticks.all.filter(n => n.difficulty === 'Easy')
sticks.m = sticks.all.filter(n => n.difficulty === 'Medium')
sticks.h = sticks.all.filter(n => n.difficulty === 'Hard')
sticks.vh = sticks.all.filter(n => n.difficulty === 'Very Hard')
sticks.sp = sticks.ve.filter(n => n.special)
sticks.ve_no = sticks.ve.filter(n => !n.special)
sticks.e_no = sticks.e.filter(n => !n.special)
sticks.m_no = sticks.m.filter(n => !n.special)
sticks.h_no = sticks.h.filter(n => !n.special)
sticks.vh_no = sticks.vh.filter(n => !n.special)

// Testing command for box of doom.
module.exports = {
  name: 'box-test',
  aliases: ['draw', 'stick'],
  description: 'Draw a stick from the virtual Box of Doom!  Requires a specified difficulty: ve, e, m, h, vh, or all.  Optionally allows you request either only special sticks, or no special sticks.',
  usage: '<difficulty: ve|e|m|h|vh|all> [special:yes|no]',
  execute (message, args) {
    if (!args[0]) {
      message.channel.send('I need a difficulty to pick a stick!')
      return
    }
    if (args[1] === 'no') {
      args[0].concat('_no')
    }
    if (args[1] === 'yes') {
      const draw = sticks.sp[Math.floor(Math.random() * sticks.sp.length)]
      console.log('Special draw!')
      console.log(draw)
      message.channel.send('🎉 🎊 Drawing a special stick! 🎊 🎉')
      message.channel.send(`You have drawn ${draw.name}: ${draw.description}.`)
      return
    }
    const draw = sticks[args[0]][Math.floor(Math.random() * sticks[args[0]].length)]
    console.log(draw)
    message.channel.send(`Drawing from the ${draw.difficulty} sticks...`)
    if (draw.special) {
      message.channel.send(`🎉 Special! 🎉\nYou have drawn ${draw.name}: ${draw.description}.`)
    } else {
      message.channel.send(`You have drawn ${draw.name} words.`)
    }
  }
}
