import { Message } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class PurgeCommand extends BaseCommand {
	constructor() {
		super(
			'purge',
			'Purge up to 100 messages at a time in a text channel!',
			'moderation',
			['p'],
		);
	}

	async run(client: DiscordClient, message: Message, args: Array<string>) {
		if (message.channel.type !== 'dm') {
			const messages = parseInt(args[0]);

			if (!messages)
				return message.reply(
					"You haven't provided the number of messages to delete!",
				);
			if (isNaN(messages))
				return message.reply('You must give a number of messages!');

			if (messages > 100)
				return message.reply(
					"You can't delete more than 100 messages at a time!",
				);
			if (messages < 1)
				return message.reply('You have to delete a minimum of 1 message!');

			await message.channel.messages
				.fetch({ limit: messages })
				.then((messages) => {
					if (message.channel.type !== 'dm')
						message.channel.bulkDelete(messages);
				});
		}
	}
}
