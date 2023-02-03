import { Typography } from "@material-ui/core";
import React from "react";

function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "85vh",
      }}
    >
      <Typography variant="h2">Welcome to Admin Page</Typography>
      <Typography variant="h4">Please Select Your Action Below</Typography>
    </div>
  );
}

export default Home;
