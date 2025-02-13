import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/auth";

const GuestRoute = ({ redirectPath = "/dashboard" }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default GuestRoute;