import { Navigate, Outlet, useLocation } from "react-router-dom";

interface AuthProps {
  allowedRoles: string[];
  roles: string[];
}

function RequireAuth({ allowedRoles, roles }: AuthProps) {
  const location = useLocation();

  let isPermitted = roles?.find((role) => allowedRoles?.includes(role));

  if (roles === undefined) {
    return null;
  }

  if (!isPermitted) {
    return roles ? (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }

  return <Outlet />;
}

export default RequireAuth;
