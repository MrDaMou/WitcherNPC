# WitcherNPC
A Discord Bot that enables random Witcher NPC encounters on your server!

## Features
- Joins a specified Discord voice channel
- Plays random .wav files as NPC voice lines
- User-configurable interval between encounters
- Easy to extend with new audio files (just add .wav files to `commands/src_audio`)

## Prerequisites
- Node.js 20.x (or compatible LTS version)
- Discord bot token and permissions to join voice channels

## Installation
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd WitcherNPC
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure your bot:
   - edit .env.example to include your bots credentials
   - rename .env.example to .env

## Registering slash commands on Discord Server
node --env-file=.env deploy-commands.js 

## Usage
Start the bot with:
```sh
node --env-file=.env index.js
```

## Running with Docker
A `Dockerfile` is provided for easy containerization.

### Build the Docker image
```sh
docker build -t witchernpc .
```

### Run the Docker container
```sh
docker run -d --name witchernpc \
  -e TOKEN=your_token_here \
  -e CLIENT_ID=your_docker_client_id \
  -e GUILD_ID=servers_guild_id
  -v $(pwd)/commands/src_audio:/usr/src/app/commands/src_audio \
  -p 3000:3000 \
  witchernpc
```
- Replace `your_token_here` with your actual Discord bot token.
- Replace `your_docker_client_id` with your actual Discord client id.
- Replace `servers_guild_id` with your discord servers guild id
- The `-v` flag mounts your local `commands/src_audio` directory into the container so you can manage audio files easily.

## Adding Audio Files
- Place your `.wav` files in the `commands/src_audio` directory. Only `.wav` files will be used by the bot.