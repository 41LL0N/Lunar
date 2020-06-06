const config = require('./../config.json');

module.exports = {
	description: `Manages the 'Currently Livestreaming' role functionality`,
	setStatus
};


// Adds 'Currently Livestreaming' role to streamers that are streaming and removes it when they stop streaming
function setStatus (client, ignore, newPresence) {
	if (!config.streamStatus.enabled) return;

	const { streamerRole, streamStatusRole } = config.streamStatus;
	if (!streamStatusRole || !streamerRole) return console.error(`Stream status roles are not set in the configuration options!`);

	const botMember = newPresence.guild.members.cache.get(client.user.id);
	if (!botMember.hasPermission('MANAGE_ROLES')) return console.error(`Missing permissions (MANAGE_ROLES) to change stream status role for ${newPresence.member.nickname}!`);

	newPresence.activities.forEach((activity) => {
		if (activity.type === 'STREAMING') {
			if (!newPresence.member.roles.cache.has(streamerRole)) return;

			return newPresence.member.roles.add(streamStatusRole).catch((error) => console.error(`Cannot add streamer status role, ${error}`));
		}
	});

	if (newPresence.member.roles.cache.has(streamStatusRole)) return newPresence.member.roles.remove(streamStatusRole).catch((error) => console.error(`Cannot remove streamer status role, ${error}`));
}