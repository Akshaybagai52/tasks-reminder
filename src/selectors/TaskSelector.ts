import { createSelector } from "@reduxjs/toolkit";

const selectIsTaskConflict = (state: any) => state.tasks.isTaskConflict;

export const manageTaskSelector: any = createSelector(
    selectIsTaskConflict,
  (isTaskConflict) => isTaskConflict
);
