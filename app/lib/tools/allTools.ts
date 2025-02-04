import { getAddressTool } from "./getAddressTool";
import { getBalanceTool } from "./getBalanceTool";

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
    get_address: getAddressTool,

}