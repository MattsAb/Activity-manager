import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar_components/Sidebar";

function AppLayout() {
  return (
    <div className="flex min-h-screen dark:bg-darktheme-4 bg-lighttheme-1 text-black dark:text-white font-default">
      <Sidebar />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout