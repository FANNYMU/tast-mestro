"use client";

import { useMemo } from "react";
import type { Task } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SubTaskItem } from "./sub-task-item";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Trash2, Clock, CheckCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type TaskCardProps = {
  task: Task;
  onToggleSubTask: (taskId: string, subTaskId: string) => void;
  onDeleteTask: (taskId: string) => void;
};

export function TaskCard({ task, onToggleSubTask, onDeleteTask }: TaskCardProps) {
  const completedSubTasks = useMemo(() => task.subTasks.filter((st) => st.isCompleted).length, [task.subTasks]);
  const progress = useMemo(() => (task.subTasks.length > 0 ? (completedSubTasks / task.subTasks.length) * 100 : 0), [completedSubTasks, task.subTasks.length]);
  const timeAgo = useMemo(() => formatDistanceToNow(new Date(task.createdAt), { addSuffix: true }), [task.createdAt]);

  return (
    <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
      <AccordionItem value="item-1" className="border-none">
        <Card className="bg-card/50 backdrop-blur-lg border border-primary/20 overflow-hidden">
          <CardHeader className="p-0">
            <AccordionTrigger className="p-4 hover:no-underline">
              <div className="flex-1 text-left">
                <CardTitle className="text-xl">{task.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{task.overallEstimateMinutes} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    <span>{completedSubTasks}/{task.subTasks.length} steps</span>
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <Progress value={progress} className="h-2 [&>div]:bg-primary" />
                </div>
              </div>
            </AccordionTrigger>
          </CardHeader>
          <AccordionContent>
            <CardContent className="p-4 pt-0">
              <div className="space-y-2">
                {task.subTasks.map((subTask) => (
                  <SubTaskItem
                    key={subTask.id}
                    subTask={subTask}
                    onToggle={() => onToggleSubTask(task.id, subTask.id)}
                  />
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center bg-black/20">
              <p className="text-xs text-muted-foreground">{timeAgo}</p>
              <Button variant="ghost" size="icon" onClick={() => onDeleteTask(task.id)} className="text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete task</span>
              </Button>
            </CardFooter>
          </AccordionContent>
        </Card>
      </AccordionItem>
    </Accordion>
  );
}
