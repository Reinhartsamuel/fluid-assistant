import OpenAI from "openai";
import { Assistant } from 'openai/resources/beta/assistants';


export const createAssistant = async (client : OpenAI) : Promise<Assistant>=> {
    return await client.beta.assistants.create({
        name: 'fluid',
        description: 'Fluid is a chatbot that uses the OpenAI API to generate responses to user queries.',
        model: 'gpt-4o-mini',
        instructions : '',
        tools : []
    })
}
