'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DecomposeTaskInputSchema = z.object({
  task: z.string().describe('The complex task to be broken down into smaller steps.'),
});
export type DecomposeTaskInput = z.infer<typeof DecomposeTaskInputSchema>;

const DecomposeTaskOutputSchema = z.object({
  steps: z.array(z.string()).describe('The list of smaller, manageable steps.'),
});
export type DecomposeTaskOutput = z.infer<typeof DecomposeTaskOutputSchema>;

export async function decomposeTask(input: DecomposeTaskInput): Promise<DecomposeTaskOutput> {
  return decomposeTaskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'decomposeTaskPrompt',
  input: {schema: DecomposeTaskInputSchema},
  output: {schema: DecomposeTaskOutputSchema},
  prompt: `You are a helpful task management assistant. Your goal is to break down a complex task into a sequence of smaller, more manageable steps.

Task: {{{task}}}

Steps:`,
});

const decomposeTaskFlow = ai.defineFlow(
  {
    name: 'decomposeTaskFlow',
    inputSchema: DecomposeTaskInputSchema,
    outputSchema: DecomposeTaskOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
