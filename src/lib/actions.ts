'use server';

import { decomposeTask } from "@/ai/flows/decompose-task";
import { estimateTaskTime } from "@/ai/flows/estimate-task-time";
import type { Task, SubTask } from "@/types";

export async function createFullTask(title: string): Promise<Task> {
  try {
    if (!title) {
      throw new Error("Task title cannot be empty.");
    }

    const { steps } = await decomposeTask({ task: title });

    if (!steps || steps.length === 0) {
      throw new Error("AI could not break down the task. Please try a different title.");
    }
    
    const { overallEstimateMinutes, subTaskEstimatesMinutes } = await estimateTaskTime({
      taskDescription: title,
      subTasks: steps,
    });

    const subTasks: SubTask[] = steps.map((step, index) => ({
      id: crypto.randomUUID(),
      description: step,
      isCompleted: false,
      estimatedMinutes: subTaskEstimatesMinutes[index] || 0,
    }));

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      subTasks,
      overallEstimateMinutes,
      createdAt: new Date().toISOString(),
    };
    
    return newTask;
  } catch (error) {
    console.error("Error creating full task:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to create task: ${error.message}`);
    }
    throw new Error("An unknown error occurred while creating the task.");
  }
}
