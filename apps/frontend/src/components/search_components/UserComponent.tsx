

type UserComponentProps = {
    username: string
    avatarUrl: string
}


function UserComponent({username, avatarUrl}: UserComponentProps) {


    async function handleAdd() {

    }


    return (
        <div className="w-full rounded-xl dark:bg-darktheme-2 p-3 justify-between flex items-center">
            <div className="flex items-center gap-3">
                <div className="w-15 h-15 rounded-full bg-amber-900"/>
                <h1 className="font-semibold text-2xl">{username}</h1>
            </div>
            <button 
                className="font-semibold bg-app-2 p-3 hover:bg-apphover-1 cursor-pointer rounded-full flex justify-self-end"
                onClick={() => handleAdd()}
            >
                Add friend
            </button>
        </div>
    )
}

export default UserComponent