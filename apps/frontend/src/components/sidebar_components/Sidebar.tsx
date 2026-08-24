import { useEffect } from "react";
import ActivityPanel from "./ActivityPanel";
import { useActivity } from "../../context/ActivityContext";

type SidebarProps = {
    isOpen: boolean
    onClose: () => void
}

function Sidebar({isOpen, onClose}: SidebarProps) {


    const {fetchNotifications} = useActivity()

    useEffect(() => {
        fetchNotifications()
    },[])
    
    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    onClick={onClose}
                />
            )}
                <div className={`
                    ${isOpen ? 'fixed' : 'hidden'}
                    lg:flex lg:sticky lg:top-0 z-40 ${isOpen ? 'w-70' : 'sm:w-25'}
                    h-screen pt-1 dark:bg-mist-900 dark:text-white flex-col items-center gap-3 border-r border-mist-700
                `}>
                    <div className="flex-1 min-h-0 h-full w-full">
                        <ActivityPanel 
                            sidebarMode={isOpen ? "LARGE" : "SMALL"}
                            onClose={onClose}
                    />
                </div>
            </div>
        </>
    )

} 
export default Sidebar;