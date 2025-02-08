import { createWalletClient, custom } from "viem";
import { ToolConfig } from "./allTools";
import { abstractTestnet } from "viem/chains";

const windowClient = createWalletClient({
  chain: abstractTestnet,
  transport: custom(window.ethereum!)
})


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
        const [address] = await windowClient.getAddresses()
        return address
    }
}