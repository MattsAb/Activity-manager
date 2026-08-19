import type { FrontendUser } from "@activity-manager/types"
import { useNavigate } from "react-router-dom"

type ActiviyProps = {
    user: FrontendUser
    sidebarMode: "SMALL" | "LARGE"
}

function ActivityComponent({user, sidebarMode}: ActiviyProps) {

    const navigate = useNavigate()

    const goToActivity = () => navigate(`/activity/${user.id}`)

    return (
        <button 
            className="rounded-full h-22 w-full p-2 hover:dark:bg-darkhover-1 hover:bg-lighthover-1 cursor-pointer flex gap-3 items-center"
            onClick={() => goToActivity()}
            >
            <div className="w-20 h-20 dark:bg-mist-700 rounded-full"/>
            {sidebarMode === "LARGE" && <h1 className="hidden lg:flex">{user.username}</h1> }
        </button>
    )
}

export default ActivityComponent