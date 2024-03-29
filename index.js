require('dotenv').config()
const fs = require('fs')
const Discord = require('discord.js')
const prefix = process.env.PREFIX
const token = process.env.DISCORD_TOKEN

const client = new Discord.Client()
client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}

const cooldowns = new Discord.Collection()

client.once('ready', () => {
  console.log('Ready!')
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return

  const args = message.content.slice(prefix.length).trim().split(/ +/)
  const commandName = args.shift().toLowerCase()

  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

  if (!command) return

  // Arguments check
  if (command.args && !args.length) {
    try {
      return message.channel.send(`You didn't provide any arguments, ${message.author}!`)
  
    } catch (error) {
      console.error(error)
    }  
  }

  // Cooldowns check
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection())
  }

  const now = Date.now()
  const timestamps = cooldowns.get(command.name)
  const cooldownAmount = (command.cooldown || 1.0) * 1000

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000
      try {
        return message.reply(`please wait ${timeLeft.toFixed(1)} more seconds`)
      } catch (error) {
        console.error(error)
      }
    }
  }

  timestamps.set(message.author.id, now)
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

  try {
    command.execute(message, args)
  } catch (error) {
    console.error(error)
    message.reply('there was an error trying to execute that command!')
  }
}

)

client.login(token)
