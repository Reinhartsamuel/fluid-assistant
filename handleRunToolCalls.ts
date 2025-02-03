import OpenAI from "openai"
import { Run } from "openai/resources/beta/threads/runs/runs";
import { Thread } from "openai/resources/beta/threads/threads"
import { tools } from "./app/utils/tools/allTools";

export async function handleRunToolCalls(run: Run, client: OpenAI, thread: Thread): Promise<Run> {
     const toolCalls = run.required_action?.submit_tool_outputs?.tool_calls;
     if (!toolCalls) {
        throw new Error('no tool calls');
     }
     const toolCall = toolCalls[0];


     return await run;

}