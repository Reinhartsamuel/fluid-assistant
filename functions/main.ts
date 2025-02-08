"use client"
import OpenAI from "openai"
import { createAssistant } from "./createAssistant";
import { createThread } from "./createThread";
import { createRun } from "./createRun";
import { performRun } from "./performRun";
import { Message } from "@/app/types";
import { Thread } from "openai/resources/beta/threads/threads.mjs";
import { Assistant } from "openai/resources/beta/assistants.mjs";


const client = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

async function chat(thread: Thread, assistant: Assistant, message: string,
    setMessages?: React.Dispatch<React.SetStateAction<Message[]>>,
): Promise<void> {
    while (true) {
        try {
            await client.beta.threads.messages.create(thread.id, {
                role: "user",
                content: message
            });

            const run = await createRun(client, thread, assistant.id);
            const result = await performRun(run, client, thread);

            if (setMessages) {
                setMessages((prev) => ([
                    ...prev,
                    {
                        role: 'assistant',
                        content: result.text.value
                    }
                ]))
            }
        } catch (error) {
            console.error('Error during chat:', error instanceof Error ? error.message : 'Unknown error');
        }
    }
}

export default async function main({
    message,
    setMessages,
    setLoading,
}: {
    message: string,
    setMessages?: React.Dispatch<React.SetStateAction<Message[]>>,
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>
}) {
    if (setLoading) setLoading(true)

    console.log('running...')
    const assistant = await createAssistant(client);
    console.log('assistant created')

    const thread = await createThread(client, message);
    console.log('thread created')
    const run = await createRun(client, thread, assistant.id);
    console.log('run created')
    const result = await performRun(run, client, thread)
    console.log(result, ':::result')

    await chat(
        thread,
        assistant,
        message,
        setMessages
    )
    if (setLoading) setLoading(false);
    return result
}