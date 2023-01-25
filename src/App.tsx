import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken, userMe } from "./store/actions/userAction";
import { AppState } from "./store";
import Loader from "./components/Loader";

function App() {
  const dispatch = useDispatch<any>();
  const { data, loading } = useSelector((state: AppState) => state.user);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("access-token")) {
      dispatch(userMe());
    }
    setInitialLoading(false);
  }, []);

  if (loading || initialLoading) {
    return <Loader />;
  }

  const Admin = React.lazy(() => import("./pages/Admin"));
  const Cart = React.lazy(() => import("./pages/Cart"));

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Products />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              element={
                <RequireAuth
                  allowedRoles={["ROLE_ADMIN", "ROLE_SUPER_ADMIN"]}
                  roles={data.roles}
                />
              }
            >
              <Route path="admin" element={<Admin />} />
            </Route>
            <Route
              element={
                <RequireAuth allowedRoles={["ROLE_USER"]} roles={data.roles} />
              }
            >
              <Route path="cart" element={<Cart />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
