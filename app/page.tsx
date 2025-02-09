/* eslint-disable @next/next/no-img-element */
'use client';
import { chat } from "@/functions/main";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Message } from "./types";
import { Spinner } from "@/components/ui/spinner";


import { Thread } from "openai/resources/beta/threads/threads.mjs";
import { Assistant } from "openai/resources/beta/assistants.mjs";
import { createAssistant } from "@/functions/createAssistant";
import { createThread } from "@/functions/createThread";
import OpenAI from "openai";
import ReactMarkdown from 'react-markdown'


const client = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

import { cn } from "@/lib/utils";

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const [assistant, setAssistant] = useState<Assistant | null>(null);
  const [thread, setThread] = useState<Thread | null>(null);


  async function handlePromptChat() {
    await chat(
      thread!,
      assistant!,
      prompt,
      setMessages,
      setLoading
    )
  }

  useEffect(() => {
    async function init() {
      const assistant = await createAssistant(client);
      setAssistant(assistant);
      console.log('assistant created')

      const thread = await createThread(client);
      setThread(thread)
      console.log('thread created')
    }
    init();
  }, [])

  async function handlePrompt() {
    setMessages((prev) => ([
      ...prev,
      {
        role: 'user',
        content: prompt
      }
    ]))
    setPrompt('');
    await handlePromptChat();
  }
  return (
    <div className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="w-[40rem] flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <p className="text-xl italic underline font-bold">Start chat with Fluid</p>

        <div className="w-full">
          <div className="flex flex-col gap-10">
            {messages.map((message, index) => (
              <div
                key={index}
                className="flex items-start gap-10"
              >
                <img
                  src={message.role === 'user' ? 'https://avatar.iran.liara.run/public/boy?username=Ash' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXFeKWfFSa3lWMFVU1cho8IM2jm6Leqg7SOQ&s'}
                  alt="User icon"
                  // width={20}
                  // height={20}
                  // style={{ objectFit: 'cover' }}
                  className="h-8 w-8 rounded-full bg-black/[.05] dark:bg-white/[.06] object-cover"
                />
                <ReactMarkdown className={cn('break-words whitespace-pre-wrap', message.role === 'user' ? 'text-gray-400' : 'text-gray-100')}>
                  {message.content}
                </ReactMarkdown>
              </div>
            ))}
            {loading && <Spinner />}
          </div>
        </div>

        <div className="flex w-[40rem] items-center space-x-2 fixed bottom-10">
          <Input
            type="text"
            placeholder="message"
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handlePrompt();
            }}
            className="border-2 border-red-500"
          />
          <Button
            type="submit"
            onClick={handlePrompt}
          >
            post
          </Button>
        </div>
      </main>
      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}
