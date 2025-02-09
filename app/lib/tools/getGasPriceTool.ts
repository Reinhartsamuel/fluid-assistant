import { ToolConfig } from "./allTools";
import { createViemPublicClient } from "../viem/client";

export const getGasPriceTool: ToolConfig = {
    definition: {
        type: 'function',
        function: {
            name: 'get_gas_price',
            description: 'Get gas price for transaction',
            parameters: {
                type: 'object',
                properties: {}, // No parameters needed
                required: [] // No required parameters
            },
        }
    },
    handler: async () => {
        // Return the address of the wallet
        const publicClient = createViemPublicClient();
        const gasPrice = await publicClient.getGasPrice();
        return gasPrice;
    }
}