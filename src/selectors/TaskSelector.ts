import { createSelector } from "@reduxjs/toolkit";

const selectIsTaskConflict = (state: any) => state.tasks.isTaskConflict;
const selectTasks = (state: any) => state.tasks.tasks;

export const manageTaskSelector: any = createSelector(
  [selectIsTaskConflict, selectTasks],
  (isTaskConflict, tasks) => ({
    isTaskConflict,
    tasks,
  })
);
