import { useEffect, useState } from "react"
import MessageComponent from "../components/activity_components/MessageComponent"
import type { Message } from "@activity-manager/types"
import { useAuth } from "../context/AuthContext"
import { socket } from "../utils/socket"

function ActivityPage() {

    const [input, setInput] = useState('')
    const [messages, setMessages] = useState<Message[]>([])

    const {user} = useAuth()

    useEffect(() => {
        async function connectToActivity() {
            socket.emit('connection', 1)
        }
        connectToActivity()
    },[])

    async function handleMessage() {
        socket.emit('send_message', input)
    }

    return (
        <div className="h-screen w-full flex flex-col">
            <div className="w-full dark:bg-darktheme-3 bg-lighttheme-2 p-5 shrink-0">
                <h1 className="font-semibold text-2xl">
                    Activity Title
                </h1>
            </div>

            <div className="flex-1 min-h-0 flex flex-col items-center">
                <div className="flex-1 border-x border-darktheme-2 flex flex-col-reverse gap-4 w-full lg:w-2/3 p-5 min-h-0 overscroll-contain overflow-y-auto scrollbar-none">
                    {messages && messages.map((message) => (
                        <MessageComponent
                            body={message.body}
                            type={message.userId == user?.id ? 'user' : 'other'}
                        />
                    ))}
                </div>
            </div>
            
            <div className="justify-center flex flex-col border-t dark:border-darktheme-1 dark:bg-darktheme-4 bg-lighttheme-2 shrink-0">
                <div className="flex items-center justify-center px-5 py-4 gap-3">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="py-3 px-5 w-2/3 dark:bg-darktheme-2 bg-lighttheme-1 border dark:border-none rounded-full resize-none outline-none"
                        rows={2}
                    />

                    <button className="dark:bg-app-2 bg-app-1 hover:dark:bg-apphover-1 text-white p-3 rounded-full font-semibold cursor-pointer"
                        onClick={() => handleMessage()}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ActivityPage
