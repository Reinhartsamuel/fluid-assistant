import { wallet } from "../viem/wallet";
import { ToolConfig } from "./allTools";

export const getAddressTool: ToolConfig = {
    definition: {
        type: 'function',
        function: {
            name: 'get_address',
            description: 'Get the address of your wallet',
            parameters: {
                type: 'object',
                properties: {}, // No parameters needed
                required: [] // No required parameters
            },
        }
    },
    handler: async () => {
        // Return the address of the wallet
        return wallet.account.address;
    }
}