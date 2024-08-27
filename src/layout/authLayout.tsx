import { Outlet } from "@tanstack/react-router";

export default function AuthLayout() {
  return (
    <div className="flex flex-col lg:flex-row w-full justify-center min-h-screen bg-slate-100">
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <Outlet />
      </div>
      <div className="w-full lg:w-1/2 lg:mt-0 hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=cover&w=1920&h=1080&q=80"
          alt="Image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
