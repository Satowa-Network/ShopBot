const {SlashCommandBuilder} = require("discord.js");
const fetch = import('node-fetch');
const { URLSearchParams } = require('url');
require("dotenv").config();
module.exports = {
    data: new SlashCommandBuilder()
        .setName("buy")
        .setDescription("Select a Item you want to buy")
        .addStringOption(string =>
            string
                .setName("product")
                .setDescription("Please enter the product you want to buy")
                .setRequired(true)
                .addChoices(
                    {name: "Product 1", value: "prod_1"},
                            {name: "Product 2", value: "prod_2"},
                            {name: "Product 3", value:"prod_3"}
                )
        )
        .addStringOption(string => string
            .setName("iban")
            .setRequired(true)
            .setDescription("Please enter your IBAN from your Satowa Network Bank Account")
            .setAutocomplete(true)
        )
        .addStringOption(string => string
            .setName("code")
            .setRequired(true)
            .setMaxLength(4)
            .setMinLength(4)
            .setDescription("Please enter your Code from your Satowa Network Bank Account")
        )
        .addStringOption(string => string
            .setName("selection")
            .setDescription("Please select what type of extra products you want")
            .setRequired(false)
            .addChoices(
                {name: "Extra 1", value:"ex1"},
                        {name: "Extra 2", value: "ex2"},
                        {name: "Extra 3", value: "ex3"},
                        {name: "Extra 4", value:"ex4"},
                        {name: "Extra 5", value: "ex5"}
            ))
        .addIntegerOption(int => int
            .setName("amount")
            .setDescription("Please enter how much you want to buy")
            .setRequired(false)
        ),
    async run(interaction, config) {
        let product = interaction ? interaction.options.getString("product") : null;
        const iban = interaction ? interaction.options.getString("iban") : null;
        const code = interaction ? interaction.options.getString("code") :null;
        const coins = interaction ? interaction.options.getInteger("amount") : null;
        let hostingType = interaction ? interaction.options.getString("selection") : null;
        if(!product || !iban || !code) {
            return interaction.reply("Sorry but you entered invalid parameters!");
        }







        async function createTransaction(ibanData, codeData, productData, priceData) {
            let request = require('request');
            let options = {
                'method': 'POST',
                'url': 'https://api.satowa-network.eu/v3/flagcoin/receive',
                'headers': {
                },
                formData: {
                    'from': ibanData,
                    'to': process.env.IBAN,
                    'token': process.env.SN_TOKEN,
                    'amount': priceData,
                    'description': productData,
                    'code': codeData
                }
            };
            request(options, function (error, response) {
                if (error) throw new Error(error);
                const responseBody = JSON.parse(response.body);
                console.log(response.body);
                if(responseBody.code !== 202) {
                    return interaction.reply("There was an error executing your Transaction.\nStatus Code: "+responseBody.code+"\nMessage: "+responseBody.message)
                } else {
//                    return interaction.reply("Your transaction was successful!\nThank you for your purchase\n``Information Data:\nSupport E-Mail: support@scodedev.de\nCompany: Scodedev\nTransaction ID: "+responseBody.transaction_id+"\nProduct: "+responseBody.description+"\nAmount: "+responseBody.amount+"``\n*Information's required by the Satowa Network*")
                    if (parseInt(responseBody.amount) >= 1000) {
                        const suffixes = ['', 'k', 'M', 'B', 'T'];

                        const num = parseInt(responseBody.amount);
                        const tier = Math.floor(Math.log10(num) / 3);

                        responseBody.amount = (num / Math.pow(1000, tier)).toFixed(2) + suffixes[tier];
                    }

                    while (responseBody.amount.length < 4) {
                        responseBody.amount = responseBody.amount + ' ';
                    }

                    while (product.length < 16) {
                        product = product + ' ';
                    }


                    if(product !== "amount"  && hostingType != null) {
                        while (hostingType.length < 16) {
                            hostingType = hostingType + ' ';
                        }
                    }

                    return interaction.reply(`
# Thanks for your purchase!
## Your purchase was successfully made!
Here is your Receipt:
\`\`\`
          ${process.env.COMPANY_NAME}
+-----------------------------+
| Product          |  Price   |
+-----------------------------+
| ${product} |  ${responseBody.amount} FG |
| ${hostingType ? true : hostingType} |          |
+-----------------------------|
| Tax              | + 0 FG   |
| Sum              | ${responseBody.amount} FG |
+-----------------------------+

Transaction ID: ${responseBody.transaction_id}
Support: ${process.env.SUPPORT}
Banking System Support: support@satowa-network.eu
\`\`\`
`)
                }
            });
        }

        if(product === "prod_1") {
            if(hostingType == null) {
                return await interaction.reply("Please enter a selection Type!");
            }
            console.log(await createTransaction(iban, code, "Data 1", "Price as int"));
        } else if(product === "prod_2") {
            console.log(await createTransaction(iban, code, "Data 2", "Price as int"));
        } else if(product === "prod_3") {
            if(coins < 1000) {
                return interaction.reply("You entered an invalid amount of coins");
            }
            console.log(await createTransaction(iban, code, coins+"Coins", coins));
        }
    }

}