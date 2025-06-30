"use client";

import { useTasks } from "@/hooks/use-tasks";
import { TaskInputForm } from "@/components/task-input-form";
import { TaskList } from "@/components/task-list";
import { LoadingIndicator } from "@/components/loading-indicator";

export default function Home() {
  const { tasks, addTask, deleteTask, toggleSubTask, isInitialized } = useTasks();

  return (
    <main className="container mx-auto max-w-3xl p-4 md:p-8">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-primary via-accent to-primary text-transparent bg-clip-text">
          Task Maestro
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Turn complex tasks into actionable steps with AI.
        </p>
      </header>
      
      <TaskInputForm onTaskCreated={addTask} />

      {!isInitialized ? (
        <div className="mt-8">
          <LoadingIndicator text="Loading tasks..." />
        </div>
      ) : (
        <TaskList
          tasks={tasks}
          onToggleSubTask={toggleSubTask}
          onDeleteTask={deleteTask}
        />
      )}
    </main>
  );
}
