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
import { useState, useEffect } from "react";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../../utils/localStorage";

function Admin() {
  const [value, setValue] = useState(getFromLocalStorage("admin-nav") ?? 0);
  const navigate = useNavigate();

  const handleChange = (newValue: number) => {
    setValue(newValue);
    setToLocalStorage("admin-nav", newValue);
  };
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
          handleChange(newValue);
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
