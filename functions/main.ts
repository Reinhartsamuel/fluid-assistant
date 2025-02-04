import OpenAI from "openai"
import { createAssistant } from "./createAssistant";
import { createThread } from "./createThread";
import { createRun } from "./createRun";
import { performRun } from "./performRun";


export default async function main(message : string) {
    const client = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
    });
    console.log('running...')
    const assistant = await createAssistant(client);
    console.log('assistant created')

    const thread = await createThread(client, message);
    console.log('thread created')
    const run = await createRun(client, thread, assistant.id);
    console.log('run created')
    const result = await performRun(run, client, thread)
    console.log(result, ':::result')
}