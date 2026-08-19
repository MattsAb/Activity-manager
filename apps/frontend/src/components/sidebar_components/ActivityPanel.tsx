import type { FrontendUser } from "@activity-manager/types"
import ActivityComponent from "./ActivityComponent"


type ActivityPanelProps = {
    friends: FrontendUser[]
    sidebarMode: "SMALL" | "LARGE"
}

function ActivityPanel({friends, sidebarMode}: ActivityPanelProps) {

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex-1 min-h-0 overscroll-contain overflow-y-auto scrollbar-none">
                <div className="space-y-3">
                    {friends && friends.map((friend) => (
                        <ActivityComponent
                            key={friend.id}
                            user={friend}
                            sidebarMode={sidebarMode}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ActivityPanel