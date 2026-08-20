import type { Activity} from "@activity-manager/types"
import ActivityComponent from "./ActivityComponent"
import { useAuth } from "../../context/AuthContext"


type ActivityPanelProps = {
    activities: Activity[]
    sidebarMode: "SMALL" | "LARGE"
}

function ActivityPanel({activities, sidebarMode}: ActivityPanelProps) {

    const {user} = useAuth()

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex-1 min-h-0 overscroll-contain overflow-y-auto scrollbar-none">
                <div className="space-y-3">
                    {activities && activities.map((activity) => (
                        <ActivityComponent
                            key={activity.id}
                            activity={activity}
                            user={user}
                            sidebarMode={sidebarMode}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ActivityPanel