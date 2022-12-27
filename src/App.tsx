import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Unauthorized from "./pages/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken, userMe } from "./store/actions/userAction";
import { AppState } from "./store";
import Loader from "./components/Loader";

function App() {
  const dispatch = useDispatch<any>();
  const { data, loading } = useSelector((state: AppState) => state.user);

  useEffect(() => {
    if (localStorage.getItem("access-token")) {
      dispatch(userMe());

      // else if (!data.isRefreshTokenExpired && !data.isAccessTokenExpired) {
      //   dispatch(userMe())
      // }
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            element={
              <RequireAuth
                allowedRoles={["ROLE_ADMIN", "ROLE_SUPER_ADMIN"]}
                roles={data.roles}
              />
            }
          >
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
}

export default App;
