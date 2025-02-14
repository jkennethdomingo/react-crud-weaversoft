import { Routes, Route } from "react-router-dom"

import { Layout } from "@/layout"

import { Login, LoginToolpad, Register } from "@/pages/auth"
import { Dashboard } from "@/pages/admin"
import { Home } from "@/pages/guest"
import { NotFound } from "@/pages/misc"

import ProtectedRoute from './ProtectedRoute'
import GuestRoute from './GuestRoute'

const AppRoutes = () => {
  const guestRoutes = [
    { path: "/", element: <Home/> },
    { path: "login", element: <Login/> },
    { path: "login-toolpad", element: <LoginToolpad/> },
    { path: "register", element: <Register/> },
  ];

  const protectedRoutes = [
    { path: "dashboard", element: <Dashboard/> }
  ];
  
  return(
    <Routes>
      <Route element={<Layout/>}>

        {/* Guest Routes */}
        <Route element={<GuestRoute/>}>
          {guestRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element}/>
          ))}
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute/>}>
          {protectedRoutes.map(({path, element}) => (
            <Route key={path} path={path} element={element}/>
          ))}
        </Route>

        {/*Error Pages*/}
        <Route path="*" element={<NotFound/>}/>
        
      </Route>
    </Routes>
  );
}

export default AppRoutes;