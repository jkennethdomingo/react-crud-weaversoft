import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const GuestRoute = ({redirectPath = "/dashboard"}) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to={redirectPath} replace/> : <Outlet/>;
}

export default GuestRoute;