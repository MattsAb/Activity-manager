import { useNavigate } from "react-router-dom"

type MoreOptionsProps = {
    isOpen: boolean
    onClose: () => void
}

function MoreOptionsModal ({isOpen,onClose}: MoreOptionsProps) {

    const navigate = useNavigate()

    if (!isOpen) { return (<></>)}

    const goToSearch = () => navigate('/search')
    const goToFriends = () => navigate('/friends')
    const goToCreate = () => navigate('/create')
    const goToRequests = () => navigate('/requests')
    const goToSettings = () => navigate('/settings')

    return (
        <div className="flex flex-col dark:bg-darktheme-3 bg-lighttheme-2 z-20 absolute top-60 left-10 -translate-y-full  w-30 gap-1 p-3 rounded-xl">
            <button className="hover:dark:bg-darkhover-1 rounded-2xl cursor-pointer flex gap-3 p-1"
                onClick={() => {
                    goToSearch()
                    onClose()
                }}
            >
                Search
            </button>
            <button className="hover:dark:bg-darkhover-1 rounded-2xl cursor-pointer flex gap-3 p-1"
                onClick={() => {
                    goToCreate()
                    onClose()
                }}
            >
               Create
            </button>
            <button className="hover:dark:bg-darkhover-1 rounded-2xl cursor-pointer flex gap-3 p-1"
                onClick={() => {
                    onClose()
                    goToFriends()}}
            >
                Friends
            </button>
            <button className="hover:dark:bg-darkhover-1 rounded-2xl cursor-pointer flex gap-3 p-1"
                onClick={() => {
                    onClose()
                    goToRequests()}}
            >
                Requests
            </button>
            <button 
                className="hover:dark:bg-darkhover-1 rounded-2xl cursor-pointer flex gap-3 p-1"
                onClick={() => {
                    onClose()
                    goToSettings()}}
            >
                Settings
            </button>
        </div>
    )

}

export default MoreOptionsModal