import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts';
import { abstractTestnet } from 'viem/chains'
import { eip712WalletActions } from 'viem/zksync';

const private_key = process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY;
const account = privateKeyToAccount(private_key as `0x${string}`);

export const wallet = createWalletClient({
    account: account,
    chain: abstractTestnet,
    transport: http()
}).extend(eip712WalletActions())