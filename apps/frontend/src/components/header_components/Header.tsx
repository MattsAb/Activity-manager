import { Bars3Icon } from "@heroicons/react/20/solid"
import { useState, useRef, useEffect } from "react"
import { useActivity } from "../../context/ActivityContext"
import { useAuth } from "../../context/AuthContext"
import MoreOptionsModal from "../sidebar_components/MoreOptionsModal"


type headerProps = {
    setIsOpen:(b: boolean) => void 
    isOpen: boolean
}

function Header({isOpen, setIsOpen}: headerProps) {
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
        <div className=" dark:bg-darktheme-4 bg-lighttheme-1 shrink-0 py-1 w-full z-51 border-b dark:border-darktheme-2 flex items-center">
                     <div className={`flex w-full justify-between px-5 items-center gap-3`}>
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex justify-center items-center cursor-pointer rounded-full"
                        >
                            <Bars3Icon className="w-8 h-8"/>
                        </button>
                        <div ref={ref} className="flex gap-3 items-center justify-center">
                            <h1 className={`font-semibold hidden md:block`}> {user?.username} </h1>
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
                            

                        </div>

                    </div>
            
        </div>
    )
}

export default Header