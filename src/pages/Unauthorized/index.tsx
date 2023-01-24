import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { styles } from "./styles";
function Unauthorized() {
  const navigate = useNavigate();

  return (
    <Box sx={styles.box}>
      <Typography variant="h1" color={"white"}>
        401
      </Typography>
      <Typography variant="h6" color={"white"}>
        You don't have permission to access this page
      </Typography>

      <Button onClick={() => navigate("/")} variant="contained" color="primary">
        Main Page
      </Button>
    </Box>
  );
}

export default Unauthorized;
