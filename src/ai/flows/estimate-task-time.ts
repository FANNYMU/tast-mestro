'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EstimateTaskTimeInputSchema = z.object({
  taskDescription: z
    .string()
    .describe('The description of the overall task.'),
  subTasks: z
    .array(z.string())
    .describe('An array of sub-task descriptions.'),
});
export type EstimateTaskTimeInput = z.infer<typeof EstimateTaskTimeInputSchema>;

const EstimateTaskTimeOutputSchema = z.object({
  overallEstimateMinutes: z
    .number()
    .describe('AI estimate in minutes for the overall task.'),
  subTaskEstimatesMinutes: z
    .array(z.number())
    .describe('AI estimates in minutes for each sub-task.'),
});
export type EstimateTaskTimeOutput = z.infer<typeof EstimateTaskTimeOutputSchema>;

export async function estimateTaskTime(input: EstimateTaskTimeInput): Promise<EstimateTaskTimeOutput> {
  return estimateTaskTimeFlow(input);
}

const estimateTaskTimePrompt = ai.definePrompt({
  name: 'estimateTaskTimePrompt',
  input: {schema: EstimateTaskTimeInputSchema},
  output: {schema: EstimateTaskTimeOutputSchema},
  prompt: `You are an AI assistant specializing in estimating time required for tasks.

You will be given a task description and a list of sub-tasks. Provide an estimate in minutes for the overall task, and for each of the sub-tasks.

Task: {{{taskDescription}}}
Sub-tasks:
{{#each subTasks}}- {{{this}}}
{{/each}}
`,
});

const estimateTaskTimeFlow = ai.defineFlow(
  {
    name: 'estimateTaskTimeFlow',
    inputSchema: EstimateTaskTimeInputSchema,
    outputSchema: EstimateTaskTimeOutputSchema,
  },
  async input => {
    const {output} = await estimateTaskTimePrompt(input);
    return output!;
  }
);
