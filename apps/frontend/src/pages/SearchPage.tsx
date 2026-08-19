import { useState } from "react"
import UserComponent from "../components/search_components/UserComponent"
import type { FrontendUser } from "@activity-manager/types"
import { getSearch } from "../utils/services/user.api"
import ErrorMessageComponent from "../components/simple_components/ErrorMessageComponent"


function SearchPage() {

    const [input, setInput] = useState('')
    const [users, setUsers] = useState<FrontendUser[]>([])

    const [errorMessage, setErrorMessage] = useState('')

    async function handleSearch() {
        const result = await getSearch(input)

        if (result.success && result.data) {
            setUsers(result.data)
        } else if (result.error) {
            setErrorMessage(result.error)
        }
    }

    return (
        <div className="flex flex-col min-h-0 w-full h-full items-center justify-center">
            <div className="flex flex-col items-center p-4 rounded-xl gap-4 shrink-0">
                <h1 className="text-2xl font-semibold"> Find Friends </h1>
                <div className="flex gap-3">
                    <input 
                        className="dark:bg-darktheme-2 dark:border-none border rounded-2xl outline-none p-2"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button className="dark:bg-darktheme-2 bg-lighttheme-2 px-2 rounded-2xl cursor-pointer hover:dark:bg-darkhover-1 hover:bg-lighthover-1"
                        onClick={() => handleSearch()}
                    >
                        Search
                    </button>
                </div>
            </div>
            { users.length > 0 &&  <div className="dark:bg-darktheme-3 bg-lighttheme-2 flex flex-col gap-4 overflow-auto scrollbar-none overscroll-contain p-4 w-1/2 h-1/2 rounded-2xl">

                {users.map((user) => (
                    <UserComponent
                        key={user.id}
                        user={user}
                    />
                ))}

            </div>}
            <ErrorMessageComponent errorMessage={errorMessage}/>
        </div>
    )
}

export default SearchPage