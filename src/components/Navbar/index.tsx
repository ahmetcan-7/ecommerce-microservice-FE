import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store";
import { useNavigate } from "react-router-dom";
import { logout, userMe } from "../../store/actions/userAction";
import { showError } from "../../utils/showError";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { calculateCountOfCartItems } from "../../utils/cart";
import { setToLocalStorage } from "../../utils/localStorage";

const INITIAL_SETTINGS = ["Profile", "Account", "Logout"];
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    color: "white",
  },
}));

const Navbar = () => {
  const navigate = useNavigate();

  const { data: user, error } = useSelector((state: AppState) => state.user);

  const [settings, setSettings] = useState(INITIAL_SETTINGS);

  useEffect(() => {
    if (user?.roles?.includes("ROLE_ADMIN")) {
      setSettings((prev) =>
        prev.includes("Admin") ? prev : [...prev, "Admin"]
      );
    }
  }, []);

  const carts = useSelector((state: AppState) => state.cart);

  const dispatch = useDispatch<any>();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting: string) => {
    switch (setting) {
      case "Logout":
        dispatch(logout());
        break;
      case "Profile":
        navigate(`/profile/${user.userId}`);
        break;
      case "Account":
        navigate("/account");
        break;
      case "Admin":
        setToLocalStorage("admin-nav", 0);
        navigate("/admin");
        break;
    }
    setAnchorElUser(null);
  };

  useEffect(() => {
    error && showError(error);
  }, [error]);

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "#014C3E", color: "#FAF7ED" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            onClick={() => navigate("/")}
            sx={styles.header}
          >
            CANO
          </Typography>

          <Box sx={styles.box}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              style={{ color: "#FAF7ED" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={styles.menu}
            ></Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            onClick={() => navigate("/")}
            sx={styles.headerMobile}
          >
            CANO
          </Typography>
          <Box sx={styles.boxMobile}></Box>
          <IconButton
            aria-label="cart"
            onClick={() => navigate("/cart")}
            style={{ color: "#014C3E" }}
          >
            {carts.length > 0 ? (
              <StyledBadge
                badgeContent={calculateCountOfCartItems(carts)}
                style={{ color: "#014C3E" }}
              >
                <ShoppingCartIcon sx={{ color: "#FAF7ED" }} />
              </StyledBadge>
            ) : (
              <ShoppingCartIcon sx={{ color: "#FAF7ED" }} />
            )}
          </IconButton>
          {user.isLogedIn ? (
            <Box sx={{ flexGrow: 0, margin: "0 1rem" }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                  style={{ color: "#014C3E" }}
                >
                  <Avatar
                    alt={user.firstName + user.lastName}
                    src={user.profileImageURL ?? ""}
                  >
                    {user.firstName?.at(0)?.toUpperCase()! +
                      user.lastName?.at(0)?.toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <MenuItem
                      key={setting}
                      onClick={() => handleCloseUserMenu(setting)}
                    >
                      <Typography
                        textAlign="center"
                        sx={{ padding: "0.5rem 1rem" }}
                      >
                        {setting}{" "}
                      </Typography>
                    </MenuItem>
                  </Box>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box sx={{ display: "flex" }}>
              <Button
                style={{ color: "#FAF7ED" }}
                variant="contained"
                fullWidth
                onClick={() => navigate("/login")}
                sx={{ minWidth: "6rem" }}
              >
                Login
              </Button>
              <Button
                style={{ color: "#FAF7ED" }}
                variant="contained"
                fullWidth
                onClick={() => navigate("/register")}
                sx={{ marginLeft: "0.5rem", minWidth: "6rem" }}
              >
                Register
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
