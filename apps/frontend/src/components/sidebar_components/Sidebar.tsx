import { useEffect, useRef, useState } from "react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import ActivityPanel from "./ActivityPanel";
import { useAuth } from "../../context/AuthContext";
import MoreOptionsModal from "./MoreOptionsModal";
import { useActivity } from "../../context/ActivityContext";

function Sidebar() {

    const [isOpen, setIsOpen] = useState(true)
    const [moreOptions, setMoreOptions] = useState(false)

    const {user} = useAuth()
    const {fetchNotifications, notifications} = useActivity()

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            const target = e.target as Node;
            const clickedInsideMenu = ref.current?.contains(target);

            if (!clickedInsideMenu) {
                setMoreOptions(false);
            }
        }
        if (moreOptions) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [moreOptions]);

    useEffect(() => {
        fetchNotifications()
    },[])
    
    return (
        <>
            <div className={`
                    sticky z-40 w-30 ${isOpen && 'lg:w-70'}
                    h-screen dark:bg-darktheme-4 bg-lighttheme-1 dark:text-white flex-col items-center gap-3 border-r dark:border-darktheme-2
                `}>
                <div className="flex-col flex items-center w-full h-screen pt-2 px-2 gap-3">
                    <div className={`flex w-full items-center justify-between gap-3`}>
                        <div ref={ref} className="flex gap-3 items-center justify-center">
                            <button
                                className="h-9 w-9 border-2 border-mist-600 relative items-center flex justify-center rounded-full cursor-pointer"
                                onClick={() => setMoreOptions(!moreOptions)}
                            >
                                <img className="rounded-full w-8 h-8" src={user?.avatarUrl}/>
                                {notifications?.requests !== undefined 
                                    && notifications?.requests > 0 
                                    && !moreOptions &&  
                                <div 
                                    className="h-5 w-5 rounded-full flex items-center justify-center left-4 top-4 bg-red-500 border-2 dark:border-darktheme-2 border-lighttheme-1 font-semibold text-white absolute"
                                >
                                    {`${notifications?.requests}`}
                                </div>}

                            </button>

                            <MoreOptionsModal 
                                onClose={() => setMoreOptions(false)}
                                requests={notifications?.requests || 0}
                                isOpen={moreOptions}
                            />
                            <h1 className={`font-semibold hidden ${isOpen && 'lg:block'}`}> {user?.username} </h1>

                        </div>
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex justify-center items-center cursor-pointer rounded-full"
                        >
                            <Bars3Icon className="w-8 h-8"/>
                        </button>
                    </div>
                    <div className="flex-1 min-h-0 w-full">
                        <ActivityPanel sidebarMode={isOpen ? "LARGE" : "SMALL"}/>
                    </div>
                </div>
            </div>
        </>
    )

} 
export default Sidebar;