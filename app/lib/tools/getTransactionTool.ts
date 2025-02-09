/* eslint-disable @typescript-eslint/no-explicit-any */
import { createViemPublicClient } from "../viem/client";
import { ToolConfig } from "./allTools";

interface GetTransactionArg {
    hash: `0x${string}`;
}


function stringifyBigInts<T extends Record<string, any>>(obj: T): T {
    // Check if the input is an object
    if (obj === null || typeof obj !== 'object') {
        return obj; // Return the value as is if it's not an object
    }

    // Create a new object to hold the converted values
    const newObj: Record<string, any> = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            // Check if the value is a BigInt
            if (typeof value === 'bigint') {
                newObj[key] = value.toString(); // Convert BigInt to string
            } else {
                // Recursively call for nested objects/arrays
                newObj[key] = stringifyBigInts(value);
            }
        }
    }

    return newObj as T;
}
export const getTransactionTool: ToolConfig<GetTransactionArg> = {
    definition: {
        type: 'function',
        function: {
            name: 'get_transaction',
            description: 'Get the details of a transaction by transaction hash',
            parameters: {
                type: 'object',
                properties: {
                    hash: {
                        type: 'string',
                        description: 'The hash of the transaction on the blockchain',
                        pattern: '0x[a-fA-F0-9]{40}$',
                    }
                },
                required: ['hash']
            },
        }
    },
    handler: async ({ hash }) => {
        const client = createViemPublicClient();
        const transaction = await client.getTransaction({
            hash
        })
        const stringified = stringifyBigInts(transaction);
        console.log('stringifieddd',JSON.stringify(stringified))
        return JSON.stringify(stringified) as string;
    }
}