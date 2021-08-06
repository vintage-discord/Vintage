import { registerCommands, registerEvents } from './utils/registry';
import config from '../slappey.json';
import DiscordClient from './client/client';
const client = new DiscordClient({
	ws: {
		intents: [
			'DIRECT_MESSAGES',
			'DIRECT_MESSAGE_REACTIONS',
			'DIRECT_MESSAGE_TYPING',
			'GUILDS',
			'GUILD_BANS',
			'GUILD_EMOJIS',
			'GUILD_INTEGRATIONS',
			'GUILD_INVITES',
			'GUILD_MEMBERS',
			'GUILD_MESSAGES',
			'GUILD_MESSAGE_REACTIONS',
			'GUILD_MESSAGE_TYPING',
			'GUILD_PRESENCES',
			'GUILD_VOICE_STATES',
			'GUILD_WEBHOOKS',
		],
	},
});

(async () => {
	client.prefix = config.prefix || client.prefix;
	await registerCommands(client, '../commands');
	await registerEvents(client, '../events');
	await client.login(config.token);
})();
