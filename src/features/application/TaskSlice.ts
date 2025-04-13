import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../types/Task";

const loadTasks = (): Task[] => {
  const saved = localStorage.getItem("tasks");
  return saved
    ? JSON.parse(saved, (key, value) =>
        key.includes("Time") ? new Date(value) : value
      )
    : [];
};

const saveTasks = (tasks: Task[]) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

interface TaskState {
  tasks: Task[];
  isTaskConflict: boolean;
}

const initialState: TaskState = {
  tasks: loadTasks(),
  isTaskConflict: false,
};

const checkConflict = (
  tasks: Task[],
  newTask: Task,
  editingId?: string
): boolean => {
  return tasks.some((task) => {
    if (editingId && task.id === editingId) return false;
    return newTask.startTime < task.endTime && newTask.endTime > task.startTime;
  });
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      if (checkConflict(state.tasks, action.payload)) {
        state.isTaskConflict = true;
        // alert("Time slot conflict!");
        return;
      }
      state.tasks.push(action.payload);
      saveTasks(state.tasks);
    },
    editTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (checkConflict(state.tasks, action.payload, action.payload.id)) {
        state.isTaskConflict = true;
        // alert("Time slot conflict!");
        return;
      }
      state.tasks[index] = action.payload;
      saveTasks(state.tasks);
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasks(state.tasks);
    },
    resetIsConflictTime(state) {
      state.isTaskConflict = false;
    },
  },
});

export const { addTask, editTask, deleteTask, resetIsConflictTime } =
  taskSlice.actions;
export default taskSlice.reducer;
