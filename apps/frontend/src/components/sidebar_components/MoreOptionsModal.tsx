import { useNavigate } from "react-router-dom"
import { Cog6ToothIcon, MagnifyingGlassIcon, UsersIcon, PlusIcon, EnvelopeIcon } from "@heroicons/react/20/solid"

type MoreOptionsProps = {
    isOpen: boolean
    onClose: () => void
    requests: number
}

function MoreOptionsModal ({isOpen,onClose, requests}: MoreOptionsProps) {

    const navigate = useNavigate()

    if (!isOpen) { return (<></>)}

    const goToSearch = () => navigate('/search')
    const goToFriends = () => navigate('/friends')
    const goToCreate = () => navigate('/create')
    const goToRequests = () => navigate('/requests')
    const goToSettings = () => navigate('/settings')

    return (
        <div className="flex flex-col dark:bg-darktheme-3 bg-lighttheme-2 z-20 absolute top-60 w-40 p-2 right-10 border dark:border-darktheme-1 -translate-y-full gap-1 rounded-sm">
            <button className="hover:dark:bg-darkhover-1 hover:bg-lighthover-1  items-center  cursor-pointer flex gap-3 p-1"
                onClick={() => {
                    goToSearch()
                    onClose()
                }}
            >
                <MagnifyingGlassIcon className="w-4 h-4"/>
                Search
            </button>
            <button className="hover:dark:bg-darkhover-1 hover:bg-lighthover-1 items-center cursor-pointer flex gap-3 p-1"
                onClick={() => {
                    goToCreate()
                    onClose()
                }}
            >
                <PlusIcon className="w-4 h-4"/>
               Create
            </button>
            <button className="hover:dark:bg-darkhover-1 hover:bg-lighthover-1  items-center cursor-pointer flex gap-3 p-1"
                onClick={() => {
                    onClose()
                    goToFriends()}}
            >
                <UsersIcon className="w-4 h-4"/>
                Friends
            </button>
            <button className="hover:dark:bg-darkhover-1 hover:bg-lighthover-1  cursor-pointer flex gap-3 p-1"
                onClick={() => {
                    onClose()
                    goToRequests()}}
            >
                <div className="flex w-full justify-between">
                    <h1 className="flex items-center gap-3">
                        <EnvelopeIcon className="w-4 h-4"/>
                        Request
                    </h1>
                    {requests > 0 && <h1>{requests}</h1>}
                </div>
            </button>
            <button 
                className="hover:dark:bg-darkhover-1 hover:bg-lighthover-1  items-center cursor-pointer flex gap-3 p-1"
                onClick={() => {
                    onClose()
                    goToSettings()}}
            >
                <Cog6ToothIcon className="w-4 h-4"/>
                Settings
            </button>
        </div>
    )

}

export default MoreOptionsModal