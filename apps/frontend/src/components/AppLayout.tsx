import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar_components/Sidebar";

function AppLayout() {
  return (
    <div className="flex h-screen min-h-0 dark:bg-darktheme-4 bg-lighttheme-1 text-black dark:text-white font-default">
      <Sidebar />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout