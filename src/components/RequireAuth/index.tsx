import { Navigate, Outlet, useLocation } from "react-router-dom";

interface AuthProps {
  allowedRoles: string[];
  roles: string[];
}

function RequireAuth({ allowedRoles, roles }: AuthProps) {
  const location = useLocation();

  console.log("role", roles);
  let isPermitted = roles?.find((role) => allowedRoles?.includes(role));

  const token = localStorage.getItem("access-token");

  // if (!token) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  // if (!isPermitted) {
  //   return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  // }

  return <Outlet />;
}

export default RequireAuth;
