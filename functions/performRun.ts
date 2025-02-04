import OpenAI from "openai";
import { Thread } from "openai/resources/beta/threads/threads";
import { Run } from "openai/resources/beta/threads/runs/runs";
import { handleRunToolCalls } from "@/handleRunToolCalls";

export async function performRun(run: Run, client: OpenAI, thread: Thread) {
    console.log(`run status : ${run.status}`);
    while (run.status === 'requires_action') {
        run = await handleRunToolCalls(run, client, thread);
    }

    if (run.status === 'failed') {
        const errorMsg = `Failed with error: ${run.last_error?.message || 'unknown'} `;
        console.error(`run failed : ${JSON.stringify(run.last_error)}`);

        await client.beta.threads.messages.create(thread.id, {
            role: 'assistant',
            content: errorMsg
        })

        return {
            type: 'text',
            text: {
                value: errorMsg,
                annotations: []
            }
        }
    }

    const messages = await client.beta.threads.messages.list(thread.id);
    const lastMessage = messages.data.find((message) => message.role === 'assistant');
    return lastMessage?.content[0] || {
        type: 'text',
        text: {
            value: 'no response from assistant',
            annotations: []
        }
    }

}