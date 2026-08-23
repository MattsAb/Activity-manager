import { useNavigate } from "react-router-dom"
function MainPage() {

    const navigate = useNavigate()

    const goToSearch = () => navigate('/search')

    return (

        <div className="w-full h-full flex items-center justify-center">
            <div>
                <h1 className="text-3xl font-semibold"> Activity Manager</h1>
                <button className="text-xl text-blue-400 hover:text-blue-300 cursor-pointer"
                    onClick={() => goToSearch()}
                > Invite friends </button>
            </div>
        </div>
    )
}

export default MainPage