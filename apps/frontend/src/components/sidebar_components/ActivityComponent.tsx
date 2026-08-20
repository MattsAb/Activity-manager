import type { Activity } from "@activity-manager/types"
import { useNavigate } from "react-router-dom"

type ActiviyProps = {
    activity: Activity
    sidebarMode: "SMALL" | "LARGE"
}

function ActivityComponent({activity, sidebarMode}: ActiviyProps) {
    const navigate = useNavigate()

    const goToActivity = () => navigate(`/activity/${activity.id}`)

    function getAvatarSize(count: number): number {
        if (count <= 2) return 40
        if (count <= 4) return 32
        if (count <= 8) return 24
        return 18
    }

    function getOffset(count: number): number {
        if (count <= 2) return 20
        if (count <= 4) return 14
        if (count <= 8) return 10
        return 8
    }

    return (
        <button 
            className="rounded-full h-22 w-full p-2 hover:dark:bg-darkhover-1 hover:bg-lighthover-1 cursor-pointer flex gap-3 items-center"
            onClick={() => goToActivity()}
            >
            <div className="flex w-20 h-20 relative">
                {activity.users.map((user, i) => {
                    const size = getAvatarSize(activity.users.length)
                    const offset = getOffset(activity.users.length)
                    return (
                        <img 
                            key={user.id}
                            src={user.avatarUrl} 
                            className="rounded-full absolute top-5 border-2 dark:border-darktheme-4"
                            style={{ 
                                width: `${size}px`, 
                                height: `${size}px`, 
                                left: `${i * offset}px`, 
                                zIndex: i 
                            }}
                        />
                    )
                })}
            </div>
            {sidebarMode === "LARGE" && <h1 className="hidden lg:flex">{activity.title}</h1> }
        </button>
    )
}

export default ActivityComponent