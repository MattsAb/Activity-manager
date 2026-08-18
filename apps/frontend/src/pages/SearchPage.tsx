import { useState } from "react"
import UserComponent from "../components/search_components/UserComponent"
import type { FrontendUser } from "@activity-manager/types"


function SearchPage() {

    const [users, setUsers] = useState<FrontendUser[]>([])

    return (
        <div className="flex flex-col min-h-0 w-full h-full items-center justify-center">
            <div className="flex flex-col items-center p-4 rounded-xl gap-4 shrink-0">
                <h1 className="text-2xl font-semibold"> Search </h1>
                <input className="dark:bg-darktheme-2 rounded-2xl outline-none p-2"/>
            </div>
            { users.length > 0 &&  <div className="dark:bg-darktheme-3 flex flex-col gap-4 overflow-auto scrollbar-none overscroll-contain p-4 w-1/2 h-1/2 rounded-2xl">

                {users.map((user) => (
                    <UserComponent
                        username={user.username}
                        avatarUrl={user.avatarUrl}
                    />
                ))}

            </div>}
        </div>
    )
}

export default SearchPage