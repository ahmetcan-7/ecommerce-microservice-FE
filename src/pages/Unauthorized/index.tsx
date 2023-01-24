import { Box, Button, Typography } from "@material-ui/core";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { styles } from "./styles";
function Unauthorized() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h1" color="primary">
        401
      </Typography>
      <Typography variant="h6" color="primary">
        You don't have permission to access this page
      </Typography>

      <Button onClick={() => navigate("/")} variant="contained" color="primary">
        Main Page
      </Button>
    </Box>
  );
}

export default Unauthorized;
