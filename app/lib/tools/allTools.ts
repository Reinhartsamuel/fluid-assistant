import { getAddressTool } from "./getAddressTool";
import { getBalanceTool } from "./getBalanceTool";
import { getGasPriceTool } from "./getGasPriceTool";
import { getTransactionTool } from "./getTransactionTool";
import { sendTransactionTool } from "./sendTransactionTool";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ToolConfig<T = any> {
    definition: {
        type: 'function',
        function: {
            name: string;
            description: string;
            parameters: {
                type: 'object';
                properties: Record<string, unknown>;
                required: string[];
            }
        }
    };
    handler: (args: T) => Promise<any>;
}



export const tools: Record<string, ToolConfig> = {
    // add more tools here
    get_balance : getBalanceTool,
    get_wallet_address: getAddressTool,
    get_transaction: getTransactionTool,
    send_transaction : sendTransactionTool,
    get_gas_price : getGasPriceTool
}