import type { FrontendUser } from "@activity-manager/types"
import { use, useState } from "react"
import ErrorMessageComponent from "../simple_components/ErrorMessageComponent"
import { sendRequest } from "../../utils/services/user.api"


type UserComponentProps = {
    user: FrontendUser
}


function UserComponent({user}: UserComponentProps) {

    const [isAdded, setIsAdded] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    async function handleSend() {
        const result = await sendRequest(user.id)
        if (result.success) {
            setIsAdded(true)
        } else if (result.error) {
            setErrorMessage(errorMessage)
        }
    }


    return (
        <div className="w-full rounded-xl dark:bg-darktheme-2 bg-lighttheme-2 p-3 justify-between flex items-center">
            <div className="flex items-center gap-3">
                <img src={user?.avatarUrl} className="w-15 h-15 rounded-full"/>
                <h1 className="font-semibold text-2xl">{user.username}</h1>
            </div>
            <ErrorMessageComponent errorMessage={errorMessage}/>
            <button 
                className={`font-semibold ${isAdded ? "dark:bg-darktheme-4 px-2" :"bg-app-2 p-3 hover:bg-apphover-1 text-white cursor-pointer"} rounded-full flex justify-self-end`}
                onClick={() => handleSend()}
            >
                {isAdded ? "Sent" : "Send request"}
            </button>
        </div>
    )
}

export default UserComponent