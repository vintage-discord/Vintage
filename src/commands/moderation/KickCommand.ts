import { Message, MessageEmbed } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class KickCommand extends BaseCommand {
	constructor() {
		super(
			'kick',
			'Kicks a member from your discord server. 😠',
			'moderation',
			[],
		);
	}

	async run(client: DiscordClient, message: Message, args: Array<string>) {
		if (message.member?.hasPermission('KICK_MEMBERS'))
			if (message.guild?.me?.hasPermission('KICK_MEMBERS')) {
				const target = message.mentions.users.first();
				const reason = args[1];

				if (target) {
					if (reason) {
						const memberTarget = message.guild?.members.cache.get(target.id);
						if (memberTarget?.kickable)
							memberTarget?.kick(reason).then(() => {
								return message.channel.send(
									new MessageEmbed()
										.setTitle(`Kick : ${target.tag}`)
										.addField('Success', 'true')
										.addField('Reason', reason)
										.setFooter(`By ${message.author.tag}`)
										.setColor('#00ff00'),
								);
							});
						else
							return message.channel.send(
								new MessageEmbed()
									.setTitle(`Kick : ${target.tag}`)
									.addField('Success', 'false')
									.addField('Reason', 'You cant kick that member!')
									.setFooter(`By ${message.author.tag}`)
									.setColor('#ff0000'),
							);
					} else
						return message.channel.send(
							new MessageEmbed()
								.setTitle(`Kick : ${target.tag}`)
								.addField('Success', 'false')
								.addField('Reason', 'No reason provided!')
								.setFooter(`By ${message.author.tag}`)
								.setColor('#ff0000'),
						);
				} else
					return message.channel.send(
						new MessageEmbed()
							.setTitle('Kick : NaU')
							.addField('Success', 'false')
							.addField('Reason', 'Invalid user! 😠')
							.setFooter(`By ${message.author.tag}`)
							.setColor('#ff0000'),
					);
			} else
				return message.channel.send(
					new MessageEmbed()
						.setTitle('Kick : NaU')
						.addField('Success', 'false')
						.addField(
							'Reason',
							'I do not have appropriate permissions to run this command. 😢',
						)
						.setFooter(`By ${message.author.tag}`)
						.setColor('#ff0000'),
				);
		else
			return message.channel.send(
				new MessageEmbed()
					.setTitle('Kick : NaU')
					.addField('Success', 'false')
					.addField(
						'Reason',
						'You do not have appropriate permissions to run this command. 😠',
					)
					.setFooter(`By ${message.author.tag}`)
					.setColor('#ff0000'),
			);
	}
}
