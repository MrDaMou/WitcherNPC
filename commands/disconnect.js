const { joinVoiceChannel, getVoiceConnection, getVoiceConnections  } = require('@discordjs/voice');
const { SlashCommandBuilder, ChannelType } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('disconnect')
		.setDescription('Deactivates random NPC encounters.'),

	async execute(interaction, syncVars) {

        const voiceConnection = getVoiceConnection(interaction.guildId);

		if (syncVars.playState){
            syncVars.playState = false;
            await interaction.reply("Disconnected!");
        }
        else await interaction.reply("Nothing to disconnect!");
		
	},
};

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }