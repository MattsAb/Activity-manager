import { useState } from "react"
import { login, register } from "../utils/services/auth.api"
import ErrorMessageComponent from "../components/simple_components/ErrorMessageComponent"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { ClipLoader } from "react-spinners"

function AuthPage() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errorMessage, setErrorMessage] = useState('')

    const [mode, setMode] = useState<'login' | 'register'>('login')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()
    const {saveUser} = useAuth()

async function handleAuth() {
    setErrorMessage("")
    let result
    if (mode == 'register') {
        result = await register(email, username, password)
    } else {
        result = await login(email, password)
    }

    if (result.success && result.data) {
        setLoading(true)
        setErrorMessage('')
        const res = await saveUser(result.data)
        if (res.success) {
            navigate('/')
        } else {
            setErrorMessage(res.error ?? 'Failed to load user')
        }
    } else if (result.error) {
        setErrorMessage(result.error)
    }
    setLoading(false)
}
    return(
        <div className="w-screen h-screen flex flex-col dark:text-white  items-center justify-center bg-lighthover-1 dark:bg-darktheme-4">
            <h1 className="mb-5 font-semibold text-2xl">Activity Manager</h1>
            <div className="dark:bg-darktheme-3 bg-lighttheme-1 flex flex-col gap-5 items-center p-5 rounded-2xl text-xl">
                <h1 className="font-semibold text-2xl">{mode == 'login' ? 'Log In' : 'Register'}</h1>
                {    mode == "register" &&
                <div className="flex flex-col gap-2">
                    <h2> Username </h2>
                    <input 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="outline-none dark:bg-darktheme-4 p-2" 
                        placeholder="username..."
                    />
                </div>
                }
                <div className="flex flex-col gap-2">
                    <h2> Email </h2>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="outline-none dark:bg-darktheme-4 p-2" 
                        placeholder="youremail@gmail.com..."
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <h2> Password </h2>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="outline-none dark:bg-darktheme-4 p-2"
                        placeholder="password..."
                        type={showPassword ? 'text' : 'password'}
                    />
                    <div className="flex gap-2 items-center">
                        <input
                            className="cursor-pointer"
                            onChange={() => setShowPassword(!showPassword)}
                            type="checkbox"
                        />
                        <p className="text-base">Show password</p>
                    </div>
                </div>
                <ErrorMessageComponent errorMessage={errorMessage}/>
                <ClipLoader
                    loading={loading}
                    color="#009689"
                    size={25}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                <button 
                    className="text-blue-400 hover:text-blue-300 cursor-pointer text-base self-start"
                    onClick={() => setMode(mode == 'login' ? 'register' : 'login')}
                >
                    {mode == 'login' ? "Don't have an account? Register" : 'Already have an account? Log in'}
                </button>

                <button 
                    className="bg-app-1 w-full py-1 rounded-xl cursor-pointer hover:bg-apphover-1"
                    onClick={handleAuth}
                >
                    {mode == 'login' ? 'Log in' : 'Register'}
                </button>
            </div>
        </div>
    )
}

export default AuthPage