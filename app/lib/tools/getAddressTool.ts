import { createViemWalletClient } from "../viem/wallet";
import { ToolConfig } from "./allTools";

export const getAddressTool: ToolConfig = {
    definition: {
        type: 'function',
        function: {
            name: 'get_wallet_address',
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
        const walletClient = createViemWalletClient();
        if (walletClient) {
            return walletClient.account?.address
        } else {
            return {
                error: 'No wallet client found or error occured on get address method'
            }
        }
    }
}