const { commandPrefix } = require('./../config.json');

module.exports = {
	name: 'nickname',
	description: 'A command that turns on/off slowmode for the current channel',
	usage: `${commandPrefix}nickname [member] [name]`,
	args: true,
	aliases: [],

	execute
};

function execute (ignore, message, args) {
	if (!message.member.hasPermission('MANAGE_NICKNAMES')) return message.channel.send(`**Beans**! You don't have the right permissions to do this!`).then((msg) => msg.delete({ timeout: 3500 }));

	const member = message.mentions.members.first();
	if (!member) return message.channel.send(`**Oh snap**! You forgot to mention the person you're trying to change the name of.`).then((msg) => msg.delete({ timeout: 3500 }));

	if (member.hasPermission('MANAGE_NICKNAMES')) return message.channel.send(`**Uhm**... You can't change the nickname of someone with the same privileges as yourself!`).then((msg) => msg.delete({ timeout: 3500 }));

	const nickname = args.slice(1, args.length + 1).join(' ');
	if (nickname.length < 1) return message.channel.send(`**Ah**! You need to provide a new nickname!`).then((msg) => msg.delete({ timeout: 3500 }));

	member.setNickname(nickname).then((changedMember) => {
		message.delete();
		return message.channel.send(`**Great**! You've successfully changed their nickname to ${changedMember.displayName}!`).then((msg) => msg.delete({ timeout: 3500 }));
	}).catch((error) => {
		console.error(`An error occurred when trying to change a nickname, ${error}`);
		return message.channel.send(`**Oops**! A thing or two went wrong... Try again later!`).then((msg) => msg.delete({ timeout: 3500 }));
	});
}