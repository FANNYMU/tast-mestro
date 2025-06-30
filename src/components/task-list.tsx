"use client";

import type { Task } from "@/types";
import { TaskCard } from "./task-card";

type TaskListProps = {
  tasks: Task[];
  onToggleSubTask: (taskId: string, subTaskId: string) => void;
  onDeleteTask: (taskId: string) => void;
};

export function TaskList({ tasks, onToggleSubTask, onDeleteTask }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 px-4 rounded-lg border-2 border-dashed border-border mt-8">
        <h2 className="text-2xl font-bold">You're All Clear!</h2>
        <p className="text-muted-foreground mt-2">
          Describe a new task above to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-8">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleSubTask={onToggleSubTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
}
