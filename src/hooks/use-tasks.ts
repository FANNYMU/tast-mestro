"use client";

import { useReducer, useEffect, useCallback } from "react";
import type { Task } from "@/types";

const STORAGE_KEY = "task-maestro-tasks";

type Action =
  | { type: "SET_TASKS"; payload: Task[] }
  | { type: "ADD_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "TOGGLE_SUBTASK"; payload: { taskId: string; subTaskId: string } };

const tasksReducer = (state: Task[], action: Action): Task[] => {
  switch (action.type) {
    case "SET_TASKS":
      return action.payload;
    case "ADD_TASK":
      return [action.payload, ...state];
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);
    case "TOGGLE_SUBTASK": {
      const { taskId, subTaskId } = action.payload;
      return state.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            subTasks: task.subTasks.map((subTask) => {
              if (subTask.id === subTaskId) {
                return { ...subTask, isCompleted: !subTask.isCompleted };
              }
              return subTask;
            }),
          };
        }
        return task;
      });
    }
    default:
      return state;
  }
};

export const useTasks = () => {
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const [isInitialized, setIsInitialized] = useReducer(() => true, false);

  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem(STORAGE_KEY);
      if (storedTasks) {
        dispatch({ type: "SET_TASKS", payload: JSON.parse(storedTasks) });
      }
    } catch (error) {
      console.error("Failed to load tasks from localStorage", error);
    }
    if (!isInitialized) setIsInitialized();
  }, [isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.error("Failed to save tasks to localStorage", error);
      }
    }
  }, [tasks, isInitialized]);

  const addTask = useCallback((task: Task) => {
    dispatch({ type: "ADD_TASK", payload: task });
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    dispatch({ type: "DELETE_TASK", payload: taskId });
  }, []);

  const toggleSubTask = useCallback((taskId: string, subTaskId: string) => {
    dispatch({ type: "TOGGLE_SUBTASK", payload: { taskId, subTaskId } });
  }, []);

  return { tasks, addTask, deleteTask, toggleSubTask, isInitialized };
};
