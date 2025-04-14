import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../../types/Task";
import { addTask, editTask } from "../../features/application/TaskSlice";
import dayjs from "dayjs";
import { manageTaskSelector } from "../../selectors/TaskSelector";
import { isConflictTask } from "../../helper/HelperFunctions";
import {
  StyledConflictError,
  StyledErrorIconWrapper,
} from "../../styles/TaskFormDialogStyles";

interface Props {
  open: boolean;
  onClose: () => void;
  initialTask?: Task | null;
}

/**
 * TaskFormDialog is a React functional component that provides a dialog
 * interface for adding or editing a task. It allows users to input task
 * details such as title, description, start time, and end time. It handles
 * task conflict detection and provides visual feedback if a conflict is
 * detected. The component supports both adding new tasks and editing existing
 * ones based on the presence of an initial task. It leverages Redux for
 * state management and dispatches actions to add or edit tasks in the
 * application state.
 *
 * Props:
 * - open: A boolean indicating whether the dialog is open.
 * - onClose: A callback function to handle dialog closure.
 * - initialTask: An optional Task object to pre-populate the form for
 *   editing an existing task.
 */

const TaskFormDialog: React.FC<Props> = ({ open, onClose, initialTask }) => {
  const dispatch = useDispatch();
  const isEdit = Boolean(initialTask);
  const [isConflict, setisConflict] = useState(false);
  const { tasks }: { tasks: any } = useSelector(manageTaskSelector);
  const isMobile = useMediaQuery('(max-width:767px)');

  const [task, setTask] = useState<Task>({
    id: "",
    title: "",
    description: "",
    startTime: new Date(),
    endTime: new Date(),
  });

  useEffect(() => {
    if (initialTask) setTask(initialTask);
    else {
      setTask({
        id: "",
        title: "",
        description: "",
        startTime: new Date(),
        endTime: new Date(),
      });
    }
  }, [initialTask]);

/**
 * Handles the save operation for the task form.
 * Checks for task conflicts using existing tasks and the provided task details.
 * If a conflict is detected, sets the conflict state and aborts the save operation.
 * Otherwise, dispatches an action to either add a new task or edit an existing task,
 * and then closes the dialog.
 */
  const handleSave = () => {
    const newTask = {
      ...task,
      id: isEdit ? task.id : uuidv4(),
    };
    const hasConflict = isConflictTask(
      tasks,
      newTask,
      isEdit ? task.id : undefined
    );

    if (hasConflict) {
      setisConflict(true);
      return;
    }
    isEdit ? dispatch(editTask(newTask)) : dispatch(addTask(newTask));
    onDialogClose();
  };

  /**
   * Called when the dialog is closed.
   * Resets the state of the TaskFormDialog to its initial state.
   * Closes the dialog.
   */
  const onDialogClose = () => {
    onClose();
    setTask({
      id: "",
      title: "",
      description: "",
      startTime: new Date(),
      endTime: new Date(),
    });
    setisConflict(false);
  };

  return (
    <Dialog open={open} onClose={onDialogClose}>
      <DialogTitle>{isEdit ? "Edit" : "Add"} Task</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          fullWidth
          label="Title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
        <TextField
          margin="dense"
          fullWidth
          label="Description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />

        {isConflict && (
          <StyledConflictError>
            <StyledErrorIconWrapper>
              <ErrorOutlineIcon sx={{ fontSize: 16 }} />
            </StyledErrorIconWrapper>
            Time slot overlaps with another task
          </StyledConflictError>
        )}
        <Stack direction="column" spacing={2} marginTop={2}>
          <TimePicker
            label="Start Time"
            value={dayjs(task.startTime)}
            onChange={(newValue: any) => {
              newValue && setTask({ ...task, startTime: newValue });
              isConflict && setisConflict(false);
            }}
            timeSteps={{ minutes: isMobile ? 5 : 1 }}
          />
          <TimePicker
            label="End Time"
            value={dayjs(task.endTime)}
            onChange={(newValue: any) => {
              newValue && setTask({ ...task, endTime: newValue });
              isConflict && setisConflict(false);
            }}
            slotProps={{
              textField: { fullWidth: true }, // if needed
            }}
            timeSteps={{ minutes: isMobile ? 5 : 1 }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDialogClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" disabled={isConflict}>
          {isEdit ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskFormDialog;
