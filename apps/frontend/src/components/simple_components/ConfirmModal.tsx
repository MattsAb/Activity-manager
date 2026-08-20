
type ConfirmModalProps = {
    isOpen: boolean
    header: string
    confirm: () => void
    cancel: () => void
}

function ConfirmModal({isOpen, confirm, cancel, header}: ConfirmModalProps){

    if (!isOpen) return

    return (
        <div className="w-full h-full fixed left-0 right-0 top-0 bottom-0 flex z-100 items-center justify-center  bg-black/50">
            <div className="flex gap-5 flex-col items-center dark:bg-darktheme-4 p-4 rounded-2xl">
                <h1 className="text-xl font-semibold">{header}</h1>
                <div className="flex gap-5">
                    <button 
                        className="bg-red-500 font-semibold px-3 py-1 rounded-2xl cursor-pointer"
                        onClick={cancel}
                    >
                        Cancel
                    </button>
                    <button 
                        className="bg-red-500 font-semibold px-3 py-1 rounded-2xl cursor-pointer"
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