/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ToolConfig<T = any> {
    definition: {
        type: 'function',
        function: {
            name: string;
            description: string;
            parameters: {
                type: object;
                properties: Record<string, unknown>;
                required: string[];
            }
        }
    };
    handler : (args: T) => Promise<T>;
}



export const tools : Record<string, ToolConfig> = {
    // add more tools here
    
}