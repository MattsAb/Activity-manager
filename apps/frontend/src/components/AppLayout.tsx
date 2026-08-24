import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar_components/Sidebar";
import Header from "./header_components/Header";
import { useState } from "react";

function AppLayout() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="flex flex-col h-screen min-h-0 dark:bg-darktheme-4 bg-lighttheme-1 text-black dark:text-white font-default">
      <Header isOpen={isOpen} setIsOpen={(b) => setIsOpen(b)}/>
      <div className="flex flex-1 min-h-0">
        <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)}/>
        <div className="w-full h-full min-h-0">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AppLayout