/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatEther } from "viem";
import { createViemPublicClient } from "../viem/client";
import { ToolConfig } from "./allTools";

interface GetBalanceArg {
    wallet: string;
}
export const getBalanceTool: ToolConfig<GetBalanceArg> = {
    definition: {
        type: 'function',
        function: {
            name: 'get_balance',
            description: 'Get the balance of a wallet',
            parameters: {
                type: 'object',
                properties: {
                    wallet: {
                        type: 'string',
                        description: 'The wallet address to get balance',
                        pattern: '0x[a-fA-F0-9]{40}$',
                    }
                },
                required: ['wallet']
            },
        }
    },
    handler: async ({ wallet }) => {
        console.log('running getBalance handler');
        const client = createViemPublicClient();
        const balance = await client.getBalance({ address: wallet as `0x${string}`});
        return formatEther(balance) as string;
    }
}