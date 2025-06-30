"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createFullTask } from "@/lib/actions";
import type { Task } from "@/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { LoadingIndicator } from "./loading-indicator";
import { Wand2 } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(10, "Please describe your task in more detail.").max(200),
});

type TaskInputFormProps = {
  onTaskCreated: (task: Task) => void;
};

export function TaskInputForm({ onTaskCreated }: TaskInputFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const newTask = await createFullTask(values.title);
      onTaskCreated(newTask);
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error Creating Task",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="bg-card/30 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
          <Wand2 className="text-primary" />
          Describe a Complex Task
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isSubmitting ? (
          <div className="h-48 flex items-center justify-center">
             <LoadingIndicator text="Maestro is thinking..." />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'Plan and execute a successful cross-country road trip for 2 weeks'"
                        className="min-h-[100px] bg-background/50 focus:border-primary focus-visible:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="lg" className="w-full font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-primary hover:shadow-glow-primary-lg transition-shadow">
                Break It Down
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
