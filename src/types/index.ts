export type SubTask = {
  id: string;
  description: string;
  isCompleted: boolean;
  estimatedMinutes: number;
};

export type Task = {
  id: string;
  title: string;
  subTasks: SubTask[];
  overallEstimateMinutes: number;
  createdAt: string; // ISO string
};
