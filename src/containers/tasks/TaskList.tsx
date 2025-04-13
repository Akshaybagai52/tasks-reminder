import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { Task } from "../../types/Task";
import { Button, Stack } from "@mui/material";
import TaskFormDialog from "./TaskFormDialog";
import DayView from "../../components/DayView";
import { deleteTask } from "../../features/application/TaskSlice";
import { StyledFilterTextField } from "../../styles/TaskListStyles";

/**
 * TaskList component.
 *
 * This component displays a list of tasks in a day view layout.
 * It provides a filter by title field and an add task button.
 * It also displays the tasks in a day view layout, with the ability to edit
 * and delete tasks.
 *
 */
const TaskList: React.FC = () => {
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(filter.toLowerCase()))
    .sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );

  return (
    <Fragment>
      <Stack direction="row" spacing={2} mb={2} justifyContent="space-between">
        <StyledFilterTextField
          label="Filter by Title"
          variant="outlined"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => {
            setDialogOpen(true);
            setSelectedTask(null);
          }}
        >
          Add Task
        </Button>
      </Stack>

      <DayView
        tasks={filteredTasks}
        onEdit={(task) => {
          setSelectedTask(task);
          setDialogOpen(true);
        }}
        onDelete={(id) => dispatch(deleteTask(id))}
      />

      <TaskFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        initialTask={selectedTask}
      />
    </Fragment>
  );
};

export default TaskList;
