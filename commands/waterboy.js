const { joinVoiceChannel, getVoiceConnection, getVoiceConnections, createAudioResource, createAudioPlayer } = require('@discordjs/voice');
const { SlashCommandBuilder, ChannelType } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('water_boy')
		.setDescription('Activates relaxing water boy sounds.')
		.addChannelOption((option) => 
			option.setName('channel')
			.setDescription('Channel to join')
			.setRequired(true)
			.addChannelTypes(ChannelType.GuildVoice)),

	async execute(interaction, syncVars) {

		const voiceChannel = interaction.options.getChannel('channel');

		syncVars.playState = true;
        var waterboyfile = 'waterboy.wav';
        await interaction.reply("Joined!");

		while(syncVars.playState){

			playSingleVoiceLine(voiceChannel.id, interaction.guildId, interaction.guild.voiceAdapterCreator, waterboyfile);
            break;
	    }

		
	},
};

function playSingleVoiceLine(channelId, guildId, adapterCreator, file){
    console.log(path.join(__dirname, '/src_audio/', file));

    var voiceConnectionInstance = joinVoiceChannel({
        channelId: channelId,
        guildId: guildId,
        adapterCreator: adapterCreator
    });

    const player = createAudioPlayer();
    const resource = createAudioResource(path.join(__dirname, '/src_audio/', file));
    player.play(resource);
    voiceConnectionInstance.subscribe(player);

    player.addListener("stateChange", (oldOne, newOne) => {
        if (newOne.status == "idle") {
            voiceConnectionInstance.destroy();
        }
    });

}