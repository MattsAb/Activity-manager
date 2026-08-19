import type { FrontendUser } from "@activity-manager/types"
import { useState } from "react"
import ErrorMessageComponent from "../simple_components/ErrorMessageComponent"
import { addFriend, declineRequest } from "../../utils/services/user.api"

type UserComponentProps = {
    user: FrontendUser
}

function RequestComponent({user}: UserComponentProps) {

    const [visible, setVisible] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')

    async function handleRequest(answer: "ACCEPTED" | "DECLINED") {
        let result
        if (answer == "ACCEPTED"){
            result = await addFriend(user.id)
        } else {
            result = await declineRequest(user.id)
        }
        if (result.success) {
            setVisible(false)
        } else if (result.error) {
            setErrorMessage(errorMessage)
        }
    }

    if (!visible) return (<></>)

    return (
        <div className="w-full rounded-xl dark:bg-darktheme-2 p-3 justify-between flex items-center">
            <div className="flex items-center gap-3">
                <div className="w-15 h-15 rounded-full bg-amber-900"/>
                <h1 className="font-semibold text-2xl">{user.username}</h1>
            </div>
            <ErrorMessageComponent errorMessage={errorMessage}/>
            <div
                className="flex gap-3 text-white"
            >
                <button 
                    className={`font-semibold "bg-app-2 p-3 bg-app-2 hover:bg-apphover-1 cursor-pointer rounded-full flex justify-self-end`}
                    onClick={() => handleRequest("DECLINED")}
                >
                    Decline
                </button>
                <button 
                    className={`font-semibold "bg-app-2 p-3 bg-app-2 hover:bg-apphover-1 cursor-pointer rounded-full flex justify-self-end`}
                    onClick={() => handleRequest("ACCEPTED")}
                >
                    Accept
                </button>
            </div>
        </div>
    )
}

export default RequestComponent