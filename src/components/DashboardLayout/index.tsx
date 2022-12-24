import { Container } from "@material-ui/core";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
function DashboardLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default DashboardLayout;
