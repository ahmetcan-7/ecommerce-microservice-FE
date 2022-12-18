import { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme> | undefined> = {
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "darkgray",
  },
};
