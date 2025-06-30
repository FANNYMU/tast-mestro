"use client";

import type { SubTask } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type SubTaskItemProps = {
  subTask: SubTask;
  onToggle: () => void;
};

export function SubTaskItem({ subTask, onToggle }: SubTaskItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 p-3 rounded-lg transition-all duration-300 group",
        subTask.isCompleted ? "bg-primary/10" : "hover:bg-white/5"
      )}
    >
      <Checkbox
        id={`subtask-${subTask.id}`}
        checked={subTask.isCompleted}
        onCheckedChange={onToggle}
        className={cn("h-6 w-6 rounded-full transition-all duration-300",
        "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground border-2 border-primary",
        subTask.isCompleted && "shadow-glow-primary scale-110"
        )}
      />
      <label
        htmlFor={`subtask-${subTask.id}`}
        className={cn(
          "flex-1 cursor-pointer transition-opacity",
          subTask.isCompleted ? "line-through opacity-50" : "opacity-100"
        )}
      >
        {subTask.description}
      </label>
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Clock className="h-4 w-4" />
        <span>{subTask.estimatedMinutes} min</span>
      </div>
    </div>
  );
}
