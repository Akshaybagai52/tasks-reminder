import React from "react";
import { Task } from "../types/Task";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import {
  StyledDayViewContainer,
  StyledTaskBlock,
  StyledTimeLabel,
} from "../styles/DayViewStyles";

interface Props {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i); // 0 - 23

const getMinutesFromMidnight = (date: Date) =>
  date.getHours() * 60 + date.getMinutes();

const DayView: React.FC<Props> = ({ tasks, onEdit, onDelete }) => {
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  return (
    <StyledDayViewContainer>
      {/* Time grid */}
      {HOURS.map((hour) => (
        <StyledTimeLabel key={hour} hour={hour}>
          {new Date(0, 0, 0, hour).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </StyledTimeLabel>
      ))}

      {/* Task blocks */}
      {tasks.map((task) => {
        const start = getMinutesFromMidnight(new Date(task.startTime));
        const end = getMinutesFromMidnight(new Date(task.endTime));
        const height = Math.max(end - start, 30); // minimum height
        return (
          <StyledTaskBlock start={start} height={height} key={task.id}>
            <Box>
              <Typography variant="subtitle2">{task.title}</Typography>
              <Typography variant="caption">
                {new Date(task.startTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                -{" "}
                {new Date(task.endTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            </Box>
            <Box>
              <IconButton size="small" onClick={() => onEdit(task)}>
                <Edit fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={() => setDeleteId(task.id)}>
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          </StyledTaskBlock>
        );
      })}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this task?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button
            onClick={() => {
              if (deleteId) {
                onDelete(deleteId);
              }
              setDeleteId(null);
            }}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </StyledDayViewContainer>
  );
};

export default DayView;
