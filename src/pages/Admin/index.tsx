import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
} from "@material-ui/core";
import { Outlet, useNavigate } from "react-router-dom";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import React, { useState } from "react";

function Admin() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginBottom: "5rem",
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        style={{ position: "fixed", bottom: "0", width: "50%" }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          onClick={() => navigate(`/admin`)}
        />
        <BottomNavigationAction
          label="Products"
          icon={<ShoppingCartCheckoutIcon />}
          onClick={() => navigate(`/admin/products`)}
        />
        <BottomNavigationAction
          label="Categories"
          icon={<CategoryIcon />}
          onClick={() => navigate(`/admin/categories`)}
        />
        <BottomNavigationAction
          label="Orders"
          icon={<ReceiptLongIcon />}
          onClick={() => navigate(`/admin/orders`)}
        />
      </BottomNavigation>
      <Outlet />
    </Box>
  );
}

export default Admin;
