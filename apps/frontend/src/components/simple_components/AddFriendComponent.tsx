import type { FrontendUser } from "@activity-manager/types"

type AddComponentProps = {
    user: FrontendUser
    isSelected: boolean
    onSelect: () => void
}

function AddFriendComponent({user, isSelected, onSelect}: AddComponentProps) {

    return (
        <button className={`w-full rounded-xl ${isSelected ? "bg-app-1" : "dark:bg-darktheme-2"} p-3 justify-between flex items-center cursor-pointer`}
            onClick={onSelect}
        >
            <div className="flex items-center gap-3">
                <img src={user.avatarUrl} className="w-15 h-15 rounded-full"/>
                <h1 className="font-semibold text-2xl">{user.username}</h1>
            </div>
            <div
                className="flex flex-col md:flex-row gap-3 text-white"
            >
            </div>
        </button>
    )
}

export default AddFriendComponent