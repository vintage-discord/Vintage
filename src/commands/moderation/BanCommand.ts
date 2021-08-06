import { Message, MessageEmbed } from 'discord.js';
import BaseCommand from '../../utils/structures/BaseCommand';
import DiscordClient from '../../client/client';

export default class BanCommand extends BaseCommand {
	constructor() {
		super(
			'ban',
			"Ban's a member from your discord server 😡",
			'moderation',
			[],
		);
	}

	async run(client: DiscordClient, message: Message, args: Array<string>) {
		if (message.member?.hasPermission('BAN_MEMBERS'))
			if (message.guild?.me?.hasPermission('BAN_MEMBERS')) {
				const target = message.mentions.users.first();
				const reason = args[1];
				const days = parseInt(args[2]);
				if (target)
					if (reason)
						if (days) {
							const memberTarget = message.guild?.members.cache.get(target.id);
							if (memberTarget?.bannable)
								memberTarget
									?.ban({
										days: days,
									})
									.then(() => {
										return message.channel.send(
											new MessageEmbed()
												.setTitle(`Ban : ${target.tag}`)
												.addField('Success', 'true')
												.addField('Reason', reason)
												.addField('Days', days)
												.setFooter(`By ${message.author.tag}`)
												.setColor('#00ff00'),
										);
									});
							else
								return message.channel.send(
									new MessageEmbed()
										.setTitle(`Ban : ${target.tag}`)
										.addField('Success', 'false')
										.addField('Reason', 'You cant ban that member!')
										.setFooter(`By ${message.author.tag}`)
										.setColor('#ff0000'),
								);
						} else
							return message.channel.send(
								new MessageEmbed()
									.setTitle(`Ban : ${target.tag}`)
									.addField('Success', 'false')
									.addField('Reason', 'Amount of days not provided!')
									.setFooter(`By ${message.author.tag}`)
									.setColor('#ff0000'),
							);
					else
						return message.channel.send(
							new MessageEmbed()
								.setTitle(`Ban : ${target.tag}`)
								.addField('Success', 'false')
								.addField('Reason', 'No reason provided!')
								.setFooter(`By ${message.author.tag}`)
								.setColor('#ff0000'),
						);
				else
					return message.channel.send(
						new MessageEmbed()
							.setTitle('Ban : NaU')
							.addField('Success', 'false')
							.addField('Reason', 'Invalid user! 😠')
							.setFooter(`By ${message.author.tag}`)
							.setColor('#ff0000'),
					);
			} else
				return message.channel.send(
					new MessageEmbed()
						.setTitle('Ban : NaU')
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
					.setTitle('Ban : NaU')
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
