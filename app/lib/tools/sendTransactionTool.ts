'use client'
import { Address, custom, createWalletClient, parseEther } from 'viem'
import { ToolConfig } from './allTools.js';
import { abstractTestnet } from 'viem/chains';
interface SendTransactionArgs {
    to: Address;
    value: string;
}

export const sendTransactionTool: ToolConfig<SendTransactionArgs> = {
    definition: {
        type: 'function',
        function: {
            name: 'send_transaction',
            description: 'Send a transaction with optional parameters',
            parameters: {
                type: 'object',
                properties: {
                    to: {
                        type: 'string',
                        pattern: '^0x[a-fA-F0-9]{40}$',
                        description: 'The recipient address',
                    },
                    value: {
                        type: 'string',
                        description: 'The amount of ETH to send (in ETH, not Wei). If the user prompts using ETH, convert that to Wei.',
                        optional: true,
                    },
                },
                required: ['to', 'value']
            }
        }
    },
    handler: async (args) => {
        const result = await sendTransaction(args);
        if (!result?.success || !result.hash) throw new Error(result?.message);
        return result.hash;
    }
};

async function sendTransaction({
    to,
    value,
}: SendTransactionArgs) {
    try {
        let hash = '0x';
        if (typeof window === 'undefined') {
            console.error('Window is not defined. This function can only be run in the browser.');
            return;
        }
        const walletClient = createWalletClient({
            chain: abstractTestnet,
            transport: custom(window.ethereum!)
        })
        const [address] = await walletClient.getAddresses()
        hash = await walletClient.sendTransaction({
            account: address,
            to: to,
            value: parseEther(value)
        })

        return {
            success: true,
            hash,
            message: `Transaction sent successfully. Hash: ${hash}`
        }
    } catch (error) {
        return {
            success: false,
            hash: null,
            message: `Failed to send transaction: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
    }
}
