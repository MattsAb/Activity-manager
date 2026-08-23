import { useEffect, useState } from "react"
import { getFriends } from "../utils/services/user.api"
import type { FrontendUser } from "@activity-manager/types"
import { useNavigate } from "react-router-dom"
import { createActivity } from "../utils/services/activity.api"
import ErrorMessageComponent from "../components/simple_components/ErrorMessageComponent"
import AddFriendComponent from "../components/simple_components/AddFriendComponent"
import { useActivity } from "../context/ActivityContext"
import { ClipLoader } from "react-spinners"

function CreateActivityPage() {

    const [friends, setFriends] = useState<FrontendUser[]>([])
    const [titleinput, setTitleInput] = useState('')
    const [selected, setSelected] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const {fetchActivities} = useActivity()
    const navigate = useNavigate()

    async function handleCreate() {
        setLoading(true)
        const result = await createActivity(selected, titleinput)
        if (result.success && result.data) {
            fetchActivities()
            navigate(`/activity/${result.data.id}`)
        } else if (result.error) {
            setErrorMessage(result.error)
        }
        setLoading(false)
    }

    const goToHome = () => navigate('/')

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
    })

    return (
        <div className="w-full h-full flex flex-col gap-5 items-center justify-center p-5">
            <h1 className="font-semibold text-2xl">Create your Acitivty</h1>
            <div className="flex flex-col items-center gap-3">
                <h2 className="font-semibold text-xl">Acitivty Name</h2>
                <input
                    value={titleinput}
                    maxLength={30}
                    onChange={(e) => setTitleInput(e.target.value)}
                    className="p-2 outline-none rounded-2xl dark:bg-darktheme-3 dark:border-none border"
                    placeholder="activity name..."
                />
            <ErrorMessageComponent errorMessage={errorMessage}/>
            </div>
                { friends.length > 0 &&  <div className="dark:bg-darktheme-3 bg-lighttheme-2 flex flex-col gap-4 overflow-auto scrollbar-none overscroll-contain p-4 w-full md:w-2/3 lg:w-1/2 h-1/2 rounded-2xl">

                {friends.map((user) => (
                    <AddFriendComponent
                        key={user.id}
                        user={user}
                        isSelected={selected.includes(user.id)}
                        onSelect={() => {
                            if (selected.includes(user.id)) {
                                setSelected(prev => prev.filter(i => i !== user.id))
                            } else {
                                setSelected(prev => [...prev, user.id])
                            }
                        }}
                    />
                ))}

            </div>}
            <ClipLoader
                loading={loading}
                color="#009689"
                size={25}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            <div className="flex gap-4 text-white">
                <button className="rounded-xl bg-app-2 px-3 py-1 text-xl cursor-pointer"
                    onClick={() => goToHome()}
                >
                    Cancel
                </button>
                <button className="rounded-xl bg-app-2 px-3 py-1 text-xl cursor-pointer"
                    onClick={() => handleCreate()}
                >
                    Create
                </button>
            </div>
        </div>
    )
}

export default CreateActivityPage