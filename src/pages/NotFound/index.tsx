import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { styles } from "./styles";

function NotFound() {
  return (
    <Box sx={styles.box}>
      <Typography variant="h1" color={"white"}>
        404
      </Typography>
      <Typography variant="h6" color={"white"}>
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Main Page
      </Button>
    </Box>
  );
}

export default NotFound;
