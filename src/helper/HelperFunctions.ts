import { Task } from "../types/Task";

export const isConflictTask = (
  tasks: Task[],
  newTask: Task,
  editingId?: string
): boolean => {
  return tasks.some((task) => {
    if (editingId && task.id === editingId) return false;
    return newTask.startTime < task.endTime && newTask.endTime > task.startTime;
  });
};
