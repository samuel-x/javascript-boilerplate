import { Client, Events, GatewayIntentBits } from 'discord.js'
import { config } from 'dotenv'
config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// When the client is ready, run this code (only once).
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on('messageCreate', msg => {
    if (msg.author.bot) {
        return;
    }
    // You can view the msg object here with console.log(msg)
    const member = getCurrentVoiceChannel(msg.author.id, msg.guildId);
    if (msg.content === 'Hello' && member) {
        msg.reply(`Hello ${msg.author.username}`);
        msg.reply(`I pick ${member.user.username}`)
    }
});

// Log in to Discord with your client's token
client.login(process.env.TOKEN);

function getCurrentVoiceChannel(userId: string, guildId: string | null)
{
    if (guildId !== null) {
        const Guild = client.guilds.cache.get(guildId); // Getting the guild.
        const Member = Guild?.members.cache.get(userId); // Getting the member.
        
        if (Member?.voice.channel) {
            const membersInChannel = [...Member?.voice.channel.members.values()];
            return membersInChannel[Math.floor(Math.random()*membersInChannel.length)];
        } 
    }
}