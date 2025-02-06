import OpenAI from "openai"
import { Run } from "openai/resources/beta/threads/runs/runs";
import { Thread } from "openai/resources/beta/threads/threads"
import { tools } from "./app/lib/tools/allTools";

export async function handleRunToolCalls(run: Run, client: OpenAI, thread: Thread): Promise<Run> {
   const toolCalls = run.required_action?.submit_tool_outputs?.tool_calls;
   console.log(toolCalls,'toolcalls')
   if (!toolCalls) return run;
   const toolOutputs = await Promise.all(
      toolCalls.map(async (toolCall) => {
         try {
            const toolConfig = tools[toolCall.function?.name];
            if (!toolConfig) {
               console.error('tool not found');
            }
            const args = JSON.parse(toolCall.function.arguments);
            const response = await toolConfig.handler(args);
            console.log(response, 'this is response')
            return {
               tool_call_id: toolCall.id,
               output: String(response)
            };
         } catch (error) {
            if (error instanceof Error) {
               return {
                  tool_call_id: toolCall.id,
                  output: error.message
               };
            }
            return {
               tool_call_id: toolCall.id,
               output: 'An error occurred while calling the tool'
            };
         }
      })
   )

   const validOutputs = toolOutputs.filter(Boolean) as OpenAI.Beta.Threads.Runs.RunSubmitToolOutputsParams.ToolOutput[];
   console.log(validOutputs, 'validoutputs')
   if (validOutputs?.length === 0) return run;

   return client.beta.threads.runs.submitToolOutputsAndPoll(
      thread.id,
      run.id,
      { tool_outputs: validOutputs }
   )

}