import { Box, Paper, styled } from "@mui/material";

export const StyledDayViewContainer = styled(Box)({
  position: "relative",
  height: "340px",
  borderLeft: "1px solid #ccc",
  overflowY: "auto",
});

export const StyledTimeLabel = styled(Box, {
  shouldForwardProp: (prop) => prop !== "hour",
})<any>(({ theme, hour }) => ({
  position: "absolute",
  top: `${hour * 60}px`,
  left: 0,
  width: "100%",
  borderTop: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.secondary,
  paddingLeft: theme.spacing(1),
  fontSize: 12,
}));

export const StyledTaskBlock = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "start" && prop !== "height",
})<any>(({ theme, start, height }) => ({
  position: "absolute",
  top: `${start}px`,
  left: "80px",
  right: "20px",
  height: `${height}px`,
  backgroundColor: theme.palette.primary.light,
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  padding: theme.spacing(1),
  boxShadow: theme.shadows[1],
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));
