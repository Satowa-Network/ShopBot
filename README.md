# Satowa Network Discord ShopBot Example
![Version - 1.0.0](https://img.shields.io/badge/Version-1.0.0-white)
![ShopBot - Soon EOL](https://img.shields.io/badge/ShopBot-Soon_EOL-fcbe03?logo=https%3A%2F%2Fcdn.satowa-network.eu%2Ficons%2Flogos%2Fone.png)
[![discord.js - 14.11.0](https://img.shields.io/badge/discord.js-14.11.0-blue)](https://www.npmjs.com/package/discord.js)
[![@discord.js/rest - 2.0.1](https://img.shields.io/badge/@discord.js&sol;rest-2.0.1-blue)](https://www.npmjs.com/package/@discordjs/rest)
[![discord-api-types - 0.37.42](https://img.shields.io/badge/discord&minus;api&minus;types-0.37.42-blue)](https://www.npmjs.com/package/discord-api-types)
[![dotenv - 16.0.3](https://img.shields.io/badge/dotenv-16.0.3-blue)](https://www.npmjs.com/package/dotenv)
[![form-data - 4.0.0](https://img.shields.io/badge/form&minus;data-4.0.0-blue)](https://www.npmjs.com/package/form-data)
[![node-fetch - 3.3.1](https://img.shields.io/badge/node&minus;fetch-3.3.1-blue)](https://www.npmjs.com/package/node-fetch)
[![request - 2.88.2](https://img.shields.io/badge/request-2.88.2-blue)](https://www.npmjs.com/package/request)
# EOL NOTICE

This project will go End of Life on November 18, 2023 and will no longer receive any new updates.

It is currently planned to reprogram and revive the project at some point when it is again possible and has the use.

The following services will no longer be available until further notice on November 18, 2023:
| Service |	Status |
|---------|--------|
| Security Updates |	❌ |
| Version Updates |	❌ |
| Support |	〽️ |

# Introduction

This project is a partner project of the Satowa Network. This project contains all the important files to have a Discord bot using Discord.JS that interacts with our Payments API.

# Tutorial
1. Download the project with `git clone https://github.com/Satowa-Network/ShopBot.git`
2. Navigate to the ShopBots folder and rename it to `.env`.
3. Edit the `.env` file and enter your data that you get from our website and that is adapted to your shop.
4. Now run `npm install` to install all the important packages such as dotenv, discord.js, etc. 
5. Alternatively, you can simply run the `startServer.bat` regarding .4.

# How do I add products?

To add products, simply open the `commands/slashCommands/buy.js` file.

Now you can also add all the products you have at line [14](https://github.com/Satowa-Network/ShopBot/blob/main/commands/slashCommands/buy.js#L14.)

    IMPORTANT! Note that you should not add spaces to value and write everything in lowercase.

If your product has extras that can be added, you can also define them or completely remove them at [line 38](https://github.com/Satowa-Network/ShopBot/blob/main/commands/slashCommands/buy.js#L38).
