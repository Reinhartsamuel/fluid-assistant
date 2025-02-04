import { createWalletClient, http } from 'viem'
import { abstractTestnet } from 'viem/chains'
import { eip712WalletActions } from 'viem/zksync';

export const wallet = createWalletClient({
    chain: abstractTestnet,
    transport: http()
}).extend(eip712WalletActions())