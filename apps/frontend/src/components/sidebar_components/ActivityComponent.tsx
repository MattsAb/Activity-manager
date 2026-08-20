import type { Activity, FrontendUser } from "@activity-manager/types"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

type ActiviyProps = {
    activity: Activity
    sidebarMode: "SMALL" | "LARGE"
    user?: FrontendUser
}

function ActivityComponent({activity, sidebarMode, user}: ActiviyProps) {
    const [showUser, setShowUser] = useState<FrontendUser>()
    const navigate = useNavigate()

    const goToActivity = () => navigate(`/activity/${activity.id}`)

    const getShowUser = (): FrontendUser => {
        if (!showUser) {
            activity.users.forEach((u) => {
                if (u.id !== user?.id) {setShowUser(u)}
            })
            return showUser
        }
        else return showUser
    }
    getShowUser()

    return (
        <button 
            className="rounded-full h-22 w-full p-2 hover:dark:bg-darkhover-1 hover:bg-lighthover-1 cursor-pointer flex gap-3 items-center"
            onClick={() => goToActivity()}
            >
            <div className="w-20 h-20 dark:bg-mist-700 rounded-full"/>
            {sidebarMode === "LARGE" && <h1 className="hidden lg:flex">{showUser?.username}</h1> }
        </button>
    )
}

export default ActivityComponent