import { tools } from "@/app/lib/tools/allTools";
import OpenAI from "openai";
import { Assistant } from 'openai/resources/beta/assistants';


export const createAssistant = async (client: OpenAI): Promise<Assistant> => {
    return await client.beta.assistants.create({
        name: 'Fluid',
        model: 'gpt-4o-mini',
        instructions: `
            You are a powerful AI assistant that has the capabilities to perform
            onchain actions.
            You can use the following tools to interact with the wallet:
            - get_balance : get the balance of the wallet
            - get_wallet_address : get the wallet address
        `,
        tools: Object.values(tools).map((x) => x.definition)
    })
}

