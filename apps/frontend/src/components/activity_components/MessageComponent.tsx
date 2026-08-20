import { EllipsisHorizontalIcon, CheckIcon, XMarkIcon } from "@heroicons/react/20/solid"
import MessageModal from "./MessageModal"
import { useEffect, useRef, useState } from "react"
import type { Message } from "@activity-manager/types"
import { socket } from "../../utils/socket"

type MessageProps = {
    type: "user" | "other"
    message: Message
}

function MessageComponent({type, message}: MessageProps) {

    const [modalOpen, setModalOpen] = useState(false)
    const [editValue, setEditValue] = useState('')
    const [inEdit, setInEdit] = useState(false)

    const ref = useRef<HTMLDivElement>(null)

    const message_date = new Date(message.createdAt)
    const today_date = new Date()
    
    function getTime(): string {
        const time = today_date.getTime()- message_date.getTime()
        if (time > 60 * 60 * 60 * 1000) {
            return`${message_date.toLocaleDateString()}`
        } else {
            return message_date.toLocaleTimeString("it-IT",{ hour: "2-digit", minute: "2-digit" })
        }
    }
     
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            const target = e.target as Node;
            const clickedInsideMenu = ref.current?.contains(target);

            if (!clickedInsideMenu) {
                setModalOpen(false);
                setInEdit(false)
            }
        }
        if (modalOpen) document.addEventListener('mousedown', handleClickOutside);
        if (inEdit) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [modalOpen, inEdit]);

    async function handleEdit() {
        if (editValue === "" || editValue === message.body) return
        socket.emit('edit_message', { body: editValue, activityId: message.activityId, id: message.id})
    }

    async function handleDelete() {
        socket.emit('delete_message', {activityId: message.activityId, id: message.id})
    }

    return (
            <div ref={ref} className={`flex gap-3 max-w-1/2  ${type == "user" && 'self-end'}`}>
                <div className="flex flex-col">
                    <div className={`${type == "user" ? "dark:bg-app-2 bg-app-1 self-end text-white" : "dark:bg-darktheme-1 bg-lighttheme-2"} rounded-3xl p-3 items-center flex gap-3`}>

                        { !inEdit ? (
                            <div className="flex flex-col">
                                {type == "other" && 
                                <div className="flex gap-2">
                                    <img src={message.user?.avatarUrl} className="w-5 h-5 rounded-full"/>
                                    <h1 className="text-sm">{message.user.username}</h1>
                                </div>
                                }
                                <p className="break-all">{message.body}</p>
                            </div>
                        ) : (
                            <textarea
                                maxLength={250}
                                className="dark:bg-darktheme-2 bg-lighttheme-1 dark:text-white text-black wrap-break-word min-w-0 w-full rounded-2xl py-1 px-2 outline-none scrollbar-none"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                            />
                        )}
                    </div>
                    <p className={`text-sm dark:text-mist-400 ${type === "user" ? "self-end" : "self-start"}`}>{`${getTime()}`}</p>
                </div>
                
                {type == "user" && !inEdit && 
                        <button
                            className="rounded-full h-8 w-8 p-1 dark:bg-darktheme-2 bg-lighttheme-2 relative flex items-center justify-center cursor-pointer"
                            onClick={() => setModalOpen(!modalOpen)}
                            >
                            <EllipsisHorizontalIcon className="h-6= w-6"/>
                            <MessageModal 
                                isOpen={modalOpen} 
                                select={() => {
                                    setInEdit(true)
                                    setEditValue(message.body)
                                }}
                                deleteMessage={() => handleDelete()}
                            />
                        </button>
                    }
                {type == "user" && inEdit &&
                        <div className="flex gap-2">
                            <button
                                className="rounded-full h-8 w-8 dark:bg-darktheme-2 bg-lighttheme-2 relative flex items-center justify-center cursor-pointer"
                                onClick={() => {
                                    handleEdit()
                                    setInEdit(false)
                                }}
                                >
                                <CheckIcon className="h-6 w-6"/>
                            </button>

                            <button
                                className="rounded-full h-8 w-8 dark:bg-darktheme-2 bg-lighttheme-2 relative flex items-center justify-center cursor-pointer"
                                onClick={() => {
                                    setInEdit(false)
                                }}
                                >
                                <XMarkIcon className="h-6 w-6"/>
                            </button>
                        </div>
                    }
            </div>
    )
}

export default MessageComponent