import React from "react";
import { Container, Typography } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import TaskList from "./containers/tasks/TaskList";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const App: React.FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Task Scheduler
        </Typography>
        <TaskList />
      </Container>
    </LocalizationProvider>
  );
};

export default App;
