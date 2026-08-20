import { useNavigate } from "react-router-dom"

type MoreOptionsProps = {
    isOpen: boolean
}

function MoreOptionsModal ({isOpen}: MoreOptionsProps) {

    const navigate = useNavigate()

    if (!isOpen) { return (<></>)}

    const goToSearch = () => navigate('/search')
    const goToFriends = () => navigate('/friends')
    const goToRequests = () => navigate('/requests')
    const goToSettings = () => navigate('/settings')

    return (
        <div className="flex flex-col dark:bg-darktheme-3 bg-lighttheme-2 absolute top-40 left-10 -translate-y-full  w-30 gap-1 p-3 rounded-xl">
            <button className="hover:dark:bg-darkhover-1 rounded-2xl cursor-pointer flex gap-3 p-1"
                onClick={() => goToSearch()}
            >
                Search
            </button>
            <button className="hover:dark:bg-darkhover-1 rounded-2xl cursor-pointer flex gap-3 p-1"
                onClick={() => goToFriends()}
            >
                Friends
            </button>
            <button className="hover:dark:bg-darkhover-1 rounded-2xl cursor-pointer flex gap-3 p-1"
                onClick={() => goToRequests()}
            >
                Requests
            </button>
            <button 
                className="hover:dark:bg-darkhover-1 rounded-2xl cursor-pointer flex gap-3 p-1"
                onClick={() => goToSettings()}
            >
                Settings
            </button>
        </div>
    )

}

export default MoreOptionsModal