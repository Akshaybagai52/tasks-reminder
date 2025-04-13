import React from "react";
import { Task } from "../types/Task";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

interface Props {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const DayView: React.FC<Props> = ({ tasks, onEdit, onDelete }) => {
  return (
    <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
      <Stack spacing={2}>
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between">
                <div>
                  <Typography variant="h6">{task.title}</Typography>
                  <Typography variant="body2">{task.description}</Typography>
                  <Typography variant="caption">
                    {new Date(task.startTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -
                    {new Date(task.endTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                </div>
                <div>
                  <IconButton onClick={() => onEdit(task)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => onDelete(task.id)}>
                    <Delete />
                  </IconButton>
                </div>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </div>
  );
};

export default DayView;
