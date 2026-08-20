import ActivityComponent from "./ActivityComponent"
import { useActivity } from "../../context/ActivityContext"
import { useEffect } from "react"


type ActivityPanelProps = {
    sidebarMode: "SMALL" | "LARGE"
}

function ActivityPanel({sidebarMode}: ActivityPanelProps) {

    const {activities, fetchActivities} = useActivity()

    useEffect(() => {
        fetchActivities()
    },[])

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex-1 min-h-0 overscroll-contain overflow-y-auto scrollbar-none">
                <div className="space-y-3">
                    {activities && activities.map((activity) => (
                        <ActivityComponent
                            key={activity.id}
                            activity={activity}
                            sidebarMode={sidebarMode}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ActivityPanel