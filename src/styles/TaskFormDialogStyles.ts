import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled error box
export const StyledConflictError = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.palette.error.light,
  color: theme.palette.error.dark,
  padding: theme.spacing(1.5, 2),
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(2),
  fontWeight: 600,
  fontSize: "1rem",
}));

export const StyledErrorIconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
  borderRadius: "50%",
  width: 24,
  height: 24,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: theme.spacing(1.5),
  fontSize: "0.875rem",
}));
