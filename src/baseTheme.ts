import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
      light: "#e3f2fd",
    },
    text: {
      primary: "#000",
      secondary: "#999",
    },
    error: {
      main: "#d32f2f",
      light: "#fdecea",
      dark: "#b71c1c",
    },
    divider: "#eee",
  },
});

export default theme;
