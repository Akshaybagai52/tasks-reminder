import { createSelector } from "@reduxjs/toolkit";

const selectTasks = (state: any) => state.tasks.tasks;

export const manageTaskSelector: any = createSelector(
  [selectTasks],
  (tasks) => ({
    tasks,
  })
);
