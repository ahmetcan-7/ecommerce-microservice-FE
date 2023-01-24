import { Box, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

function NotFound() {
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
        404
      </Typography>
      <Typography variant="h6" color="primary">
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Main Page
      </Button>
    </Box>
  );
}

export default NotFound;
