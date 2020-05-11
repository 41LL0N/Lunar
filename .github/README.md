A Discord bot written in [Node.js](https://nodejs.org) to be used in private servers. This bot makes use of the official [discord.js](https://github.com/discordjs/discord.js) library to interact with the [Discord API](https://discordapp.com/developers/docs/intro).


# Table of Contents
- [Installation](#installation)
- [Configuring the bot](#configuring-the-bot)
  - [Mandatory configuration settings](#mandatory-configuration-settings)
  - [Optional configuration settings](#optional-configuration-settings)
  - [Changing the avatar](#changing-the-avatar)
- [Running the bot](#running-the-bot)
- [Features](#features)
  - [Welcome Message - Leave Message](#welcome-message---leave-message)
  - [Server Lock](#server-lock)
  - [Commands](#commands)
  - [Reaction Role](#reaction-role)
  - [Twitch Livestream Announcements](#twitch-livestream-announcements)
  - [YouTube](#youtube)
	- [YouTube Video Announcements](#youtube-video-announcements)
	- [YouTube Livestream Announcements](#youtube-livestream-announcements)


# Installation
**Node.js 12.0.0 or newer is required.**
Download all of the necessary files by cloning the GitHub repository or downloading the ZIP folder. Open the command line in the root folder or use `cd C:\insert\path\to\folder\here\` to navigate there. When arrived, run the `npm install` command. Create a new copy of `config_example.json` and rename it to `config.json` or rename the original `config_example.json` to `config.json`.

## Configuring the bot
If done incorrectly, the bot will not operate the way you want it to or not work at all. Make sure to double-check the adjustments you made before running the bot, it could lead to unintended behaviour otherwise. The correct syntax for the configuration options explained with an example: `"activity": "with Admin perks",`. Do not forget the comma at the end of each line!

### Mandatory configuration settings
Open `config.json` and **make sure to adjust** the following configuration options. The bot will not work otherwise. Therefore, do not leave these options empty, like this `"token": ""`.
- `token` - This is the Discord Bot token you will need to run the bot. Without it, it will not be able to interact with the Discord API. This token can be found by accessing your [Discord Applications](https://discordapp.com/developers/applications/). If no such application has been created yet, read [this guide](https://discordpy.readthedocs.io/en/latest/discord.html) on how to do so.

### Optional configuration settings
The following configuration options are **optional** and do not need to be tweaked for the bot to work.
- `username` [Default is *Lunar*] - Change the username of the bot.
- `activity` [Default is *with Admin perks*] - Change the game that the bot is playing. This activity is always preceded by `Playing ...` where `...` illustrates `activity`.
- `commandPrefix` [Default is *!*] - Change the prefix used to trigger a command.

### Changing the avatar
The avatar can be changed as well. This is done by replacing the `avatar.png` file with an image of choice. The image of choice needs to be a **PNG** file and named `avatar.png`.

## Running the bot
After changing the mandatory configuration options, open the command line and head over to the root folder of the bot. This can be done by using the `cd C:\insert\path\to\folder\here\` command. Once in the root folder, launch the bot by using the `node bot.js` command.

The bot can be shut down by terminating the command line or using the following key-press combination when the command line is focussed `CTRL + C`.

# Features
This bot offers a bunch of features that are all optional. These features can be enabled and disabled individually without affecting another feature. All of these features can be tweaked in the `config.json` file.

## Welcome Message - Leave Message
This feature sends out a message to a set channel whenever a user joins/leaves the Discord server and allows for a direct message to be sent when a user joins the server. It is fully customisable such that either welcome messages or leave messages are sent, or either one.

The following configuration settings affect the behaviour of this feature:
- `enabled` [Default is *false*] - This enables/disables sending out a (direct) message on a user joining/leaving the server.
- `channelID` [Default is *empty*] - The channel to send the welcome/leave message in.
- `message` [Default is *empty*] - The message that is appended to the default join/leave message: `[Member] has joined/left the Discord server! [message]` or the direct message sent to a new member.

Example of the `welcomeMessage` configuration options object:
```JSON
"welcomeMessage": {
		"welcome": {
			"enabled": true,
			"channelID": "618712023768891393",
			"message": "Welcome to the Discord!"
		},
		"leave": {
			"enabled": true,
			"channelID": "706596433721163807",
			"message": "Ah, another soldier has fallen..."
		},
		"direct" : {
			"enabled": false,
			"message": ""
		}
	}
```

## Server Lock
Allows for the server to lock out new members to certain channels by giving them a role when they join the server. This can be removed manually by members that can manage roles or automatically by making use of a reaction role system.

The following configuration settings affect the behaviour of this feature:
- `enabled` [Default is *false*] - This enables/disables the entire feature.
- `manual` [Default is *false*] - This enables/disables unlocking a member by making use of reaction role. Keep this set to `false` if you want to manually remove `role` from the new member.
- `role` - [Default is *empty*] - The role that locks out new members from certain channels. Make sure to set the right permissions for the channels you want to use this on!
- `message` - [Default is *empty*] - Object that contains the message ID and reaction emoji that removes the `role`. Example of a correct `message` object:
```JSON
"serverLock": {
		"enabled": true,
		"manual": false,
		"role": "709153445944229929",
		"message": {
			"643119241524019232": "👏"
		}
	}
```
This will remove the role with ID `709153445944229929` from the member that reacts with '👏' to the message with ID `643119241524019232`.

## Commands
The default way to trigger a command is as follows: `![command] [argument]`, where the behaviour of `[argument]` could vary between the different commands. Arguments listed within parenthesis `([argument])` are optional and therefore not required. The command prefix can be changed in `config.json`, more information [here](#optional-configuration-settings).

Each individual command can be enabled or disabled based on needs. All commands are disabled by default, which can be changed in `config.js` under `commands`. If a disabled command is triggered, the user will be notified.

The following command behaviour is currently natively supported:
- `8ball [question]` - This will generate a random answer to the question being asked.
- `about/version` - This will return an embed with the latest technical information on the bot.
- `ban @[user] ([reason])` - This will ban `[user]` from the current server for 7 days with `([reason])` as reason.
- `clear/purge/remove/delete [number]` - This will delete as many messages of the past in the current channel with a minimum of *1* and a maximum of up to *99* messages at a time.
- `clear/purge/remove/delete @[user]` - This will delete all messages sent by `[user]` out of the last *99* messages sent in the current channel.
- `invite` - This will generate an invite link for the current channel which can be used for 24 hours.
- `kick @[user] ([reason])` - This will kick `[user]` from the current server with `([reason])` as reason.

One could even add commands of their own if they possess the means to do so, please do keep in mind that this is not supported code, things could be wonky or not function the way initially envisioned.

## Reaction Role
Reaction role functionality is natively supported through the use of the following data structure in `config.json`, explained with an example:
```JSON
"reactionRole": {
	"enabled": true,
	"messages": {
		"622739516528263168": {
			"👍": [
				"610032704704217092"
			]
		}
	}
}
```

This will add the role with ID `610032704704217092` to the user that reacted with '👍' on the message with ID `622739516528263168` if `enabled` is set to `true`.

If the user removes the '👍' reaction from the message with ID `622739516528263168`, the role with ID `610032704704217092` will be removed from the user.

The following configuration options must be tweaked to make use of this feature:
- `enabled` [Default is *false*] - Enables/disables this specific feature.
- As well as adding the reaction role to the data structure. The template is as follows:
```JSON
"reactionRole": {
	"enabled": true,
	"messages": {
		"[Message ID]": {
			"[Emoji ID/Name]": [
				"[Role ID]",
			],
		},
	}
}
```

This structure allows the case of multiple roles per reaction, multiple reactions per message and multiple messages per server.

For now, each reaction role has to be set up manually. In the near future, a set of commands will be implemented to achieve the same result with minimal effort.

## Twitch Livestream Announcements
Lunar has built-in support for Twitch livestream announcements by polling the Twitch API every 60 seconds to check whether the specified Twitch channel in `config.json` is currently live. The announcement will have a message, if this is set, with an embed which has the title, game being played, viewer count and thumbnail of the stream together with a direct link to the stream. This embed is updated every 3 minutes with the latest stream statistics and thumbnail, as long as the stream is online. When the stream goes offline, the embed will change to display information about the latest VOD and link to it.

The following configuration options must be changed in order to make use of this feature:
- `enabled` [Default is *false*] - Enables/disables this feature.
- `client-ID` [Default is *empty*] - Twitch client ID that is needed to make use of the Twitch API. Follow [Step 1: Setup](https://dev.twitch.tv/docs/api#step-1-setup) of the Twitch API documentation to get one.
- `client-secret` [Default is *empty*] - Twitch client secret that is needed to generate OAuth tokens and make use of the Twitch API. It can be found on the same page as the `client-ID`.
- `username` [Default is *empty*] - The username of the Twitch channel.
- `announcementChannelID` [Default is *empty*] - The Discord channel to send the livestream announcements in.

Optional configuration options that can be set:
- `announcementMessage` [Default is *empty*] - Message that will be attached to the embed.

## YouTube
Lunar has support for both YouTube video announcements and YouTube livestream announcements. The settings for these two independent features can be tinkered with individually, but they do share a number of settings. In order to make use of either feature, please set the following configuration settings:

- `APIkey` [Default is *empty*] - YouTube API key that is required to contact the YouTube services. Follow [these steps](https://developers.google.com/youtube/v3/getting-started) to get your YouTube API key, make sure to also enable the YouTube API! Your key will **not** work without explicitly enabling the YouTube API.
- `channel` [Default is *empty*] - The YouTube channel ID you want to send out notifications for.

### YouTube Video Announcements
If this feature is enabled, an announcement is send out every time the YouTube channel being 'watched' uploads a new video. The announcement will consist of a message, if specified, and a modern embed which contains the title, part of the description and thumbnail of the video, together with a link to YouTube.

Please set the following settings to make use of this:
- `enabled` [Default is *false*] - Enables/disables this feature.
- `announcementChannelID` [Default is *empty*] - The Discord channel to send the video release announcements in.

Optional settings you can change:
- `announcementMessage` [Default is *empty*] - Message that will be sent along with the embed.

### YouTube Livestream Announcements
If this feature is enabled, every time the channel starts a livestream, an announcement will be sent to a Discord channel. This announcement will have the title of the stream, description, thumbnail and direct link to the stream, bundled into a neat, modern embed. This embed will be tied with an announcement message, if defined.

The following settings are mandatory to make use of this feature:
- `enabled` [Default is *false*] - Enables/disables this feature.
- `announcementChannelID` [Default is *empty*] - The Discord channel to send the livestream announcements in.

Optional settings you can change:
- `announcementMessage` [Default is *empty*] - Message that will be sent along with the embed.
