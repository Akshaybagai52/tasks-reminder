import { Task } from "../types/Task";

/**
 * Checks if the given new task conflicts with any of the existing tasks.
 * @param tasks - All existing tasks.
 * @param newTask - The new task to be added.
 * @param editingId - The ID of the task being edited, if any.
 * @returns {boolean} - True if there is a conflict, false otherwise.
 */
/**
 * Checks if two tasks conflict with each other.
 * A conflict occurs if the start time of one task is before the end time of the other task.
 * @param task1 - The first task.
 * @param task2 - The second task.
 * @returns {boolean} - True if there is a conflict, false otherwise.
 */

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
