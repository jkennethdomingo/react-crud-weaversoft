import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/auth";

const ProtectedRoute = ({ redirectPath = "/login" }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;