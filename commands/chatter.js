const { joinVoiceChannel, getVoiceConnection, getVoiceConnections, createAudioResource, createAudioPlayer } = require('@discordjs/voice');
const { SlashCommandBuilder, ChannelType } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chatter')
		.setDescription('Activates random NPC encounters.')
		.addChannelOption((option) => 
			option.setName('channel')
			.setDescription('Channel to join')
			.setRequired(true)
			.addChannelTypes(ChannelType.GuildVoice))
		.addIntegerOption((option) =>
			option.setName('interval')
			.setDescription('Interval in witch the encounters happen in seconds')
			.setMinValue(30)
			.setRequired(true)),

	async execute(interaction, syncVars) {

		const voiceChannel = interaction.options.getChannel('channel');
		const interval = interaction.options.getInteger('interval');

		syncVars.playState = true;
		// Only include .wav files in the files array
		var files = fs.readdirSync(path.join(__dirname, '/src_audio/')).filter(file => file.endsWith('.wav'));
		await interaction.reply("Joined!");


		while(syncVars.playState){


			playRandomVoiceLine(voiceChannel.id, interaction.guildId, interaction.guild.voiceAdapterCreator, files);

			// wait until we join again
			await sleep(interval*1000);
	}

		
	},
};

function playRandomVoiceLine(channelId, guildId, adapterCreator, files){
	file_id = Math.floor(Math.random() * files.length);
	console.log(path.join(__dirname, '/src_audio/', files[file_id]));

	var voiceConnectionInstance = joinVoiceChannel({
		channelId: channelId,
		guildId: guildId,
		adapterCreator: adapterCreator
	});

	const player = createAudioPlayer();
	const resource = createAudioResource(path.join(__dirname, '/src_audio/', files[file_id]));
	player.play(resource);
	voiceConnectionInstance.subscribe(player);

	player.addListener("stateChange", (oldOne, newOne) => {
		if (newOne.status == "idle") {
			voiceConnectionInstance.destroy();
		}
	});

}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }