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
        setErrorMessage("")
        const result = await editUserProfile(imageFile ?? undefined, username)

        if (result.success) {
            window.location.reload()
        } else if (result.error) {
            setErrorMessage(result.error)
        }
    }

    async function handleDelete() {
        setErrorMessage("")
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
        <div className="w-full h-full p-10 flex flex-col  items-center justifiy-center">
            <div className="dark:bg-darktheme-3 bg-lighttheme-1 p-5 rounded-xl flex flex-col md:flex-row gap-5 lg:w-2/3 w-full">

            <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                    <img className="w-40 h-40 rounded-full" src={preview ? preview : avatar}/>
                    <input
                        ref={fileInputRef}
                        className="hidden"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <div className="flex items-center">
                        <button
                            className="dark:bg-darktheme-2 bg-lighttheme-2 px-3 py-4 rounded-2xl cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                        >Update avatar</button>
                    </div>
                </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="font-semibold">Username</h2>
                        <input 
                            maxLength={30}
                            className="dark:bg-darktheme-2 dark:border-none border p-1 outline-none rounded-xl"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex gap-5 flex-1 md:flex-col flex-row items-end justify-between">
                    <button className="dark:bg-darktheme-2 bg-lighttheme-2 px-2 py-1 rounded-xl cursor-pointer"
                         onClick={() => setConfirmOpen(true)}
                    > Delete Account </button>
                    <div className="flex gap-4">
                        <button className="bg-lighttheme-2 hover:bg-lighthover-1 dark:bg-darktheme-2 hover:dark:bg-darkhover-1  px-3 py-2 rounded-xl cursor-pointer"
                            onClick={() => logout()}
                        >
                            Log Out
                        </button>
                        <button className="bg-app-2 p-2 text-white rounded-xl cursor-pointer"
                            onClick={() => handleEdit()}
                        > Save </button>
                    </div>
                    <ConfirmModal
                        isOpen={confirmOpen}
                        cancel={() => setConfirmOpen(false)}
                        confirm={() => {
                            setConfirmOpen(false)
                            handleDelete()
                        }}
                        header="Are you sure you want to delete your account?"
                    />
                </div>
            </div>
             <ErrorMessageComponent errorMessage={errorMessage}/>
        </div>
    )
}

export default SettingsPage