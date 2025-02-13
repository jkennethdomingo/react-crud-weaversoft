import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex flex-col p-5 items-center justify-center w-full min-h-screen">
      <div className="max-w-7xl flex flex-col gap-12 items-start">
        <Outlet />
      </div>
    </div>
  );
}

