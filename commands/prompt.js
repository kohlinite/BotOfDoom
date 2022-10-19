/* Command for requesting a random writing prompt.
 * 
 * Initial implementation.  Will eventually interface with a master prompt list
 * that will be routinely pulled from the master prompt file maintained by
 * Nano-RDU ML Reka.
 * 
 */

// Create a persistent object that contains the prompt list.
const prompts = {}
prompts.all = require('../resources/prompts.json')
console.log("Total prompts: " + prompts.all.length)
// Create filtered lists
prompts.sfw = prompts.all.filter(n => !n.nsfw)
console.log("Total SFW prompts: " + prompts.sfw.length)
// prompts.nsfw = prompts.all.filter(n => n.nsfw)

// Old-style bot command
module.exports = {
    name: 'prompt',
    description: 'Pull a writing prompt from the master list!  Defaults to SFW prompts only.',
    // usage: '[`all`|`nsfw`',
    execute(message, args) {
        // Check for arguments

        // Check argument validity

        // Randomly select a prompt
        const draw = prompts.sfw[Math.floor(Math.random() * prompts.sfw.length)]
        console.log('Prompt selected: ' + draw.prompt)
        message.channel.send(`<@!${message.author.id}> has requested a prompt: ${draw.prompt} `)
        return
    }
}
