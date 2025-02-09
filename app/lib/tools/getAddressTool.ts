'use client'
import { createWalletClient, custom } from "viem";
import { ToolConfig } from "./allTools";
import { abstractTestnet } from "viem/chains";




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
        if (typeof window === 'undefined') {
            console.error('Window is not defined. This function can only be run in the browser.');
            return;
        }
        const windowClient = createWalletClient({
            chain: abstractTestnet,
            transport: custom(window.ethereum!)
        })
        const [address] = await windowClient.getAddresses()
        return address
    }
}