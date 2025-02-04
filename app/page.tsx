'use client';
import Image from "next/image";
import main from "@/functions/main";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Message } from "./types";



export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  function handlePrompt () {
    setMessages((prev) => ([
      ...prev,
      {
        role: 'user',
        content: prompt
      }
    ]))
    main(prompt, setMessages);
    setPrompt('')
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className="flex items-center gap-2"
              >
                <div className="h-8 w-8 rounded-full bg-black/[.05] dark:bg-white/[.06]">
                  <Image
                    src={message.role === 'user' ? 'https://avatar.iran.liara.run/public/boy?username=Ash' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXFeKWfFSa3lWMFVU1cho8IM2jm6Leqg7SOQ&s'}
                    alt="User icon"
                    width={20}
                    height={20}
                    style={{objectFit: 'contain'}}
                  />
                </div>
                <p>{message.content}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="message"
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handlePrompt();
            }}
          />
          <Button
            type="submit"
            onClick={handlePrompt}
          >
            post
          </Button>
        </div>

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
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
      </footer>
    </div>
  );
}
