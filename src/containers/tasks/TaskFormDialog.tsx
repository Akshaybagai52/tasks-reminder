import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { Task } from "../../types/Task";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  addTask,
  editTask,
  resetIsConflictTime,
} from "../../features/application/TaskSlice";
import dayjs from "dayjs";
import { manageTaskSelector } from "../../selectors/TaskSelector";

interface Props {
  open: boolean;
  onClose: () => void;
  initialTask?: Task | null;
}

const TaskFormDialog: React.FC<Props> = ({ open, onClose, initialTask }) => {
  const dispatch = useDispatch();
  const isEdit = Boolean(initialTask);
  const isConflictTask = useSelector(manageTaskSelector);

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

  const handleSave = () => {
    const newTask = {
      ...task,
      id: isEdit ? task.id : uuidv4(),
    };
    isEdit ? dispatch(editTask(newTask)) : dispatch(addTask(newTask));
    // onClose();
  };

  useEffect(() => {}, [task]);

  return (
    <Dialog open={open} onClose={onClose}>
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
        {isConflictTask && <p style={{ color: "red" }}>Conflict Task</p>}
        <TimePicker
          label="Start Time"
          value={dayjs(task.startTime)}
          onChange={(newValue: any) => {
            newValue && setTask({ ...task, startTime: newValue });
            isConflictTask && dispatch(resetIsConflictTime());
          }}
        />
        <TimePicker
          label="End Time"
          value={dayjs(task.endTime)}
          onChange={(newValue: any) => {
            newValue && setTask({ ...task, endTime: newValue });
            isConflictTask && dispatch(resetIsConflictTime());
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={isConflictTask}
        >
          {isEdit ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskFormDialog;
