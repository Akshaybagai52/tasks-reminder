import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",     // Used for task block border-left
      light: "#e3f2fd",    // Used for task block background
    },
    text: {
      primary: "#000",
      secondary: "#999",   // Used for time label text
    },
    divider: "#eee",        // Used for time grid line
  },
});

export default theme;
