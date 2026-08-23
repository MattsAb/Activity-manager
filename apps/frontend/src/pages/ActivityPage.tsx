import { useEffect, useState } from "react"
import MessageComponent from "../components/activity_components/MessageComponent"
import type { Activity, Message } from "@activity-manager/types"
import { useAuth } from "../context/AuthContext"
import { socket } from "../utils/socket"
import { useNavigate, useParams } from "react-router-dom"
import { getActivity, leaveActivity } from "../utils/services/activity.api"
import ErrorMessageComponent from "../components/simple_components/ErrorMessageComponent"
import { useActivity } from "../context/ActivityContext"
import ConfirmModal from "../components/simple_components/ConfirmModal"
import { ArrowRightIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/20/solid"

function ActivityPage() {

    const [input, setInput] = useState('')
    const [messages, setMessages] = useState<Message[]>([])
    const [activity, setActivity] = useState<Activity>()
    const [confirmOpen, setConfirmOpen] = useState(false)

    const [errorMessage, setErrorMessage] = useState('')

    const {user} = useAuth()
    const {fetchActivities} = useActivity()
    const navigate = useNavigate()

    const { id } = useParams();

  useEffect(() => {
    async function connectToActivity() {
        if (!id) return
        setErrorMessage('')
        const result = await getActivity(id)
        if (result.success && result.data) {
            setActivity(result.data)
            setMessages(result.data.messages)
            socket.emit('join_channel', result.data.id)
        } else if (result.error) {
            setErrorMessage(result.error)
        }
    }

    connectToActivity()

    socket.on('new_message', (message) => {
        setMessages(prev => [...prev, message])
    })

    socket.on('edited_message', (message) => {
        setMessages(prev => prev.map(m => m.id === message.id ? message : m))
    })

    socket.on('deleted_message', (message) => {
        setMessages(prev => prev.filter(m => m.id !== message.id))
    })

    return () => {
        socket.emit('leave_channel', id)
        socket.off('new_message')
        socket.off('edited_message')
        socket.off('deleted_message')
    }
}, [id])

    async function handleMessage() {
        if (!activity?.id || !input.trim()) return
        socket.emit('send_message', { body: input, activityId: activity.id })
        setInput('')
    }

    async function handleLeave() {
        if (!id) return
        setErrorMessage("")
        const result = await leaveActivity(id)
        if (result.success) {
            fetchActivities()
            navigate('/')
        }
    }

    return (
        <div className="h-screen w-full flex flex-col">
            <div className="w-full flex justify-between dark:bg-darktheme-3 bg-lighttheme-2 p-5 shrink-0">
                <div className="font-semibold text-2xl flex gap-3">
                        <h1 >
                            {activity?.title}
                        </h1>
                </div>
                <button 
                    className="px-3 py-1 rounded-xl flex items-center gap-1 dark:bg-darktheme-2 bg-lighttheme-2 cursor-pointer"
                    onClick={() => setConfirmOpen(true)}
                >
                    Leave
                    <ArrowRightStartOnRectangleIcon className="w-5 h-5"/>
                </button>
                <ConfirmModal
                    header="Are you sure you want to leave this Activity?"
                    isOpen={confirmOpen}
                    cancel={() => setConfirmOpen(false)}
                    confirm={() => handleLeave()}
                />
            </div>

            <div className="flex-1 min-h-0 flex flex-col items-center">
                <div className="flex-1 border-x border-darktheme-2 flex flex-col-reverse gap-4 w-full lg:w-2/3 p-5 min-h-0 overscroll-contain overflow-y-auto scrollbar-none">
                    {messages && [...messages].reverse().map((message) => (
                        <MessageComponent
                            key={message.id}
                            message={message}
                            type={message.userId == user?.id ? 'user' : 'other'}
                        />
                    ))}
                </div>
                <ErrorMessageComponent errorMessage={errorMessage}/>
            </div>
            
            <div className="justify-center flex flex-col border-t dark:border-darktheme-1 dark:bg-darktheme-4 bg-lighttheme-2 shrink-0">
                <div className="flex items-center justify-center px-5 py-4 gap-3">
                    <textarea
                        value={input}
                        maxLength={250}
                        onChange={(e) => setInput(e.target.value)}
                        className="py-3 px-5 w-2/3 dark:bg-darktheme-2 bg-lighttheme-1 border dark:border-none rounded-full resize-none outline-none"
                        rows={2}
                    />

                    <button className="dark:bg-app-2 bg-app-1 hover:dark:bg-apphover-1 flex items-center gap-1 text-white px-3 py-2 rounded-xl font-semibold cursor-pointer"
                        onClick={() => handleMessage()}
                    >
                        Send
                        <ArrowRightIcon className="w-5 h-5"/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ActivityPage
