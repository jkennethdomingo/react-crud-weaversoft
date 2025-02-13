import { Outlet, Link } from "react-router-dom";
import { useAuth } from "@/auth";
import SubmitButton from "@/components/submit-button";

function Layout() {
  const { isAuthenticated, logout } = useAuth();
  
  return (
    <>
      <nav className="flex justify-between items-center p-4 bg-gray-200">
        <div className="flex gap-4">
          {isAuthenticated ? <h1 className="text-lg font-semibold">Welcome!</h1> : null}
        </div>

        <div>
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <SubmitButton label="Logout" onClick={logout} />
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="text-blue-500">Sign In</Link>
              <Link to="/register" className="text-blue-500">Sign Up</Link>
            </div>
          )}
        </div>
      </nav>

      <div className="p-4">
        <Outlet /> {/* This is where child routes will be rendered */}
      </div>
    </>
  );
}

export default Layout;