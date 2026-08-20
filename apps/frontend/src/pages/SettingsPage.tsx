import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { deleteUser, editUserProfile, getProfile } from "../utils/services/user.api";
import ErrorMessageComponent from "../components/simple_components/ErrorMessageComponent";
import ConfirmModal from "../components/simple_components/ConfirmModal";

function SettingsPage() {

    const [imageFile, setImageFile] = useState<File | null>(null)
    const [preview, setPreview] = useState('');
    const [avatar, setAvatar] = useState('');
    const [username, setUsername] = useState('');

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

    const {logout} = useAuth()
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        async function fetchProfile() {
            const result = await getProfile()
            if (result.success && result.data) {
                setAvatar(result.data.avatarUrl)
                setUsername(result.data.username)
            } else if (result.error) {
                setErrorMessage(result.error)
            }
        }
        fetchProfile()
    },[])

    async function handleEdit() {
        const result = await editUserProfile(imageFile ?? undefined, username)

        if (result.success) {
            window.location.reload()
        } else if (result.error) {
            setErrorMessage(result.error)
        }
    }

    async function handleDelete() {
        const result = await deleteUser()
        if (result.success) {
            logout()
        } else if (result.error) {
            setErrorMessage(result.error)
        }
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null
        setImageFile(file)
        if (file) {
            setPreview(URL.createObjectURL(file))
        }
    }
    return (
        <div className="w-full">
            <div>
                <img className="w-25 h-25 rounded-full" src={preview ? preview : avatar}/>
                <input
                    ref={fileInputRef}
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <button
                    className="dark:bg-darktheme-2 px-3 py-1 rounded-2xl cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                >Update avatar</button>
            </div>
            <div>
                <input 
                    className="dark:bg-darktheme-2 p-1 outline-none rounded-xl"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="flex gap-3">
                <button className="bg-lighttheme-2 hover:bg-lighthover-1 dark:bg-darktheme-3 hover:dark:bg-darkhover-1 rounded-full px-2 py-1 cursor-pointer"
                >
                    Dark
                </button>
                <button className="bg-lighttheme-2 hover:bg-lighthover-1 dark:bg-darktheme-3 hover:dark:bg-darkhover-1 rounded-full px-2 py-1 cursor-pointer"
                >
                    Light
                </button>
                
            </div>
            <button className="bg-lighttheme-2 hover:bg-lighthover-1 dark:bg-darktheme-3 hover:dark:bg-darkhover-1  px-2 py-1 rounded-xl cursor-pointer"
                onClick={() => logout()}
            >
                Log Out
            </button>
            <button className="bg-app-2 p-2 rounded-2xl cursor-pointer"
                onClick={() => handleEdit()}
            > Save </button>
            <button className="bg-red-600 text-white p-2 rounded-2xl cursor-pointer"
                onClick={() => setConfirmOpen(true)}
            > Delete Account </button>
            <ConfirmModal
                isOpen={confirmOpen}
                cancel={() => setConfirmOpen(false)}
                confirm={() => {
                    setConfirmOpen(false)
                    handleDelete()
                }}
                header="Are you sure you want to delete your account?"
            />
            <ErrorMessageComponent errorMessage={errorMessage}/>
        </div>
    )
}

export default SettingsPage