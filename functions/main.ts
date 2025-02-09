"use client"
import OpenAI from "openai"
import { createAssistant } from "./createAssistant";
import { createThread } from "./createThread";
import { createRun } from "./createRun";
import { performRun } from "./performRun";
import { Message } from "@/app/types";
import { Thread } from "openai/resources/beta/threads/threads.mjs";
import { Assistant } from "openai/resources/beta/assistants.mjs";
import { TextContentBlock } from "openai/resources/beta/threads/messages.mjs";


const client = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

export async function chat(thread: Thread, assistant: Assistant, message: string,
    setMessages?: React.Dispatch<React.SetStateAction<Message[]>>,
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> {
    if (setLoading) setLoading(true)
    try {
        await client.beta.threads.messages.create(thread.id, {
            role: "user",
            content: message
        });

        const run = await createRun(client, thread, assistant.id);
        const result = await performRun(run, client, thread);
         // Check if result is of type TextContentBlock
         if ('text' in result) {
            const textResult = result as TextContentBlock; // Type assertion
            if (setMessages) {
                setMessages((prev) => ([
                    ...prev,
                    {
                        role: 'assistant',
                        content: textResult.text.value // Now it's safe to access text.value
                    }
                ]));
            }
        } else {
            console.warn('Result is not of type TextContentBlock:', result);
        }
    } catch (error) {
        console.error('Error during chat:', error instanceof Error ? error.message : 'Unknown error');
    }
    if (setLoading) setLoading(false);
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

    console.log('running...')
    const assistant = await createAssistant(client);
    console.log('assistant created')

    const thread = await createThread(client);
    console.log('thread created')
    // const run = await createRun(client, thread, assistant.id);
    // console.log('run created')
    // const result = await performRun(run, client, thread)
    // console.log(result, ':::result')

    await chat(
        thread,
        assistant,
        message,
        setMessages,
        setLoading
    )
    // return result
}