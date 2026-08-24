import { useState } from "react"

type ConfirmModalProps = {
    isOpen: boolean
    header: string
    confirm: () => void
    cancel: () => void
    confirmWord: string
    needToConfrim: boolean
}

function ConfirmModal({isOpen, confirm, cancel, header, confirmWord, needToConfrim}: ConfirmModalProps){
    const [input, setInput] = useState('')
    if (!isOpen) return

    return (
        <div className="w-full h-full fixed left-0 right-0 top-0 bottom-0 px-2 flex z-100 items-center justify-center  bg-black/50">
            <div className="flex gap-10 flex-col items-center dark:bg-darktheme-4 bg-lighttheme-1 p-4 rounded-sm">
                <h1 className="text-xl font-semibold">{header}</h1>
                {needToConfrim && <div className="flex flex-col gap-3">
                    <p>Type "{confirmWord}" to confirm</p>
                    <input
                        maxLength={30}
                        value={input}
                        onChange={(e) => setInput(e.target.value)} 
                        className="p-1 dark:bg-darktheme-2 outline-none border dark:border-none"
                    />
                </div>}
                <div className="flex gap-5">
                    <button 
                        className="dark:bg-darktheme-2 bg-lighttheme-2 font-semibold px-3 py-1 rounded-sm cursor-pointer"
                        onClick={cancel}
                    >
                        Cancel
                    </button>
                    <button
                        disabled={needToConfrim && input !== confirmWord}
                        className={`dark:bg-darktheme-2 bg-lighttheme-2 font-semibold px-3 py-1 rounded-sm 
                            ${ needToConfrim && input !== confirmWord ? "opacity-50" : "cursor-pointer" }`}
                        onClick={confirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal