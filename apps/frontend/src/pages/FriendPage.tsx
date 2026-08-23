import type { FrontendUser } from "@activity-manager/types"
import { useEffect, useState } from "react"
import ErrorMessageComponent from "../components/simple_components/ErrorMessageComponent"
import { getFriends } from "../utils/services/user.api"
import FriendComponent from "../components/simple_components/FriendComponent"



function FriendPage() {
    const [friends, setFriends] = useState<FrontendUser[]>([])
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        async function fetchFreinds() {
            const result = await getFriends()
            if (result.success && result.data) {
                setFriends(result.data) 
            } else if (result.error) {
                setErrorMessage(result.error)
            }
        }
        fetchFreinds()
    },[])


    return (
        <div className="flex flex-col min-h-0 w-full h-full items-center p-5 justify-center">
            <div className="flex flex-col items-center p-4 rounded-xl gap-4 shrink-0">
                <h1 className="text-2xl font-semibold"> {friends.length > 0 ? 'Your Friends' : "You don't have any friends"} </h1>
            </div>
            { friends.length > 0 &&  <div className="dark:bg-darktheme-3 flex flex-col gap-4 overflow-auto scrollbar-none overscroll-contain p-4 w-full md:w-2/3 lg:w-1/2 h-1/2 rounded-2xl">

                {friends.map((user) => (
                    <FriendComponent
                        key={user.id}
                        user={user}
                    />
                ))}

            </div>}
            <ErrorMessageComponent errorMessage={errorMessage}/>
        </div>
    )
}

export default FriendPage