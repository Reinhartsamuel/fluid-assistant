import { wallet } from "../viem/wallet";
import { ToolConfig } from "./allTools";

export const getContractAbi: ToolConfig = {
    definition: {
        type: 'function',
        function: {
            name: 'get_contract_abi',
            description: 'Get the abi of a smart contract with provided contract address',
            parameters: {
                type: 'object',
                properties: {}, // No parameters needed
                required: [] // No required parameters
            },
        }
    },
    handler: async () => {
        // Return the address of the wallet
        return ''
    }
}