import { useEffect, useState } from "react"
import type { FrontendUser } from "@activity-manager/types"
import { getRequests } from "../utils/services/user.api"
import ErrorMessageComponent from "../components/simple_components/ErrorMessageComponent"
import RequestComponent from "../components/simple_components/RequestComponent"


function RequestPage() {

    const [requests, setRequests] = useState<FrontendUser[]>([])
    const [errorMessage, setErrorMessage] = useState('')


    useEffect(() => {
        async function fetchRequests() {
            const result = await getRequests()

            if (result.success && result.data) {
                setRequests(result.data)
            } else if(result.error) {
                setErrorMessage(result.error)
            }
        }
        fetchRequests()
    })

    return (
        <div className="flex flex-col min-h-0 w-full h-full items-center justify-center">
            <div className="flex flex-col items-center p-4 rounded-xl gap-4 shrink-0">
                <h1 className="text-2xl font-semibold"> {requests.length > 0 ? 'Pending Requests' : "You don't have any friend requests"} </h1>
            </div>
            { requests.length > 0 &&  <div className="dark:bg-darktheme-3 flex flex-col gap-4 overflow-auto scrollbar-none overscroll-contain p-4 w-1/2 h-1/2 rounded-2xl">

                {requests.map((user) => (
                    <RequestComponent
                        key={user.id}
                        user={user}
                    />
                ))}

            </div>}
            <ErrorMessageComponent errorMessage={errorMessage}/>
        </div>
    )
}

export default RequestPage