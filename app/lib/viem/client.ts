// 1. Import modules.
import { createPublicClient, http } from 'viem'
import { abstractTestnet } from 'viem/chains'

// 2. Set up your client with desired chain & transport.
export function createViemPublicClient() {
    return createPublicClient({
        chain: abstractTestnet,
        transport: http()
    })
}