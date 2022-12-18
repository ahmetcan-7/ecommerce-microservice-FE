import { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme> | undefined> = {
  appBar: { bgcolor: "secondary" },
  header: {
    mr: 2,
    display: { xs: "none", md: "flex" },
    fontFamily: "monospace",
    fontWeight: 700,
    letterSpacing: ".3rem",
    color: "inherit",
    textDecoration: "none",
  },
  icon: { display: { xs: "none", md: "flex" }, mr: 1 },
  box: { flexGrow: 1, display: { xs: "flex", md: "none" } },
  menu: {
    display: { xs: "block", md: "none" },
  },
  btn: { my: 2, color: "white", display: "block" },
  iconMobile: { display: { xs: "flex", md: "none" }, mr: 1 },
  headerMobile: {
    mr: 2,
    display: { xs: "flex", md: "none" },
    flexGrow: 1,
    fontFamily: "monospace",
    fontWeight: 700,
    letterSpacing: ".3rem",
    color: "inherit",
    textDecoration: "none",
  },
  boxMobile: { flexGrow: 1, display: { xs: "none", md: "flex" } },
};
